import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookieStore = await cookies()
          return cookieStore.get(name)?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            const cookieStore = await cookies()
            cookieStore.set({ name, value, ...options })
          } catch (err) {
            // Em Server Components, cookies são somente leitura
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            const cookieStore = await cookies()
            cookieStore.set({ name, value: '', ...options })
          } catch (err) {}
        },
      },
    }
  )
}
export async function checkActiveSubscription() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  // Busca a assinatura ATIVA mais recente do usuário
  const { data: subscription, error: subscriptionError } = await supabase
    .from('subscriptions')
    .select('status, period_end_date')
    .in('status', ['trialing', 'active'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (subscriptionError) {
    console.error("Erro ao buscar assinatura:", subscriptionError);
    return false;
  }

  // LÓGICA DO PAYWALL INTELIGENTE
  
  // 1. O usuário tem uma assinatura paga e ativa?
  if (subscription && subscription.status === 'active') {
    // Verifica se a data de fim do período é no futuro.
    const periodEndDate = new Date(subscription.period_end_date);
    const now = new Date();
    
    // Se a data de fim for maior que agora, o acesso é permitido.
    if (periodEndDate > now) {
      return true;
    }
  }

  // 2. O usuário está no período de teste gratuito?
  // Busca a data de criação do perfil do usuário.
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('created_at')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return false; // Não deveria acontecer se o gatilho estiver funcionando
  }

  const TRIAL_PERIOD_IN_DAYS = 7;
  const profileCreationDate = new Date(profile.created_at);
  const trialEndDate = new Date(profileCreationDate.setDate(profileCreationDate.getDate() + TRIAL_PERIOD_IN_DAYS));
  const now = new Date();

  // Se a data de fim do trial for maior que agora, o acesso é permitido.
  if (trialEndDate > now) {
    return true;
  }
  
  // Se nenhuma das condições acima for atendida, o acesso é negado.
  return false;
}
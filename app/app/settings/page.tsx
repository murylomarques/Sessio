// /app/app/settings/page.tsx - VERSÃO FINAL CORRETA

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

// O "export default" já está aqui, na declaração da função.
export default async function SettingsPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { notFound(); }

  // Busca o perfil do usuário
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, license_number, stripe_customer_id')
    .eq('id', user.id)
    .single();

  // Busca a assinatura ATIVA mais recente
  const { data: activeSubscription } = await supabase
    .from('subscriptions')
    .select('status, period_end_date')
    .eq('user_id', user.id)
    .in('status', ['trialing', 'active'])
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!profile) {
    return <p>Erro ao carregar o perfil.</p>;
  }
  
  // Combina os dados para passar ao componente do cliente
  const profileWithSubscription = {
    ...profile,
    subscription_status: activeSubscription?.status || null,
    subscription_end_date: activeSubscription?.period_end_date || null
  };
 
  // Passa o usuário e o perfil combinado para o formulário
  return <SettingsForm profile={profileWithSubscription} user={user} />;
}

// REMOVA A LINHA "export default SettingsPage;" DAQUI

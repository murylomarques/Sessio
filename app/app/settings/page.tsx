// /app/app/settings/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Se não tiver usuário (null), redireciona ou retorne 404
  if (!user) {
    notFound(); // ou redirecione para login
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('full_name, license_number, subscription_status, stripe_customer_id')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    return <p>Erro ao carregar o perfil.</p>;
  }

  return <SettingsForm profile={profile} user={user} />;
}

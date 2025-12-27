// /app/app/settings/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import SettingsForm from './SettingsForm'; // O Client Component

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { notFound(); }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, license_number, subscription_status, stripe_customer_id')
    .eq('id', user.id)
    .single();

  if (!profile) {
    // Pode acontecer se o trigger de criação de perfil falhou
    return <p>Erro ao carregar o perfil.</p>;
  }

  return <SettingsForm profile={profile} />;
}
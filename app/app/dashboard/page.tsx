// /app/app/dashboard/page.tsx - VERSÃO FINAL COM BUSCA DE DADOS

import { createSupabaseServerClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    notFound(); // Proteção extra
  }

  // Lógica para pegar os compromissos de "hoje"
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // Busca os agendamentos de hoje (em paralelo com os pagamentos)
  const appointmentsPromise = supabase
    .from('appointments')
    .select('id, start_time, patients (full_name)') // JOIN para pegar o nome do paciente
    .eq('user_id', user.id)
    .gte('start_time', todayStart.toISOString())
    .lte('start_time', todayEnd.toISOString())
    .order('start_time', { ascending: true });

  // Busca todos os pagamentos pendentes
  const pendingPaymentsPromise = supabase
    .from('appointments')
    .select('id, start_time, patients (full_name)')
    .eq('user_id', user.id)
    .eq('payment_status', 'pending')
    .order('start_time', { ascending: true });

  // Executa ambas as buscas ao mesmo tempo
  const [
    { data: appointments, error: appointmentsError },
    { data: pendingPayments, error: paymentsError }
  ] = await Promise.all([appointmentsPromise, pendingPaymentsPromise]);

  if (appointmentsError) console.error("Erro ao buscar agendamentos:", appointmentsError.message);
  if (paymentsError) console.error("Erro ao buscar pagamentos pendentes:", paymentsError.message);

  return (
    <DashboardClient
      appointments={appointments || []}
      pendingPayments={pendingPayments || []}
    />
  );
}
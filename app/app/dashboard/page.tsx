// /app/app/dashboard/page.tsx

import { createSupabaseServerClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const { data: appointments } = await supabase
    .from('appointments')
    .select('id, start_time, status, patients(full_name)')
    .eq('user_id', user.id)
    .gte('start_time', todayStart.toISOString())
    .lte('start_time', todayEnd.toISOString())
    .order('start_time', { ascending: true });

  const { data: pendingPayments } = await supabase
    .from('appointments')
    .select('id, start_time, patients(full_name)')
    .eq('user_id', user.id)
    .eq('payment_status', 'pending');

  return (
    <DashboardClient
      appointments={appointments || []}
      pendingPayments={pendingPayments || []}
    />
  );
}

// /app/app/patients/[id]/edit/page.tsx - CORRIGIDO com `await params`

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import EditPatientForm from './EditPatientForm';

export const dynamic = 'force-dynamic';

// A prop `params` é uma Promise, como já aprendemos.
export default async function EditPatientPage({ params }: { params: Promise<{ id: string }> }) {
  // Usamos `await` para resolver a Promise e obter o ID.
  const resolvedParams = await params;

  const supabase = createSupabaseServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { notFound(); }

  // Usamos o `resolvedParams.id` na query.
  const { data: patient } = await supabase
    .from('patients')
    .select('id, full_name, email, phone')
    .eq('id', resolvedParams.id)
    .eq('user_id', user.id)
    .single();

  if (!patient) {
    notFound();
  }

  return <EditPatientForm patient={patient} />;
}
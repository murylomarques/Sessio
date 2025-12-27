// /app/app/patients/[id]/notes/[noteId]/page.tsx - O SERVER COMPONENT

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import NoteDetailView from './NoteDetailView'; // Importa o novo Client Component

export const dynamic = 'force-dynamic';

export default async function NoteDetailPage({ params }: { params: Promise<{ id: string, noteId: string }> }) {
  const resolvedParams = await params;

  const supabase = createSupabaseServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { notFound(); }

  const { data: note } = await supabase
    .from('clinical_notes')
    .select('id, created_at, content, patient_id, patients (full_name)')
    .eq('id', resolvedParams.noteId)
    .eq('user_id', user.id)
    .single();

  if (!note || note.patient_id !== resolvedParams.id) {
    notFound();
  }
  
  // A única responsabilidade deste componente é buscar os dados e
  // passá-los para o Client Component que sabe como exibi-los.
  return <NoteDetailView note={note} patientId={resolvedParams.id} />;
}
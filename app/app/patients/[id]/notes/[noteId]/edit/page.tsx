// /app/app/patients/[id]/notes/[noteId]/edit/page.tsx

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import EditNoteForm from './EditNoteForm';

export const dynamic = 'force-dynamic';

export default async function EditNotePage({ params }: { params: Promise<{ id: string, noteId: string }> }) {
  const resolvedParams = await params;
  const supabase = createSupabaseServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { notFound(); }

  const { data: note } = await supabase
    .from('clinical_notes')
    .select('id, content, patient_id')
    .eq('id', resolvedParams.noteId)
    .eq('user_id', user.id)
    .single();

  if (!note || note.patient_id !== resolvedParams.id) {
    notFound();
  }

  return <EditNoteForm note={note} patientId={resolvedParams.id} />;
}
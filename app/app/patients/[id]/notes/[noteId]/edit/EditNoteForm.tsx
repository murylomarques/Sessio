// /app/app/patients/[id]/notes/[noteId]/edit/EditNoteForm.tsx - VERSÃO i18n FINAL

"use client";

import { useI18n } from '@/lib/useI18n'; // Importa o hook
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { updateClinicalNote } from '@/app/_actions';

const initialState = { success: false, error: null, patientId: '', noteId: '' };

function SubmitButton() {
  const { t } = useI18n(); // Usa o hook
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-[var(--color-action)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? t.editNoteForm.saving_button : t.editNoteForm.save_button}
    </button>
  );
}

type Note = {
  id: string;
  content: string;
}

export default function EditNoteForm({ note, patientId }: { note: Note, patientId: string }) {
  const { t } = useI18n(); // Usa o hook
  const router = useRouter();
  const [state, formAction] = useFormState(updateClinicalNote, initialState);

  useEffect(() => {
    if (state.success && state.patientId && state.noteId) {
      router.push(`/app/patients/${state.patientId}/notes/${state.noteId}`);
    }
  }, [state, router]);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold text-neutral-900">{t.editNoteForm.title}</h1>
      <p className="mt-1 text-neutral-600">
        {t.editNoteForm.subtitle}
      </p>

      <form action={formAction} className="mt-6">
        <input type="hidden" name="noteId" value={note.id} />
        <input type="hidden" name="patientId" value={patientId} />
        
        <div>
          <label htmlFor="note-content" className="sr-only">
            {t.newNoteForm.content_label} {/* Reutiliza a chave do formulário de nova nota */}
          </label>
          <textarea
            id="note-content"
            name="note-content"
            rows={18}
            className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            placeholder={t.newNoteForm.placeholder} 
            required
            defaultValue={note.content}
          />
        </div>

        {state.error && <p className="mt-2 text-sm text-red-600">{state.error}</p>}

        <div className="mt-6 flex items-center justify-end gap-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm font-semibold text-neutral-700 hover:text-neutral-900"
          >
            {t.editNoteForm.cancel_button}
          </button>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
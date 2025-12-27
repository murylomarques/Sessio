// /app/app/patients/[id]/new-note/page.tsx

"use client";

import { useI18n } from '@/lib/useI18n';
import { use, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { createClinicalNote } from '@/app/_actions';

const initialState = { success: false, error: null, patientId: '' };

function SubmitButton() {
  const { t } = useI18n();
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-[var(--color-action)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? t.newNoteForm.saving_button : t.newNoteForm.save_button}
    </button>
  );
}

export default function NewNotePage({ params }: { params: Promise<{ id: string }> }) {
  const { t } = useI18n();
  const router = useRouter();
  const resolvedParams = use(params);

  // ✅ NOVO PADRÃO CORRETO
  const [state, formAction] = useActionState(createClinicalNote, initialState);

  useEffect(() => {
    if (state.success && state.patientId) {
      router.push(`/app/patients/${state.patientId}`);
    }
  }, [state, router]);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold text-neutral-900">
        {t.newNoteForm.title}
      </h1>

      <p className="mt-1 text-neutral-600">
        {t.newNoteForm.subtitle}
      </p>

      <form action={formAction} className="mt-6">
        <input type="hidden" name="patientId" value={resolvedParams.id} />

        <div>
          <label htmlFor="note-content" className="sr-only">
            {t.newNoteForm.content_label}
          </label>

          <textarea
            id="note-content"
            name="note-content"
            rows={15}
            required
            className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            placeholder={t.newNoteForm.placeholder}
          />
        </div>

        {state.error && (
          <p className="mt-2 text-sm text-red-600">{state.error}</p>
        )}

        <div className="mt-6 flex items-center justify-end gap-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm font-semibold text-neutral-700 hover:text-neutral-900"
          >
            {t.newNoteForm.cancel_button}
          </button>

          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

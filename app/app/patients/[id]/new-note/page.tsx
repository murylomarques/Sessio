// /app/app/patients/[id]/new-note/page.tsx - A SÍNTESE FINAL

"use client";

import { use, useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { createClinicalNote } from '@/app/_actions';

const initialState = { success: false, error: null, patientId: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-[var(--color-action)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Salvando..." : "Salvar Nota"}
    </button>
  );
}

export default function NewNotePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  // SOLUÇÃO 1: Usar `use()` para resolver a Promise `params`
  const resolvedParams = use(params);
  
  // SOLUÇÃO 2: Usar `useActionState` para gerenciar a Server Action
  const [state, formAction] = useActionState(createClinicalNote, initialState);

  useEffect(() => {
    if (state.success && state.patientId) {
      router.push(`/app/patients/${state.patientId}`);
    }
  }, [state, router]);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold text-neutral-900">Nova Nota de Sessão</h1>
      <p className="mt-1 text-neutral-600">
        Descreva os detalhes da sessão. Suas anotações são salvas com segurança.
      </p>

      <form action={formAction} className="mt-6">
        {/* Agora passamos o `resolvedParams.id` para o campo oculto */}
        <input type="hidden" name="patientId" value={resolvedParams.id} />
        
        <div>
          <label htmlFor="note-content" className="sr-only">Conteúdo da Nota</label>
          <textarea
            id="note-content"
            name="note-content"
            rows={15}
            className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            placeholder="Comece a escrever aqui..."
            required
          />
        </div>

        {state.error && <p className="mt-2 text-sm text-red-600">{state.error}</p>}

        <div className="mt-6 flex items-center justify-end gap-x-4">
          <button type="button" onClick={() => router.back()} className="text-sm font-semibold text-neutral-700 hover:text-neutral-900">
            Cancelar
          </button>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
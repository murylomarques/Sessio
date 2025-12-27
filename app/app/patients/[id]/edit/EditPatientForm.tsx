// /app/app/patients/[id]/edit/EditPatientForm.tsx - CORRIGIDO com useFormState

"use client";

import { useEffect } from 'react';
// CORREÇÃO: Importar useFormState de 'react-dom'
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { updatePatient } from '@/app/_actions';

const initialState = { success: false, error: null, patientId: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-[var(--color-action)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Salvando..." : "Salvar Alterações"}
    </button>
  );
}

type Patient = { id: string; full_name: string; email: string | null; phone: string | null; }

export default function EditPatientForm({ patient }: { patient: Patient }) {
  const router = useRouter();
  // CORREÇÃO: Usar useFormState
  const [state, formAction] = useFormState(updatePatient, initialState);

  useEffect(() => {
    if (state.success && state.patientId) {
      router.push(`/app/patients/${state.patientId}`);
    }
  }, [state, router]);

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-sm border border-neutral-200">
      <div className="border-b border-neutral-200 pb-6 mb-8">
        <h1 className="text-xl font-semibold text-neutral-900">Editar Paciente</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Atualize as informações do prontuário de <span className="font-medium">{patient.full_name}</span>.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="patientId" value={patient.id} />
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-neutral-800">Nome Completo</label>
          <div className="mt-2">
            <input
              id="fullName" name="fullName" type="text" required
              defaultValue={patient.full_name}
              className="block w-full rounded-lg border-neutral-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-800">Email</label>
          <div className="mt-2">
            <input
              id="email" name="email" type="email"
              defaultValue={patient.email || ''}
              className="block w-full rounded-lg border-neutral-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-800">Telefone</label>
          <div className="mt-2">
            <input
              id="phone" name="phone" type="tel"
              defaultValue={patient.phone || ''}
              className="block w-full rounded-lg border-neutral-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        {state.error && <p className="text-sm text-center text-red-600 pt-2">{state.error}</p>}
        <div className="flex items-center justify-end gap-x-4 border-t border-neutral-200 pt-6">
          <button type="button" onClick={() => router.back()} className="rounded-lg px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100">
            Cancelar
          </button>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
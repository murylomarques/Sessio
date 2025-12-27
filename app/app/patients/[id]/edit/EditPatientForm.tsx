// /app/app/patients/[id]/edit/EditPatientForm.tsx - VERSÃO i18n FINAL

"use client";

import { useI18n } from '@/lib/useI18n';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { updatePatient } from '@/app/_actions';

const initialState = { success: false, error: null, patientId: '' };

function SubmitButton() {
  const { t } = useI18n();
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-[var(--color-action)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? t.editPatientForm.saving_button : t.editPatientForm.save_button}
    </button>
  );
}

type Patient = { id: string; full_name: string; email: string | null; phone: string | null; }

export default function EditPatientForm({ patient }: { patient: Patient }) {
  const { t } = useI18n();
  const router = useRouter();
  const [state, formAction] = useFormState(updatePatient, initialState);

  useEffect(() => {
    if (state.success && state.patientId) {
      router.push(`/app/patients/${state.patientId}`);
    }
  }, [state, router]);

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-sm border border-neutral-200">
      <div className="border-b border-neutral-200 pb-6 mb-8">
        <h1 className="text-xl font-semibold text-neutral-900">{t.editPatientForm.title}</h1>
        <p className="mt-1 text-sm text-neutral-600">
          {t.editPatientForm.subtitle.replace('{patientName}', patient.full_name)}
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="patientId" value={patient.id} />
        <div>
          {/* Reutilizando as chaves do formulário de novo paciente */}
          <label htmlFor="fullName" className="block text-sm font-medium text-neutral-800">{t.newPatientForm.name_label}</label>
          <div className="mt-2">
            <input
              id="fullName" name="fullName" type="text" required
              defaultValue={patient.full_name}
              className="block w-full rounded-lg border-neutral-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-800">{t.newPatientForm.email_label}</label>
          <div className="mt-2">
            <input
              id="email" name="email" type="email"
              defaultValue={patient.email || ''}
              className="block w-full rounded-lg border-neutral-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-800">{t.newPatientForm.phone_label}</label>
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
            {t.editPatientForm.cancel_button}
          </button>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
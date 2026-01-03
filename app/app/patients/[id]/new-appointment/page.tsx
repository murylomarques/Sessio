// /app/app/patients/[id]/new-appointment/page.tsx - SEM DUPLICAÇÃO

"use client";

import { useI18n } from '@/lib/useI18n';
import { useEffect, use } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { createAppointment } from '@/app/_actions';

const initialState = { success: false, error: null };

// A ÚNICA DEFINIÇÃO DO SUBMITBUTTON
function SubmitButton() {
    const { t } = useI18n();
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="rounded-lg bg-[var(--color-action)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50">
        {pending ? t.newAppointmentForm.saving_button : t.newAppointmentForm.save_button}
        </button>
    );
}

export default function NewAppointmentPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ name: string }> }) {
  const { t } = useI18n();
  const router = useRouter();

  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  
  const [state, formAction] = useActionState(createAppointment, initialState);

  useEffect(() => {
    if (state.success) {
      router.push(`/app/patients/${resolvedParams.id}`);
    }
  }, [state, router, resolvedParams.id]);
  
  const patientName = decodeURIComponent(resolvedSearchParams.name || '');

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-neutral-900">{t.newAppointmentForm.title}</h1>
        <p className="mt-1 text-sm text-neutral-600">{t.newAppointmentForm.subtitle.replace('{patientName}', patientName)}</p>
      </div>

      <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
        <input type="hidden" name="patientId" value={resolvedParams.id} />
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-neutral-800">{t.newAppointmentForm.date_label}</label>
          <div className="mt-2">
            <input id="date" name="date" type="date" required className="block w-full rounded-lg border-neutral-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"/>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-neutral-800">{t.newAppointmentForm.start_time_label}</label>
            <div className="mt-2">
              <input id="startTime" name="startTime" type="time" required className="block w-full rounded-lg border-neutral-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"/>
            </div>
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-neutral-800">{t.newAppointmentForm.end_time_label}</label>
            <div className="mt-2">
              <input id="endTime" name="endTime" type="time" required className="block w-full rounded-lg border-neutral-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"/>
            </div>
          </div>
        </div>
        {state.error && <p className="text-sm text-center text-red-600 pt-2">{state.error}</p>}
        <div className="flex items-center justify-end gap-x-4 border-t border-neutral-200 pt-6">
          <button type="button" onClick={() => router.back()} className="rounded-lg px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100">
            {t.newAppointmentForm.cancel_button}
          </button>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
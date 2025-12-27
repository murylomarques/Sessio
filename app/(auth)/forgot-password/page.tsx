// /app/(auth)/forgot-password/page.tsx

"use client";

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useI18n } from '@/lib/useI18n';
import { requestPasswordReset } from '@/app/_actions';
import Link from 'next/link';

const initialState = { success: false, error: null, message: '' };

function SubmitButton() {
  const { t } = useI18n();
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="flex w-full justify-center rounded-lg bg-[var(--color-action)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50">
      {pending ? t.forgotPassword.loading_button : t.forgotPassword.cta_button}
    </button>
  );
}

export default function ForgotPasswordPage() {
  const { t } = useI18n();
  const [state, formAction] = useActionState(requestPasswordReset, initialState);

  return (
    <div className="w-full max-w-md p-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-[var(--color-primary)]">Sessio</h1>
        <h2 className="mt-2 text-xl font-semibold text-neutral-800">{t.forgotPassword.title}</h2>
        <p className="mt-1 text-neutral-600">{t.forgotPassword.subtitle}</p>
      </div>

      {state.message ? (
        <div className="mt-8 text-center">
          <p className="text-green-700 bg-green-50 p-4 rounded-md">{state.message}</p>
          <Link href="/login" className="mt-6 inline-block font-semibold text-[var(--color-primary)] hover:underline">
            {t.forgotPassword.back_to_login}
          </Link>
        </div>
      ) : (
        <form action={formAction} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">{t.forgotPassword.email_label}</label>
            <div className="mt-1">
              <input id="email" name="email" type="email" autoComplete="email" required className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-[var(--color-primary)] sm:text-sm"/>
            </div>
          </div>
          
          {state.error && <p className="text-sm text-center text-red-600">{state.error}</p>}

          <div><SubmitButton /></div>
        </form>
      )}
    </div>
  );
}
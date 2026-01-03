"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useI18n } from "@/lib/useI18n";
import { createPatient } from "@/app/_actions";

const initialState = { success: false, error: null };

function SubmitButton() {
  const { t } = useI18n();
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-lg bg-[var(--color-action)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? t.newPatientForm.saving_button : t.newPatientForm.save_button}
    </button>
  );
}

export default function NewPatientPage() {
  const { t } = useI18n();
  const router = useRouter();

  const [state, formAction] = useActionState(createPatient, initialState);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (state.success) {
      router.push("/app/patients");
    }
  }, [state, router]);

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 10) {
      return digits
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  function validate() {
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
    };

    if (form.fullName.trim().length < 3) {
      newErrors.fullName = "Nome deve ter pelo menos 3 caracteres.";
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "E-mail inválido.";
    }

    if (form.phone && form.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Telefone incompleto.";
    }

    setErrors(newErrors);

    return !newErrors.fullName && !newErrors.email && !newErrors.phone;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-5">
          <h1 className="text-xl font-semibold text-neutral-900">
            {t.newPatientForm.title}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {t.newPatientForm.subtitle}
          </p>
        </div>

        <form
          action={formAction}
          className="space-y-6 px-6 py-6"
          onSubmit={(e) => {
            if (!validate()) {
              e.preventDefault();
            }
          }}
        >
          {/* NOME */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              {t.newPatientForm.name_label}
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              {t.newPatientForm.email_label}
            </label>
            <input
              name="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              type="email"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* TELEFONE */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              {t.newPatientForm.phone_label}
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: formatPhone(e.target.value) })
              }
              maxLength={15}
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
            >
              {t.newPatientForm.cancel_button}
            </button>

            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

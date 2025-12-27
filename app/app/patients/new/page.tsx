"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { createPatient } from "@/app/_actions";

const initialState = { success: false, error: null };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-[var(--color-action)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Salvando..." : "Salvar Paciente"}
    </button>
  );
}

export default function NewPatientPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(createPatient, initialState);

  useEffect(() => {
    if (state.success) router.push("/app/patients");
  }, [state, router]);

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
      
      {/* Header */}
      <div className="mb-8 border-b border-neutral-200 pb-4">
        <h1 className="text-xl font-semibold text-neutral-900">
          Adicionar Novo Paciente
        </h1>
        <p className="mt-1 text-sm text-neutral-600">
          Preencha as informações abaixo para criar um novo prontuário.
        </p>
      </div>

      <form action={formAction} className="space-y-7">
        
        {/* Nome */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-800">
            Nome Completo
          </label>
          <input
            name="fullName"
            type="text"
            required
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm shadow-sm 
                       focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-800">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm shadow-sm 
                       focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-800">
            Telefone
          </label>
          <input
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm shadow-sm 
                       focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>

        {state.error && (
          <p className="pt-2 text-sm text-red-600">{state.error}</p>
        )}

        {/* Ações */}
        <div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            Cancelar
          </button>

          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

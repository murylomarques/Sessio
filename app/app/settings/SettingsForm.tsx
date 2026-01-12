"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { useI18n } from "@/lib/useI18n";
import {
  updateProfile,
  createStripePortalLink,
  createCheckoutSession,
} from "@/app/_actions";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* =========================
   BOTÃO COM useFormStatus
========================= */
function SubmitButton({ label, loading }: any) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="rounded-lg bg-black px-5 py-2 text-white transition hover:opacity-90 disabled:opacity-50"
    >
      {pending ? loading : label}
    </button>
  );
}

export default function SettingsForm({ profile, user }: any) {
  const { t } = useI18n();
  const searchParams = useSearchParams();

  const isSubscriptionRequired =
    searchParams.get("reason") === "subscription_required";

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loadingPassword, setLoadingPassword] = useState(false);

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 6)
      return setError("A senha precisa ter no mínimo 6 caracteres.");

    if (password !== confirmPassword)
      return setError("As senhas não coincidem.");

    setLoadingPassword(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Senha atualizada com sucesso!");
      setShowPasswordForm(false);
    }

    setLoadingPassword(false);
  }

  /* =========================
     BLOQUEIO POR ASSINATURA
  ========================= */
  if (isSubscriptionRequired && profile.subscription_status !== "active") {
    return (
      <div className="mx-auto mt-24 max-w-lg rounded-2xl bg-white p-8 shadow border">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Assinatura necessária
        </h2>

        <form action={createCheckoutSession}>
          <SubmitButton
            label="Ativar assinatura"
            loading="Redirecionando..."
          />
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">{t.settings.title}</h1>
        <p className="text-neutral-500">{user.email}</p>
      </div>

      {/* PERFIL */}
      <section className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">
          {t.settings.profile_title}
        </h2>

        <form action={updateProfile} className="space-y-5">
          <input
            name="fullName"
            defaultValue={profile.full_name}
            className="w-full rounded border px-4 py-2"
          />

          <input
            name="licenseNumber"
            defaultValue={profile.license_number || ""}
            className="w-full rounded border px-4 py-2"
          />

          <div className="flex justify-end">
            <SubmitButton
              label={t.settings.save_button}
              loading={t.settings.saving_button}
            />
          </div>
        </form>
      </section>

      {/* ASSINATURA */}
      <section className="rounded-2xl border bg-white p-6">
        {profile.subscription_status === "active" ? (
          <form action={createStripePortalLink}>
            <SubmitButton
              label="Gerenciar assinatura"
              loading="Abrindo portal..."
            />
          </form>
        ) : (
          <form action={createCheckoutSession}>
            <SubmitButton label="Fazer upgrade" loading="Redirecionando..." />
          </form>
        )}
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
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

export default function SettingsForm({ profile, user }: any) {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const { pending } = useFormStatus();

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
      setPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    }

    setLoadingPassword(false);
  }

  /* ==============================
      BLOQUEIO POR ASSINATURA
  =============================== */
  if (isSubscriptionRequired && profile.subscription_status !== "active") {
    return (
      <div className="mx-auto mt-24 max-w-lg rounded-2xl bg-white p-8 shadow-sm border border-neutral-200 animate-fade-in">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Assinatura necessária
        </h2>

        <p className="text-neutral-600 mb-6">
          Seu acesso está temporariamente bloqueado.
        </p>

        <form action={createCheckoutSession}>
          <button className="w-full rounded-lg bg-[var(--color-action)] py-3 font-semibold text-white transition hover:opacity-90">
            Ativar assinatura
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10 animate-fade-in">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">{t.settings.title}</h1>
        <p className="text-neutral-500">{user.email}</p>
      </div>

      {/* PERFIL */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">
        <h2 className="mb-4 text-lg font-semibold">
          {t.settings.profile_title}
        </h2>

        <form action={updateProfile} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Nome</label>
            <input
              name="fullName"
              defaultValue={profile.full_name}
              className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-2 focus:ring-2 focus:ring-black/10 transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Registro</label>
            <input
              name="licenseNumber"
              defaultValue={profile.license_number || ""}
              className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-2 focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={pending}
              className="rounded-lg bg-black px-5 py-2 text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {pending ? t.settings.saving_button : t.settings.save_button}
            </button>
          </div>
        </form>
      </section>

      {/* SENHA */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          {t.settings.change_password}
        </h2>

        {!showPasswordForm ? (
          <button
            onClick={() => setShowPasswordForm(true)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {t.settings.show_change_password_form}
          </button>
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <input
              type="password"
              placeholder="Nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-4 py-2"
            />

            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-4 py-2"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loadingPassword}
                className="rounded-lg bg-black px-4 py-2 text-white"
              >
                Salvar
              </button>

              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="rounded-lg border px-4 py-2"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </section>

      {/* ASSINATURA */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          {t.settings.subscription_title}
        </h2>

        {profile.subscription_status === "active" ? (
          <div className="space-y-3 text-sm">
            <p>
              <span className="text-neutral-500">Plano:</span>{" "}
              <strong>{t.settings.plan_name}</strong>
            </p>

            <p>
              <span className="text-neutral-500">Status:</span>{" "}
              <span className="text-green-600 font-medium">Ativo</span>
            </p>

            <form action={createStripePortalLink}>
              <button className="mt-3 rounded-lg border px-4 py-2">
                Gerenciar assinatura
              </button>
            </form>
          </div>
        ) : (
          <form action={createCheckoutSession}>
            <button className="rounded-lg bg-[var(--color-action)] px-4 py-2 text-white">
              Fazer upgrade
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

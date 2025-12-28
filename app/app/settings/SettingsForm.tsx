"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useI18n } from "@/lib/useI18n";
import { updateProfile, createStripePortalLink, createCheckoutSession } from "@/app/_actions";
import { createBrowserClient } from "@supabase/ssr";

// Cria o supabase client no frontend
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SettingsForm({
  profile,
  user,
}: {
  profile: any;
  user: any;
}) {
  const { t } = useI18n();
  const { pending } = useFormStatus();

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (password !== confirmPassword) {
      setPasswordError("As senhas não coincidem.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setPasswordError(error.message);
    } else {
      setPasswordSuccess("Senha atualizada com sucesso!");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-12">
      {/* CABEÇALHO */}
      <div>
        <h1 className="text-2xl font-semibold">{t.settings.title}</h1>
        <p className="text-neutral-600">{user.email}</p>
      </div>

      {/* PERFIL */}
      <form action={updateProfile} className="space-y-6 rounded-lg bg-white p-8 shadow border">
        <h2 className="text-lg font-semibold">{t.settings.profile_title}</h2>
        <div>
          <label>{t.settings.name_label}</label>
          <input
            name="fullName"
            defaultValue={profile.full_name}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label>{t.settings.license_label}</label>
          <input
            name="licenseNumber"
            defaultValue={profile.license_number || ""}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="flex justify-end items-center gap-4">
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {pending ? t.settings.saving_button : t.settings.save_button}
          </button>
        </div>
      </form>

      {/* TROCAR SENHA */}
      <div className="rounded-lg bg-white p-8 shadow space-y-4">
        <h2 className="text-lg font-semibold">{t.settings.change_password}</h2>

        {!showPasswordForm && (
          <button
            onClick={() => setShowPasswordForm(true)}
            className="rounded-md border px-4 py-2"
          >
            {t.settings.show_change_password_form}
          </button>
        )}

        {showPasswordForm && (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">{t.settings.new_password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">{t.settings.confirm_password}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded border px-3 py-2"
                required
              />
            </div>

            {passwordError && (
              <p className="text-sm text-red-600">{passwordError}</p>
            )}
            {passwordSuccess && (
              <p className="text-sm text-green-600">{passwordSuccess}</p>
            )}

            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 text-white"
            >
              {t.settings.change_password_button}
            </button>
          </form>
        )}
      </div>

      {/* ASSINATURA */}
      <div className="space-y-4 rounded-lg bg-white p-8 shadow border">
        <h2 className="text-lg font-semibold">{t.settings.subscription_title}</h2>

        {profile.subscription_status === "active" ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t.settings.plan_name}</p>
              <p className="text-sm font-medium text-green-600">
                {t.settings.status_label}: Ativo
              </p>
            </div>
            <form action={createStripePortalLink}>
              <button
                type="submit"
                disabled={!profile.stripe_customer_id}
                className="rounded-md border px-4 py-2 disabled:opacity-50"
              >
                {t.settings.manage_subscription_button}
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded-md bg-blue-50 p-4">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Você está em um período de teste
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Faça o upgrade para o Plano Solo para continuar usando o Sessio após o término do seu teste.
                </p>
              </div>
              <div className="mt-4">
                <form action={createCheckoutSession}>
                  <button
                    type="submit"
                    className="rounded-lg bg-[var(--color-action)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  >
                    Fazer Upgrade Agora
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

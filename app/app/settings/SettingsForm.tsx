"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useI18n } from "@/lib/useI18n";
import { updateProfile, createStripePortalLink } from "@/app/_actions";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const initialProfileState = {
  success: false,
  error: null,
  message: "",
};

function SubmitProfileButton() {
  const { pending } = useFormStatus();
  const { t } = useI18n();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
    >
      {pending ? t.settings.saving_button : t.settings.save_button}
    </button>
  );
}

function PortalButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  const { t } = useI18n();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="rounded-md border px-4 py-2 disabled:opacity-50"
    >
      {pending
        ? t.settings.loading_portal_button
        : t.settings.manage_subscription_button}
    </button>
  );
}

export default function SettingsForm({ profile }: { profile: any }) {
  const { t } = useI18n();

  const [profileState, profileAction] = useActionState(
    updateProfile,
    initialProfileState
  );

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (profileState.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [profileState]);

  return (
    <div className="mx-auto max-w-2xl space-y-12">
      <div>
        <h1 className="text-2xl font-semibold">{t.settings.title}</h1>
        <p className="text-neutral-600">{t.settings.subtitle}</p>
      </div>

      {/* PERFIL */}
      <form
        action={profileAction}
        className="space-y-6 rounded-lg bg-white p-8 shadow border"
      >
        <h2 className="text-lg font-semibold">
          {t.settings.profile_title}
        </h2>

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
          {showSuccess && (
            <span className="flex items-center gap-1 text-green-600 text-sm">
              <CheckCircleIcon className="h-4 w-4" />
              {profileState.message}
            </span>
          )}
          <SubmitProfileButton />
        </div>

        {profileState.error && (
          <p className="text-sm text-red-600 text-right">
            {profileState.error}
          </p>
        )}
      </form>

      {/* ASSINATURA */}
      <div className="rounded-lg bg-white p-8 shadow space-y-4">
        <h2 className="text-lg font-semibold">
          {t.settings.subscription_title}
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{t.settings.plan_name}</p>
            <p className="text-sm text-green-600">
              {t.settings.status_label}:{" "}
              {profile.subscription_status || "trialing"}
            </p>
          </div>

          <form action={createStripePortalLink}>
            <PortalButton disabled={!profile.stripe_customer_id} />
          </form>
        </div>
      </div>
    </div>
  );
}

// /app/settings/SubmitButton.tsx

"use client";

import { useFormStatus } from "react-dom";
import { useI18n } from "@/lib/useI18n";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useI18n();

  return (
    <button
      disabled={pending}
      className="rounded-lg bg-black px-5 py-2 text-white transition hover:opacity-90 disabled:opacity-50"
    >
      {pending ? t.settings.saving_button : t.settings.save_button}
    </button>
  );
}

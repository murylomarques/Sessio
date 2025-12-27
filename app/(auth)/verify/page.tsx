// /app/(auth)/verify/page.tsx

"use client";

import { useI18n } from "@/lib/useI18n";

export default function VerifyPage() {
  const { t } = useI18n();

  return (
    <div className="w-full max-w-md p-8 text-center">
      <h1 className="text-2xl font-semibold text-neutral-900">
        {t.verify.title}
      </h1>
      <p className="mt-4 text-neutral-600">
        {t.verify.subtitle}
      </p>
      <p className="mt-2 text-sm text-neutral-500">
        {t.verify.spam_check}
      </p>
    </div>
  );
}
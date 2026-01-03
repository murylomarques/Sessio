"use client";

import { useI18n } from "@/lib/useI18n";
import { ArrowUpTrayIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function OnboardingPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
          {t.onboarding.title}
        </h1>
        <p className="mt-3 text-neutral-600 max-w-xl mx-auto">
          {t.onboarding.subtitle}
        </p>
      </div>

      {/* Options */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {/* IMPORT CARD (PRIMARY) */}
        <Link
          href="/app/import"
          className="group relative overflow-hidden rounded-2xl border border-[var(--color-primary)] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Accent bar */}
          <div className="absolute left-0 top-0 h-full w-1 bg-[var(--color-primary)]" />

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)/10]">
              <ArrowUpTrayIcon className="h-6 w-6 text-[var(--color-primary)]" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {t.onboarding.import_title}
              </h3>
              <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
                {t.onboarding.import_desc}
              </p>
            </div>
          </div>

          <div className="mt-4 text-sm font-medium text-[var(--color-primary)]">
            {t.onboarding.import_cta ?? "Começar importação →"}
          </div>
        </Link>

        {/* MANUAL CARD */}
        <Link
          href="/app/patients/new"
          className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
              <UserPlusIcon className="h-6 w-6 text-neutral-600" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {t.onboarding.manual_title}
              </h3>
              <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
                {t.onboarding.manual_desc}
              </p>
            </div>
          </div>

          <div className="mt-4 text-sm font-medium text-neutral-500 group-hover:text-neutral-700">
            {t.onboarding.manual_cta ?? "Adicionar manualmente →"}
          </div>
        </Link>
      </div>
    </div>
  );
}

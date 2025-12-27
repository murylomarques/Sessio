// /app/(app)/onboarding/page.tsx

"use client";

import { useI18n } from "@/lib/useI18n";
import { ArrowUpTrayIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function OnboardingPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-2xl font-semibold text-neutral-900">
        {t.onboarding.title}
      </h1>
      <p className="mt-2 text-lg text-neutral-600">
        {t.onboarding.subtitle}
      </p>

      {/* 
        Justificativa Psicológica do Layout:
        Apresentamos duas escolhas claras, mas usamos o Princípio do Destaque para
        guiar o usuário para a ação desejada (importar). O card de importação
        tem uma borda colorida e mais destaque, sinalizando que é a "melhor" opção.
        Isso é um "nudge" comportamental.
      */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {/* Card 1: Importar (Ação Principal) */}
        <Link href="/app/import" className="group block rounded-xl border-2 border-[var(--color-primary)] bg-white p-6 text-left transition hover:shadow-lg">
          <ArrowUpTrayIcon className="h-8 w-8 text-[var(--color-primary)]" />
          <h3 className="mt-3 text-lg font-semibold text-neutral-900">
            {t.onboarding.import_title}
          </h3>
          <p className="mt-1 text-neutral-600">
            {t.onboarding.import_desc}
          </p>
        </Link>
        
        {/* Card 2: Começar do Zero (Ação Secundária) */}
        <Link href="/app/patients/new" className="group block rounded-xl border border-neutral-200 bg-white p-6 text-left transition hover:border-neutral-400 hover:shadow-lg">
          <UserPlusIcon className="h-8 w-8 text-neutral-500" />
          <h3 className="mt-3 text-lg font-semibold text-neutral-900">
            {t.onboarding.manual_title}
          </h3>
          <p className="mt-1 text-neutral-600">
            {t.onboarding.manual_desc}
          </p>
        </Link>
      </div>
    </div>
  );
}
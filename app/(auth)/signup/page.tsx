// /app/signup/page.tsx

"use client";

import { useI18n } from "@/lib/useI18n";
import Link from "next/link";

export default function SignupPage() {
  const { t } = useI18n();

  return (
    <div className="w-full max-w-md p-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
          Sessio
        </h1>
        <h2 className="mt-2 text-xl font-semibold text-neutral-800">
          {t.signup.title}
        </h2>
        <p className="mt-1 text-neutral-600">
          {t.signup.subtitle}
        </p>
      </div>

      <form className="mt-8 space-y-6">
        {/* Justificativa: Apenas Email e Senha. Aderimos ao princípio da Coleta
            Mínima de Dados para reduzir a fricção. Cada campo adicional é um
            ponto de abandono em potencial. */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
            {t.signup.email_label}
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
            {t.signup.password_label}
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        
        {/* Justificativa do Botão CTA: Cor de ação consistente com a landing page.
            O texto reforça o benefício ("Criar minha conta grátis"). É uma chamada
            clara e direta para a ação final. */}
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-lg bg-[var(--color-action)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            {t.signup.cta_button}
          </button>
        </div>
      </form>

      {/* Justificativa da Microcopy Legal: Essencial para confiança e conformidade.
          A formulação "Ao continuar, você concorda..." é de baixo atrito, evitando
          um clique extra em uma checkbox obrigatória. */}
      <p className="mt-6 text-center text-xs text-neutral-500">
        {t.signup.terms_prefix}{' '}
        <Link href="/termos" className="font-medium text-[var(--color-primary)] hover:underline">
          {t.signup.terms_link}
        </Link>{' '}
        &{' '}
        <Link href="/privacidade" className="font-medium text-[var(--color-primary)] hover:underline">
          {t.signup.privacy_link}
        </Link>
        .
      </p>

      {/* Justificativa do Link de Login: Uma "saída de emergência" crucial para
          usuários existentes que chegam aqui por engano. Evita frustração e
          potencial churn. É um padrão de UX essencial. */}
      <p className="mt-4 text-center text-sm text-neutral-600">
        {t.signup.login_prompt}{' '}
        <Link href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
          {t.signup.login_link}
        </Link>
      </p>
    </div>
  );
}
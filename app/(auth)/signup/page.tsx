// /app/(auth)/signup/page.tsx - VERSÃO FINAL COM CAMPO DE NOME

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/useI18n";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function SignupPage() {
  const { t } = useI18n();
  const router = useRouter();
  const supabase = createClient();

  // Estados para gerenciar todos os campos do formulário
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
    } else {
      // Redireciona para a verificação de e-mail após o sucesso
      router.push("/verify");
    }
  };

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

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Campo de Nome Completo */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700">
            {t.signup.name_label}
          </label>
          <div className="mt-1">
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        
        {/* Campo de Email */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>

        {/* Campo de Senha */}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        
        {error && (
          <p className="text-sm text-center text-red-600">{error}</p>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-lg bg-[var(--color-action)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t.signup.loading_button : t.signup.cta_button}
          </button>
        </div>
      </form>

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

      <p className="mt-4 text-center text-sm text-neutral-600">
        {t.signup.login_prompt}{' '}
        <Link href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
          {t.signup.login_link}
        </Link>
      </p>
    </div>
  );
}
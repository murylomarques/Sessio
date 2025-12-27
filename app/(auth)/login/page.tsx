// /app/(auth)/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/useI18n";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const { t } = useI18n();
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
    } else {
      // O AuthListener cuidará do redirecionamento para a área logada
      // Mas podemos forçar um refresh para garantir que o middleware reavalie.
      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-md p-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-[var(--color-primary)]">Sessio</h1>
        <h2 className="mt-2 text-xl font-semibold text-neutral-800">{t.login.title}</h2>
        <p className="mt-1 text-neutral-600">{t.login.subtitle}</p>
      </div>

      <form onSubmit={handleSignIn} className="mt-8 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">{t.login.email_label}</label>
          <div className="mt-1">
            <input
              id="email" name="email" type="email" autoComplete="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">{t.login.password_label}</label>
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-[var(--color-primary)] hover:underline">
                {t.login.forgot_password_link}
              </Link>
            </div>
          </div>
          <div className="mt-1">
            <input
              id="password" name="password" type="password" autoComplete="current-password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-[var(--color-primary)] sm:text-sm"
            />
          </div>
        </div>
        
        {error && <p className="text-sm text-center text-red-600">{error}</p>}

        <div>
          <button type="submit" disabled={isLoading} className="flex w-full justify-center rounded-lg bg-[var(--color-action)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50">
            {isLoading ? t.login.loading_button : t.login.cta_button}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-neutral-500">
        {t.login.signup_prompt}{' '}
        <Link href="/signup" className="font-semibold leading-6 text-[var(--color-primary)] hover:underline">
          {t.login.signup_link}
        </Link>
      </p>
    </div>
  );
}
// /components/auth/AuthListener.tsx

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AuthListener() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // REGRA DE REDIRECIONAMENTO PÓS-LOGIN:
      // Quando o Supabase detecta um login (isso acontece após a troca do código do e-mail)...
      if (event === 'SIGNED_IN' && session) {
        // Redireciona o usuário para a área protegida da aplicação.
        router.push('/app/onboarding');
      }

      // REGRA DE REDIRECIONAMENTO PÓS-LOGOUT:
      // Quando o usuário faz logout...
      if (event === 'SIGNED_OUT') {
        // Redireciona para a página de login.
        router.push('/login');
      }
    });

    // Limpa a inscrição quando o componente é desmontado.
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  return null; // Este componente não renderiza nada.
}
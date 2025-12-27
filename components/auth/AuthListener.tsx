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
      
      // REDIRECIONA PÓS-LOGIN NORMAL
      if (event === 'SIGNED_IN' && session) {
        router.push('/app/onboarding'); // área protegida do app
      }

      // REDIRECIONA PÓS-LOGOUT
      if (event === 'SIGNED_OUT') {
        router.push('/login'); // página de login
      }
    });

    // Limpa a inscrição quando o componente é desmontado
    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return null; // componente invisível
}

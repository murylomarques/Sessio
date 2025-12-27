// /lib/supabase/client.ts

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // --- INÍCIO DO CÓDIGO DE DEPURAÇÃO ---
  console.log("Supabase URL usada:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Supabase Anon Key usada:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  // --- FIM DO CÓDIGO DE DEPURAÇÃO ---

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
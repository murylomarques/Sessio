import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get('code');
  const type = searchParams.get('type');      // deve ser "recovery"
  const nextPath = searchParams.get('next');  // deve ser "/auth/update-password"

  if (!code) {
    return NextResponse.json({ error: "No code provided" });
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Erro no callback:", error.message);
    return NextResponse.json({ error: error.message });
  }

  // Se for reset de senha, vai pra página de update-password
  if (type === "recovery" && nextPath) {
    return NextResponse.redirect(`${origin}${nextPath}`);
  }

  // Se for qualquer outro tipo, vai pro dashboard
  return NextResponse.redirect(`${origin}/app/dashboard`);
}

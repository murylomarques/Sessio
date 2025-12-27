// /app/api/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ error: "Token ou senha inválidos" }, { status: 400 });
  }

  // Atualiza a senha usando o token de recuperação
  const { error } = await supabase.auth.updateUser({
    password,
    email_change_token: token,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Senha atualizada com sucesso!" });
}

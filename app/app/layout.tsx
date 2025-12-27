// app/(app)/layout.tsx

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LayoutClient from "./layout-client";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <LayoutClient user={user}>
      {children}
    </LayoutClient>
  );
}

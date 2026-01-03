// /app/app/calendar/page.tsx - COM DADOS PARA INTERATIVIDADE

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CalendarView from "./CalendarView";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) notFound();

  // A busca agora inclui o `id` do paciente
  const { data: appointments, error } = await supabase
    .from("appointments")
    .select("id, start_time, end_time, patients (id, full_name)") // <-- MUDANÇA AQUI
    .eq("user_id", user.id);

  if (error) { console.error("Erro ao buscar agendamentos:", error); }

  const events = appointments?.map((app) => ({
      id: app.id,
      title: (app.patients as any)?.full_name ?? "Paciente",
      start: app.start_time,
      end: app.end_time,
      // Passamos dados extras para o frontend usar nos cliques
      extendedProps: {
        patientId: (app.patients as any)?.id, // <-- MUDANÇA AQUI
      },
      backgroundColor: "var(--color-primary)",
      borderColor: "var(--color-primary)",
      textColor: "var(--color-bg)",
    })) || [];

  return <CalendarView initialEvents={events} />;
}
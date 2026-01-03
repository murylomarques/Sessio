"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/useI18n";
import { PencilSquareIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Patient = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
};

type Note = {
  id: string;
  created_at: string;
  content: string;
};

export default function PatientDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const { t } = useI18n();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data: patientData, error } = await supabase
        .from("patients")
        .select("id, full_name, email, phone")
        .eq("id", id)
        .eq("user_id", session.user.id)
        .single();

      if (error || !patientData) {
        router.push("/app/patients");
        return;
      }

      const { data: notesData } = await supabase
        .from("clinical_notes")
        .select("id, created_at, content")
        .eq("patient_id", id)
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      setPatient(patientData);
      setNotes(notesData || []);
      setLoading(false);
    };

    loadData();
  }, [id, router, supabase]);

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(search.toLowerCase()) ||
    new Date(note.created_at).toLocaleDateString("pt-BR").includes(search)
  );

  if (loading) {
    return (
      <div className="py-10 text-center text-neutral-500">
        Carregando paciente...
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="py-10 text-center text-red-500">
        Paciente não encontrado.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            {patient.full_name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
            <span>{patient.email || t.patientDetail.email_fallback}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>{patient.phone || t.patientDetail.phone_fallback}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href={`/app/patients/${id}/new-appointment`} className="...">
            Agendar Sessão
          </Link>
          <Link
            href={`/app/patients/${id}/edit`}
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 transition"
          >
            {t.patientDetail.edit_button}
          </Link>

          <Link
            href={`/app/patients/${id}/new-note`}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-action)] px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 transition"
          >
            <PencilSquareIcon className="h-5 w-5" />
            {t.patientDetail.add_note_button}
          </Link>
        </div>
      </div>

      {/* HISTÓRICO */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-neutral-800">
            {t.patientDetail.history_title}
          </h2>

          <div className="relative w-full sm:max-w-xs">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar por palavra ou data..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 py-2 text-sm 
                         text-neutral-700 placeholder-neutral-400 shadow-sm
                         focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]
                         transition"
            />
          </div>
        </div>

        {/* LISTA */}
        <div className="space-y-5">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <p className="text-sm text-neutral-500">
                  {new Date(note.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <p className="mt-3 whitespace-pre-wrap text-neutral-700">
                  {note.content.length > 300
                    ? note.content.slice(0, 300) + "..."
                    : note.content}
                </p>

                <Link
                  href={`/app/patients/${id}/notes/${note.id}`}
                  className="mt-4 inline-block text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-action)] transition"
                >
                  {t.patientDetail.view_edit_note_link}
                </Link>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-200 py-12 text-center">
              <p className="font-medium text-neutral-600">
                {t.patientDetail.empty_state_title}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                {t.patientDetail.empty_state_subtitle}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

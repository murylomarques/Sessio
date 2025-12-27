"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/useI18n";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data: patientData, error: patientError } = await supabase
        .from("patients")
        .select("id, full_name, email, phone")
        .eq("id", id)
        .eq("user_id", session.user.id)
        .single();

      if (patientError || !patientData) {
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
  }, [id, supabase, router]);

  // LOADING
  if (loading) {
    return <div className="py-10 text-center">Carregando paciente...</div>;
  }

  // FALLBACK
  if (!patient) {
    return (
      <div className="py-10 text-center text-red-500">
        Paciente não encontrado.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* HEADER */}
      <div className="sm:flex sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            {patient.full_name}
          </h1>

          <div className="mt-2 flex items-center gap-x-4 text-sm text-neutral-500">
            <span>{patient.email || t.patientDetail.email_fallback}</span>
            <div className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>{patient.phone || t.patientDetail.phone_fallback}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-x-3 sm:mt-0">
          <Link
            href={`/app/patients/${id}/edit`}
            className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {t.patientDetail.edit_button}
          </Link>

          <Link
            href={`/app/patients/${id}/new-note`}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-action)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
          >
            <PencilSquareIcon className="h-5 w-5" />
            {t.patientDetail.add_note_button}
          </Link>
        </div>
      </div>

      {/* HISTÓRICO */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-neutral-800">
          {t.patientDetail.history_title}
        </h2>

        <div className="mt-4 space-y-6">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
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
                  className="mt-4 inline-block text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-action)]"
                >
                  {t.patientDetail.view_edit_note_link}
                </Link>
              </div>
            ))
          ) : (
            <div className="rounded-lg border-2 border-dashed border-neutral-200 py-12 text-center">
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

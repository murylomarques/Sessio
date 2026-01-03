"use client";

import { useI18n } from "@/lib/useI18n";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NoteDetailView({
  note,
  patientId,
}: {
  note: any;
  patientId: string;
}) {
  const { t } = useI18n();
  const patientName =
    (note.patients as { full_name: string })?.full_name || "Paciente";

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Voltar */}
      <Link
        href={`/app/patients/${patientId}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        {t.noteDetail.back_link.replace("{patientName}", patientName)}
      </Link>

      {/* Card principal */}
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-neutral-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-neutral-900">
              {t.noteDetail.title}
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              {new Date(note.created_at).toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <Link
            href={`/app/patients/${patientId}/notes/${note.id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-action)] px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 transition"
          >
            <PencilSquareIcon className="h-5 w-5" />
            {t.noteDetail.edit_button}
          </Link>
        </div>

        {/* Conteúdo */}
        <div className="px-6 py-6">
          <div className="prose prose-neutral max-w-none whitespace-pre-wrap text-neutral-800">
            {note.content || (
              <span className="italic text-neutral-400">
                {t.noteDetail.content_fallback}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

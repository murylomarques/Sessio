"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useI18n } from "@/lib/useI18n";
import { useRouter } from "next/navigation";
import { autoSaveClinicalNote } from "@/app/_actions";

type Note = {
  id: string;
  content: string;
};

export default function EditNoteForm({
  note,
  patientId,
}: {
  note: Note;
  patientId: string;
}) {
  const { t } = useI18n();
  const router = useRouter();

  const [content, setContent] = useState(note.content);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (content === note.content) return;

    setStatus("saving");

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      startTransition(async () => {
        await autoSaveClinicalNote({
          noteId: note.id,
          patientId,
          content,
        });

        setStatus("saved");
      });
    }, 700);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [content, note.id, patientId]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            {t.editNoteForm.title}
          </h1>
          <p className="text-sm text-neutral-500">
            {t.editNoteForm.subtitle}
          </p>
        </div>

        <span className="text-sm">
          {status === "saving" && (
            <span className="text-yellow-600">Salvando...</span>
          )}
          {status === "saved" && (
            <span className="text-green-600">Salvo</span>
          )}
        </span>
      </div>

      {/* EDITOR */}
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <textarea
          className="min-h-[420px] w-full resize-none rounded-2xl border-none p-6 text-base leading-relaxed text-neutral-800 outline-none focus:ring-0"
          placeholder={t.newNoteForm.placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* FOOTER */}
      <div className="mt-6">
        <button
          onClick={() => router.back()}
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          {t.editNoteForm.cancel_button}
        </button>
      </div>
    </div>
  );
}

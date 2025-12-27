// /app/app/patients/[id]/notes/[noteId]/NoteDetailView.tsx

"use client"; // Declara que este é um Client Component

import { useI18n } from "@/lib/useI18n"; // O seu hook existente
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// O componente recebe os dados já buscados pelo Server Component
export default function NoteDetailView({ note, patientId }: { note: any, patientId: string }) {
  const { t } = useI18n();
  const patientName = (note.patients as { full_name: string })?.full_name || 'Paciente';

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <Link 
          href={`/app/patients/${patientId}`}
          className="inline-flex items-center gap-x-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>{t.noteDetail.back_link.replace('{patientName}', patientName)}</span>
        </Link>
      </div>
      
      <div className="overflow-hidden rounded-lg bg-white shadow border border-neutral-200">
        <div className="px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-lg font-semibold leading-6 text-neutral-900">{t.noteDetail.title}</h1>
              <p className="mt-1 text-sm text-neutral-500">
                {new Date(note.created_at).toLocaleDateString('pt-BR', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
            <div className="ml-4 mt-0 flex-shrink-0">
              <Link
                href={`/app/patients/${patientId}/notes/${note.id}/edit`}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {t.noteDetail.edit_button}
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-6 py-6">
          <div className="text-base leading-7 text-neutral-800 whitespace-pre-wrap">
            {note.content || <span className="italic text-neutral-400">{t.noteDetail.content_fallback}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
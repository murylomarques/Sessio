// /app/app/import/page.tsx - COM FEEDBACK MELHORADO

"use client";

import { useState } from 'react';
import { useI18n } from '@/lib/useI18n';
import { ArrowUpTrayIcon, DocumentCheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { importPatientsFromCSV } from '@/app/_actions';

type ImportStatus = 'idle' | 'processing' | 'success' | 'error';

export default function ImportPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [status, setStatus] = useState<ImportStatus>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  
  // Estados para feedback específico
  const [successDetails, setSuccessDetails] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      handleImport(file);
    }
  };

  const handleImport = async (file: File) => {
    setStatus('processing');
    setErrorDetails(null);
    setSuccessDetails(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await importPatientsFromCSV(formData);

      if (result.success) {
        setStatus('success');
        // Armazena a mensagem de sucesso com a contagem
        setSuccessDetails(t.import.success_desc.replace('{count}', result.count?.toString() || '0'));
        setTimeout(() => router.push('/app/patients'), 3000); // Aumentei o tempo para o usuário ler a msg
      } else {
        setStatus('error');
        // Armazena a mensagem de erro específica da Server Action
        setErrorDetails(result.error || t.import.error_details_placeholder);
      }
    } catch (e) {
      setStatus('error');
      setErrorDetails('Falha na comunicação com o servidor. Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      {status === 'idle' && (
        <>
          <h1 className="text-2xl font-semibold text-neutral-900">{t.import.title}</h1>
          <p className="mt-2 text-lg text-neutral-600">{t.import.subtitle}</p>
          <div className="mt-8">
            <label
              htmlFor="file-upload"
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-white p-12 text-center transition hover:border-neutral-400"
            >
              <ArrowUpTrayIcon className="h-12 w-12 text-neutral-400" />
              <span className="mt-4 block font-semibold text-neutral-700">{t.import.upload_cta}</span>
              <span className="mt-1 block text-sm text-neutral-500">{t.import.upload_subtext}</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".csv" onChange={handleFileChange} />
            </label>
          </div>
        </>
      )}

      {status === 'processing' && (
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-[var(--color-primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h2 className="mt-6 text-xl font-semibold text-neutral-800">{t.import.processing_title}</h2>
          <p className="mt-2 text-neutral-600">{t.import.processing_desc.replace('{fileName}', fileName || '')}</p>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center">
          <DocumentCheckIcon className="h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-xl font-semibold text-neutral-800">{t.import.success_title}</h2>
          {/* Exibe a mensagem de sucesso dinâmica */}
          <p className="mt-2 text-neutral-600">{successDetails}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-xl font-semibold text-neutral-800">{t.import.error_title}</h2>
          {/* Exibe a mensagem de erro dinâmica */}
          <p className="mt-2 text-neutral-600">{errorDetails}</p>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { useI18n } from "@/lib/useI18n";
import { ArrowUpTrayIcon, DocumentCheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { importPatientsFromCSV } from "@/app/_actions";

type ImportStatus = "idle" | "processing" | "success" | "error";

const MAX_FILE_SIZE_MB = 5;

export default function ImportPage() {
  const { t } = useI18n();
  const router = useRouter();

  const [status, setStatus] = useState<ImportStatus>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [successDetails, setSuccessDetails] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const resetFeedback = () => {
    setErrorDetails(null);
    setSuccessDetails(null);
  };

  const validateFile = (file: File): string | null => {
    if (!file.name.endsWith(".csv")) {
      return t.import.errors.invalid_type;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return t.import.errors.file_too_large.replace(
        "{size}",
        MAX_FILE_SIZE_MB.toString()
      );
    }

    return null;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    resetFeedback();

    const validationError = validateFile(file);
    if (validationError) {
      setStatus("error");
      setErrorDetails(validationError);
      return;
    }

    setFileName(file.name);
    await handleImport(file);
  };

  const handleImport = async (file: File) => {
    setStatus("processing");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await importPatientsFromCSV(formData);

      if (result.success) {
        setStatus("success");
        setSuccessDetails(
          t.import.success_desc.replace(
            "{count}",
            result.count?.toString() || "0"
          )
        );

        setTimeout(() => {
          router.push("/app/patients");
        }, 3000);
      } else {
        setStatus("error");
        setErrorDetails(result.error || t.import.error_details_placeholder);
      }
    } catch {
      setStatus("error");
      setErrorDetails(t.import.network_error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      {status === "idle" && (
        <>
          <h1 className="text-2xl font-semibold text-neutral-900">
            {t.import.title}
          </h1>
          <p className="mt-2 text-lg text-neutral-600">
            {t.import.subtitle}
          </p>

          <div className="mt-8">
            <label
              htmlFor="file-upload"
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-white p-12 transition hover:border-neutral-400"
            >
              <ArrowUpTrayIcon className="h-12 w-12 text-neutral-400" />
              <span className="mt-4 font-semibold text-neutral-700">
                {t.import.upload_cta}
              </span>
              <span className="mt-1 text-sm text-neutral-500">
                {t.import.upload_subtext}
              </span>

              <input
                id="file-upload"
                type="file"
                accept=".csv"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </>
      )}

      {status === "processing" && (
        <div className="flex flex-col items-center">
          <svg
            className="h-12 w-12 animate-spin text-[var(--color-primary)]"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>

          <h2 className="mt-6 text-xl font-semibold text-neutral-800">
            {t.import.processing_title}
          </h2>
          <p className="mt-2 text-neutral-600">
            {t.import.processing_desc.replace("{fileName}", fileName || "")}
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center">
          <DocumentCheckIcon className="h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-xl font-semibold text-neutral-800">
            {t.import.success_title}
          </h2>
          <p className="mt-2 text-neutral-600">{successDetails}</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-xl font-semibold text-neutral-800">
            {t.import.error_title}
          </h2>
          <p className="mt-2 text-neutral-600">{errorDetails}</p>
        </div>
      )}
    </div>
  );
}

// /app/app/patients/page.tsx - VERSÃO FINAL COM BOTÃO DE IMPORTAR

"use client";

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/useI18n';
import { createClient } from '@/lib/supabase/client';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Patient = {
  id: string;
  full_name: string;
  email: string | null;
  status: string;
}

export default function PatientsPage() {
  const { t } = useI18n();
  const supabase = createClient();
  
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      // Usar getUser em vez de getSession para seguir a recomendação de segurança do Supabase
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error: fetchError } = await supabase
          .from('patients')
          .select('id, full_name, email, status')
          .eq('user_id', user.id)
          .order('full_name', { ascending: true });
        
        if (fetchError) {
          console.error("Erro ao buscar pacientes:", fetchError);
          setError(t.patients.error_loading);
        } else {
          setPatients(data);
        }
      } else {
        setError("Sessão não encontrada. Por favor, faça login novamente.");
      }
      setIsLoading(false);
    };

    if (t.patients.error_loading) {
      fetchPatients();
    }
  }, [supabase, t.patients.error_loading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin h-8 w-8 text-[var(--color-primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-4 text-neutral-600">{t.patients.loading || 'Carregando pacientes...'}</p>
      </div>
    );
  }
  
  if (error) {
    return <p className="text-center text-red-500 py-8">{error}</p>;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">{t.patients.title}</h1>
          <p className="mt-1 text-neutral-600">{t.patients.subtitle}</p>
        </div>
        
        {/* Bloco de Ações ATUALIZADO com o botão "Importar" */}
        <div className="mt-4 flex items-center gap-x-3 sm:mt-0">
          <Link 
            href="/app/import" 
            className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {t.patients.import_button} 
          </Link>
          <Link 
            href="/app/patients/new" 
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-action)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
          >
            <UserPlusIcon className="h-5 w-5" />
            {t.patients.add_patient_button}
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-neutral-300">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-900 sm:pl-6">{t.patients.table_header_name}</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900">{t.patients.table_header_email}</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900">{t.patients.table_header_status}</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">{t.patients.table_action_view}</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  {patients && patients.length > 0 ? (
                    patients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-neutral-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-900 sm:pl-6">{patient.full_name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">{patient.email || '-'}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            patient.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-800'
                          }`}>
                            {patient.status === 'active' ? t.patients.status_active : t.patients.status_archived}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link href={`/app/patients/${patient.id}`} className="text-[var(--color-primary)] hover:text-[var(--color-action)]">
                            {t.patients.table_action_view}<span className="sr-only">, {patient.full_name}</span>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-neutral-500">
                        <p className="font-medium">{t.patients.empty_state_title}</p>
                        <p className="text-sm">{t.patients.empty_state_subtitle}</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
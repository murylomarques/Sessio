// /app/app/patients/page.tsx - USANDO O PADRÃO DE SERVIDOR

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getDictionary } from '@/lib/i18n/getDictionary'; // Agora o import funciona
import Link from 'next/link';
import { UserPlusIcon } from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

export default async function PatientsPage() {
  const t = await getDictionary(); // `await` é opcional aqui se a função for síncrona, mas é bom manter
  const supabase = createSupabaseServerClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  
  const { data: patients, error } = await supabase
    .from('patients')
    .select('id, full_name, email, status')
    .eq('user_id', session?.user.id)
    .order('full_name', { ascending: true });

  if (error) {
    console.error('Erro ao buscar pacientes:', error);
    return <p className="text-center text-red-500 py-8">{t.patients.error_loading}</p>;
  }

  // O resto do código é o mesmo que eu forneci antes, usando o objeto `t`.
  return (
    <div className="mx-auto max-w-4xl">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">{t.patients.title}</h1>
          <p className="mt-1 text-neutral-600">{t.patients.subtitle}</p>
        </div>
        <div className="mt-4 sm:mt-0">
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
        {/* ... (código completo da tabela usando o objeto `t`) ... */}
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-neutral-300">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-900 sm:pl-6">{t.patients.table_header_name}</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900">{t.patients.table_header_email}</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900">{t.patients.table_header_status}</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">{t.patients.table_action_view}</span>
                    </th>
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
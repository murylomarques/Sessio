"use client";

import { useI18n } from '@/lib/useI18n';
import Link from 'next/link';
import { CalendarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function DashboardClient({ appointments, pendingPayments }: any) {
  const { t } = useI18n();

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold text-neutral-900">
          {t.dashboard.title}
        </h1>
        <p className="text-neutral-500">
          {t.dashboard.subtitle}
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* AGENDA */}
        <div className="rounded-2xl bg-white border border-neutral-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <CalendarIcon className="h-6 w-6 text-[var(--color-primary)]" />
            <h2 className="text-lg font-semibold">
              {t.dashboard.today_schedule}
            </h2>
          </div>

          {appointments.length ? (
            <div className="space-y-3">
              {appointments.map(app => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-100 px-4 py-3 hover:bg-neutral-50 transition"
                >
                  <div>
                    <p className="font-medium text-neutral-800">
                      {app.patients?.full_name}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {new Date(app.start_time).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {t.dashboard.status_scheduled}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-neutral-500">
              {t.dashboard.no_appointments}
            </div>
          )}
        </div>

        {/* PAGAMENTOS */}
        <div className="rounded-2xl bg-white border border-neutral-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
            <h2 className="text-lg font-semibold">
              {t.dashboard.pending_payments}
            </h2>
          </div>

          {pendingPayments.length ? (
            <div className="space-y-3">
              {pendingPayments.map(p => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-100 px-4 py-3 hover:bg-neutral-50 transition"
                >
                  <div>
                    <p className="font-medium text-neutral-800">
                      {p.patients?.full_name}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {new Date(p.start_time).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <Link
                    href="#"
                    className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                  >
                    {t.dashboard.charge}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-neutral-500">
              {t.dashboard.no_pending_payments}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

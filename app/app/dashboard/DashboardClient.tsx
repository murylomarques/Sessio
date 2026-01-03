"use client";

import { useI18n } from "@/lib/useI18n";
import Link from "next/link";
import {
  CalendarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function DashboardClient({
  appointments = [],
  pendingPayments = [],
}: any) {
  const { t } = useI18n();

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">
          {t.dashboard.title}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {t.dashboard.subtitle}
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* AGENDA */}
        <section className="rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/50 transition hover:shadow-md">
          <header className="flex items-center gap-2 px-6 py-4 border-b border-neutral-100">
            <CalendarIcon className="h-5 w-5 text-[var(--color-primary)]" />
            <h2 className="text-base font-semibold text-neutral-900">
              {t.dashboard.today_schedule}
            </h2>
          </header>

          <div className="p-4">
            {appointments.length ? (
              <div className="space-y-2">
                {appointments.map((app: any) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between rounded-xl px-4 py-3 transition hover:bg-neutral-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {app.patients?.full_name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {new Date(app.start_time).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                      {t.dashboard.status_scheduled}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-sm text-neutral-500">
                {t.dashboard.no_appointments}
              </div>
            )}
          </div>
        </section>

        {/* PAGAMENTOS */}
        <section className="rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/50 transition hover:shadow-md">
          <header className="flex items-center gap-2 px-6 py-4 border-b border-neutral-100">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
            <h2 className="text-base font-semibold text-neutral-900">
              {t.dashboard.pending_payments}
            </h2>
          </header>

          <div className="p-4">
            {pendingPayments.length ? (
              <div className="space-y-2">
                {pendingPayments.map((p: any) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-xl px-4 py-3 transition hover:bg-neutral-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {p.patients?.full_name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {new Date(p.start_time).toLocaleDateString("pt-BR")}
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
              <div className="py-10 text-center text-sm text-neutral-500">
                {t.dashboard.no_pending_payments}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

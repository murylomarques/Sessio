"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/useI18n";
import { createClient } from "@/lib/supabase/client";
import {
  UserPlusIcon,
  MagnifyingGlassIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

type Patient = {
  id: string;
  full_name: string;
  email: string | null;
  status: string;
};

export default function PatientsPage() {
  const { t } = useI18n();
  const supabase = createClient();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [filtered, setFiltered] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("patients")
        .select("id, full_name, email, status")
        .eq("user_id", user.id)
        .order("full_name");

      setPatients(data || []);
      setFiltered(data || []);
      setLoading(false);
    };

    fetch();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    const result = patients.filter(p =>
      p.full_name.toLowerCase().includes(value) ||
      (p.email?.toLowerCase().includes(value) ?? false)
    );

    setFiltered(
      status === "all"
        ? result
        : result.filter(p => p.status === status)
    );
  }, [search, status, patients]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Seus Pacientes
          </h1>
          <p className="text-sm text-neutral-500">
            Gerencie seus pacientes de forma rápida e organizada.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/app/import"
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition"
          >
            Importar
          </Link>

          <Link
            href="/app/patients/new"
            className="flex items-center gap-2 rounded-lg bg-[var(--color-action)] px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 transition"
          >
            <UserPlusIcon className="h-5 w-5" />
            Novo paciente
          </Link>
        </div>
      </div>

      {/* FILTROS */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-sm">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[var(--color-primary)]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm transition focus:ring-2 focus:ring-[var(--color-primary)]"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="active">Ativos</option>
          <option value="archived">Arquivados</option>
        </select>
      </div>

      {/* LISTA */}
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <UsersIcon className="h-10 w-10 text-neutral-400" />
          <p className="mt-2 font-medium text-neutral-700">
            Nenhum paciente encontrado
          </p>
          <p className="text-sm text-neutral-500">
            Tente buscar por outro nome ou email.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 animate-fade-in">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="group flex items-center justify-between rounded-xl bg-white px-5 py-4 transition hover:shadow-md"
            >
              <div>
                <p className="font-medium text-neutral-900">{p.full_name}</p>
                <p className="text-sm text-neutral-500">{p.email}</p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    p.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {p.status === "active" ? "Ativo" : "Arquivado"}
                </span>

                <Link
                  href={`/app/patients/${p.id}`}
                  className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-action)] transition"
                >
                  Ver prontuário →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

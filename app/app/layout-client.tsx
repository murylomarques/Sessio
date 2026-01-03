"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useI18n } from "@/lib/useI18n";
import { createClient } from "@/lib/supabase/client";
import clsx from "clsx";

export default function LayoutClient({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const { t } = useI18n();
  const pathname = usePathname();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const navItem = (href: string, label: string, Icon: any) => {
    const active = pathname.startsWith(href);

    return (
      <Link
        href={href}
        className={clsx(
          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
          active
            ? "bg-white/15 text-white"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        )}
      >
        <Icon className="h-5 w-5 opacity-90" />
        {label}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-[var(--color-bg)]">
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col bg-[var(--color-primary)] text-white shadow-lg">
        {/* LOGO */}
        <div className="flex h-16 items-center justify-center border-b border-white/10">
          <span className="text-lg font-semibold tracking-wide">
            Sessio
          </span>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItem("/app/dashboard", t.navigation.dashboard, ChartBarIcon)}
          {navItem("/app/calendar", t.navigation.dashboard, ChartBarIcon)}
          {navItem("/app/patients", t.navigation.patients, UsersIcon)}
          {navItem("/app/settings", t.navigation.settings, Cog6ToothIcon)}
        </nav>

        {/* USER FOOTER */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center font-semibold text-sm">
              {user.user_metadata?.full_name?.[0] ?? "U"}
            </div>

            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">
                {user.user_metadata?.full_name}
              </p>
              <p className="text-xs text-white/70 truncate">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={signOut}
            className="mt-4 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-200 hover:bg-red-500/10 transition"
          >
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
            {t.navigation.sign_out}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}

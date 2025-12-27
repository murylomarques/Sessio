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
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
          active
            ? "bg-[var(--color-primary)] text-white"
            : "text-neutral-600 hover:bg-neutral-100"
        )}
      >
        <Icon className="h-5 w-5" />
        {label}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-neutral-100">
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white">
        {/* LOGO */}
        <div className="flex h-16 items-center justify-center border-b">
          <span className="text-xl font-bold text-[var(--color-primary)]">
            Sessio
          </span>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItem("/app/dashboard", t.navigation.dashboard, ChartBarIcon)}
          {navItem("/app/patients", t.navigation.patients, UsersIcon)}
          {navItem("/app/settings", t.navigation.settings, Cog6ToothIcon)}
        </nav>

        {/* USER FOOTER */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-neutral-200 flex items-center justify-center font-semibold text-sm">
              {user.user_metadata?.full_name?.[0] ?? "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">
                {user.user_metadata?.full_name}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={signOut}
            className="mt-4 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
            {t.navigation.sign_out}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}

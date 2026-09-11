"use client";

import { logoutAction } from "@/actions/auth";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconLayoutSidebarLeftCollapse,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useTransition } from "react";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className="size-5 shrink-0" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <IconUserBolt className="size-5 shrink-0" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="size-5 shrink-0" />,
    },
  ];

  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleLogoutClick = () => {
    queryClient.clear();

    startTransition(() => logoutAction());
  };

  return (
    <div className="drawer md:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Conteúdo */}
      <div className="drawer-content">
        {/* Navbar */}
        <div className="navbar bg-neutral shadow-sm w-full px-4 lg:px-8">
          {/* Botão da sidebar */}
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              aria-label="toggle sidebar"
              className="btn btn-square btn-ghost"
            >
              <IconLayoutSidebarLeftCollapse className="size-5" />
            </label>
          </div>

          {/* Logo / título */}
          <div className="flex-1">
            <span className="px-4 text-xl font-semibold text-primary">
              Dashboard
            </span>
          </div>
        </div>

        {/* Página */}
        <main className="w-full">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        {/* Overlay no mobile */}
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <aside
          className="
            flex
            min-h-full
            flex-col
            bg-neutral
            border-r
            border-neutral-300
            transition-all
            duration-200

            is-drawer-close:w-14
            is-drawer-open:w-64
          "
        >
          {/* Logo */}
          <div
            className="
              flex
              h-16
              items-center
              px-5
            "
          >
            <div className="flex items-center gap-2">
              <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-primary" />

              <span className="font-medium text-primary is-drawer-close:hidden">
                Vinícius
              </span>
            </div>
          </div>

          {/* Links */}
          <ul className="menu w-full grow gap-1 p-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    is-drawer-close:tooltip
                    is-drawer-close:tooltip-right
                  "
                  data-tip={link.label}
                >
                  {link.icon}

                  <span className="is-drawer-close:hidden">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Logout */}
          <div className="p-2">
            <ul className="menu w-full">
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Logout"
                  disabled={isPending}
                  onClick={handleLogoutClick}
                >
                  <IconArrowLeft className="size-5 shrink-0" />
                  <span className="is-drawer-close:hidden">
                    {isPending ? "Saindo..." : "Logout"}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

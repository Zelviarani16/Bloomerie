"use client";

/*
  AdminSidebar.jsx
  Sesuai Figma: sidebar kiri fixed, logo "Bloomerie Admin" + role
  "Manajer Toko" di atas, menu utama (Dashboard/Inventori/Pesanan/
  Pelanggan/Artikel/Laporan), lalu di bagian bawah ada Pengaturan
  dan Keluar terpisah dengan garis.

  Dipakai di SEMUA halaman admin lewat AdminLayout.jsx — sama seperti
  Navbar dipakai di semua halaman user lewat root layout.jsx.
*/

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const MENU_ITEMS = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/admin/inventori",
    label: "Inventori",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <line x1="3" y1="9" x2="21" y2="9" />
      </svg>
    ),
  },
  {
    href: "/admin/pesanan",
    label: "Pesanan",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    href: "/admin/pelanggan",
    label: "Pelanggan",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    href: "/admin/artikel",
    label: "Artikel",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      logout();
      router.push("/");
    }
  };

  return (
    <aside
      className="w-64 flex-shrink-0 h-screen sticky top-0 flex flex-col border-r"
      style={{ borderColor: "var(--color-neutral-dark)", background: "white" }}
    >
      {/* Logo + user info */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "var(--color-neutral)", color: "var(--color-primary)" }}
          >
            {user?.nama?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <h1 className="text-base font-bold" style={{ color: "var(--color-primary)" }}>
              Bloomerie Admin
            </h1>
            <p className="text-xs" style={{ color: "var(--color-secondary)" }}>
              {user?.nama || "Admin"}
            </p>
          </div>
        </div>
        <span
          className="inline-block px-2 py-0.5 rounded text-xs font-semibold"
          style={{ background: "var(--color-primary)", color: "white" }}
        >
          Manajer Toko
        </span>
      </div>

      {/* Menu utama */}
      <nav className="flex-1 px-4">
        <ul className="flex flex-col gap-1">
          {MENU_ITEMS.map((item) => {
            // startsWith supaya sub-halaman (misal /admin/pesanan/123)
            // tetap menganggap menu "Pesanan" aktif
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors"
                  style={{
                    background: isActive ? "var(--color-neutral)" : "transparent",
                    color: isActive ? "var(--color-primary)" : "var(--color-ink-soft)",
                  }}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Pengaturan + Keluar */}
      <div className="p-4 border-t" style={{ borderColor: "var(--color-neutral-dark)" }}>
        <Link
          href="/admin/pengaturan"
          className="flex items-center gap-3 px-4 py-3 rounded text-sm font-medium"
          style={{ color: "var(--color-ink-soft)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 005 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 005 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 5a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09A1.65 1.65 0 0015 5a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019 9c.2.5.6.9 1.51 1H21a2 2 0 110 4h-.09c-.91.1-1.31.5-1.51 1z" />
          </svg>
          Pengaturan
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium"
          style={{ color: "var(--color-primary)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Keluar
        </button>
      </div>
    </aside>
  );
}

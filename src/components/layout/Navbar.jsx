"use client";

/*
  Navbar.jsx
  - Logo "Bloomerie" kiri, warna primary, font bold
  - Menu tengah: Beranda, Katalog, Blog, Tentang Kami
    -> link aktif ada underline merah di bawahnya
  - Kanan: ikon user, separator tipis, button Keranjang solid maroon

  usePathname dipakai untuk tau halaman mana yang aktif sekarang,
  supaya underline otomatis pindah sesuai URL yang dibuka.
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/katalog" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Auth state
  const { user } = useAuth();

  // totalItems diambil dari CartContext — otomatis update real-time
  const { totalItems } = useCart();

  // Halaman auth (login/register) dan semua halaman admin punya
  // header sendiri yang beda total dari Navbar publik ini (lihat
  // Login pakai header simpel, Admin pakai sidebar). Jadi
  // Navbar publik ini disembunyikan total di halaman-halaman itu.
  const hideNavbarRoutes = ["/login", "/register", "/lupa-password"];
  const isHidden = hideNavbarRoutes.includes(pathname) || pathname.startsWith("/admin");

  if (isHidden) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: "var(--color-neutral-dark)" }}>
      <nav className="container-bloomerie flex items-center justify-between h-[72px]">

        {/* ── Logo ── */}
        <Link href="/" className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>
          Bloomerie
        </Link>

        {/* ── Menu tengah (desktop) ── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium pb-1 transition-colors ${
                    isActive ? "" : "hover:opacity-70"
                  }`}
                  style={{ color: isActive ? "var(--color-primary)" : "var(--color-ink)" }}
                >
                  {link.label}
                  {/* Underline aktif — animasi geser pakai layoutId, jadi kalau pindah
                      halaman, garis bawahnya "meluncur" bukan langsung pindah */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute left-0 right-0 -bottom-[1px] h-[2px]"
                      style={{ background: "var(--color-primary)" }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Kanan: ikon + tombol (desktop) ── */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <>
              <Link href="/profile" aria-label="Akun" className="hover:opacity-70 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="1.6">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </Link>
              <span className="text-sm" style={{ color: "var(--color-ink-soft)" }}>{user.nama}</span>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--color-ink)" }}>
                Masuk
              </Link>
              <Link href="/register" className="text-sm font-semibold px-4 py-2 rounded text-white" style={{ background: "var(--color-primary)" }}>
                Daftar
              </Link>
            </>
          )}

          <div className="w-px h-6" style={{ background: "var(--color-neutral-dark)" }} />

          <Link href="/keranjang">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-[0.08em] uppercase rounded text-white"
              style={{ background: "var(--color-primary)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" />
              </svg>
              Keranjang
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: "var(--color-tertiary)", color: "white" }}
                >
                  {totalItems}
                </span>
              )}
            </motion.button>
          </Link>
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : {}} className="block w-6 h-[2px]" style={{ background: "var(--color-ink)" }} />
          <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-[2px]" style={{ background: "var(--color-ink)" }} />
          <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : {}} className="block w-6 h-[2px]" style={{ background: "var(--color-ink)" }} />
        </button>
      </nav>

      {/* ── Menu mobile (dropdown) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t"
            style={{ borderColor: "var(--color-neutral-dark)" }}
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium"
                  style={{ color: pathname === link.href ? "var(--color-primary)" : "var(--color-ink)" }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-2 border-t" style={{ borderColor: "var(--color-neutral)" }}>
                {user ? (
                  <>
                    <Link href="/profile" className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                      {user.nama}
                    </Link>
                    <Link href="/profile" className="text-sm" style={{ color: "var(--color-secondary)" }}>
                      Profil Saya
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                      Masuk
                    </Link>
                    <Link href="/register" className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                      Daftar
                    </Link>
                  </>
                )}
              </div>
              <Link href="/keranjang">
                <button
                  className="w-full py-2.5 text-xs font-semibold tracking-[0.08em] uppercase rounded text-white"
                  style={{ background: "var(--color-primary)" }}
                >
                  Keranjang ({totalItems})
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

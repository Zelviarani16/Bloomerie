"use client";

/*
  Navbar.jsx
  Sesuai design Figma:
  - Logo "Bloomerie" kiri, warna primary, font bold
  - Menu tengah: Beranda, Katalog, Blog, Tentang Kami
    -> link aktif ada underline merah di bawahnya
  - Kanan: ikon user, ikon wishlist (heart), separator tipis, button Keranjang solid maroon

  usePathname dipakai untuk tau halaman mana yang aktif sekarang,
  supaya underline otomatis pindah sesuai URL yang dibuka.
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/katalog" },
  { label: "Blog", href: "/blog" },
  { label: "Tentang Kami", href: "/tentang-kami" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Dummy cart count — nanti diganti dari state/context cart yang sesungguhnya
  const cartCount = 0;

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
          <Link href="/login" aria-label="Akun" className="hover:opacity-70 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="1.6">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
          </Link>

          <Link href="/wishlist" aria-label="Wishlist" className="hover:opacity-70 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="1.6">
              <path d="M12 21s-7.5-4.6-10-9.3C0.3 8.4 2 4.8 5.4 4.2c2-.3 3.9.7 4.6 2.4.7-1.7 2.6-2.7 4.6-2.4 3.4.6 5.1 4.2 3.4 7.5C19.5 16.4 12 21 12 21z" />
            </svg>
          </Link>

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
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: "var(--color-tertiary)", color: "white" }}
                >
                  {cartCount}
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
              <div className="flex items-center gap-4 pt-2">
                <Link href="/login" className="text-sm" style={{ color: "var(--color-ink)" }}>Akun</Link>
                <Link href="/wishlist" className="text-sm" style={{ color: "var(--color-ink)" }}>Wishlist</Link>
              </div>
              <Link href="/keranjang">
                <button
                  className="w-full py-2.5 text-xs font-semibold tracking-[0.08em] uppercase rounded text-white"
                  style={{ background: "var(--color-primary)" }}
                >
                  Keranjang ({cartCount})
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
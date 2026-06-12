"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Tentang", href: "/tentang" },
  { label: "Katalog",    href: "/katalog" },
  { label: "Blog",   href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b"
            : "bg-[var(--cream)]"
        }`}
        style={{ borderColor: "var(--border)" }}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

          {/* ── Logo: Fraunces optical size, bukan serif default ── */}
          <Link href="/" className="flex items-baseline gap-[2px]">
            <span
              className="font-logo text-xl tracking-tight"
              style={{
                fontFamily: "'Fraunces', serif",
                fontVariationSettings: "'opsz' 144",
                fontWeight: 400,
                color: "var(--ink)",
                letterSpacing: "-0.03em",
              }}
            >
              Bloom
            </span>
            {/* "erie" italic — memberi karakter tanpa noisy */}
            <span
              className="font-serif-accent text-xl"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--crimson)",
                letterSpacing: "-0.01em",
              }}
            >
              erie
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="relative text-[13px] transition-colors"
                    style={{
                      color: active ? "var(--ink)" : "var(--stone)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {link.label}
                    {/* garis bawah merah kalau active */}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{ background: "var(--crimson)" }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Kanan: search, cart, user ── */}
          <div className="hidden md:flex items-center gap-5">
            {/* Search field kecil */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px]"
              style={{ background: "var(--cream-mid)", color: "var(--stone)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px" }}>
                Cari bunga...
              </span>
            </div>

            {/* Cart */}
            <Link href="/keranjang" className="relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--ink)" }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </Link>

            {/* User */}
            <Link href="/akun">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--ink)" }}>
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 flex flex-col gap-1.5"
            aria-label="Menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-5 h-px" style={{ background: "var(--ink)" }} />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}             className="block w-5 h-px" style={{ background: "var(--ink)" }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-5 h-px" style={{ background: "var(--ink)" }} />
          </button>
        </nav>
      </motion.header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-8"
            style={{ background: "var(--cream)" }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-logo text-4xl"
                  style={{ fontFamily: "'Fraunces', serif", color: "var(--ink)", fontVariationSettings: "'opsz' 72" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
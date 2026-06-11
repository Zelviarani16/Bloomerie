"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "Katalog", href: "/katalog" },
  { label: "Tentang", href: "/tentang" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(15,5,8,0.92)] backdrop-blur-md border-b border-[rgba(139,26,43,0.3)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none">
            <span
              className="text-2xl font-display font-light tracking-[0.2em] text-[var(--cream)]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Bloomerie
            </span>
            <span
              className="text-[9px] tracking-[0.5em] text-[var(--crimson-light)] font-body uppercase mt-0.5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Buket Bunga
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="relative text-sm tracking-[0.15em] text-[var(--cream)] uppercase font-body group"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px" }}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--crimson-light)] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/keranjang"
              className="relative w-8 h-8 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--cream)]">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--crimson)] rounded-full text-[9px] flex items-center justify-center font-body text-white">
                0
              </span>
            </Link>
            <Link
              href="/katalog"
              className="px-6 py-2.5 border border-[var(--crimson)] text-[var(--cream)] text-xs tracking-[0.2em] uppercase font-body hover:bg-[var(--crimson)] transition-all duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Pesan
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[var(--cream)]"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-[var(--cream)]"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[var(--cream)]"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[var(--ink)] flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-display text-[var(--cream)] hover:text-[var(--crimson-light)] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
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
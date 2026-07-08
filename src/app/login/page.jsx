"use client";

/*
  app/login/page.jsx — Halaman Login (/login)

  Sesuai Figma: BUKAN pakai Navbar/Footer biasa milik halaman user
  (yang ada menu Beranda/Katalog/dll) — login punya header sendiri
  yang lebih simpel (cuma logo + Bantuan/Bahasa).

  Karena Navbar+Footer ditaruh di root layout.jsx (app/layout.jsx)
  dan otomatis muncul di SEMUA halaman, halaman ini perlu cara untuk
  "menyembunyikan" Navbar+Footer bawaan. Solusinya: cek pathname di
  Navbar.jsx dan Footer.jsx, kalau halaman saat ini /login atau
  /register atau /admin/*, jangan render apa-apa (return null).
  Lihat perubahan di Navbar.jsx dan Footer.jsx yang menyertai step ini.
*/

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = login(email, password);

    setTimeout(() => {
      setIsSubmitting(false);

      if (result.success) {
        // Redirect berdasarkan role
        if (result.user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } else {
        setError(result.error);
      }
    }, 500);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "white" }}>
      {/* ── Header simpel khusus halaman auth ── */}
      <header className="border-b" style={{ borderColor: "var(--color-neutral-dark)" }}>
        <div className="container-bloomerie flex items-center justify-between h-[72px]">
          <Link href="/" className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>
            Bloomerie
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
              Beranda
            </Link>
            <Link href="/katalog" className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
              Katalog
            </Link>
            <Link href="/blog" className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
              Blog
            </Link>
            <div className="w-px h-5" style={{ background: "var(--color-neutral-dark)" }} />
            <Link href="/bantuan" className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
              Bantuan
            </Link>
          </div>
        </div>
      </header>

      {/* ── Konten utama ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--color-ink)" }}>
            Selamat Datang
          </h1>
          <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Masuk ke akun Bloomerie Anda untuk melanjutkan
          </p>
        </motion.div>

        {/* Card form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md rounded-lg p-8 shadow-sm border"
          style={{ borderColor: "var(--color-neutral-dark)" }}
        >
          <form onSubmit={handleSubmit}>
            {/* Error message */}
            {error && (
              <div className="mb-5 p-3 rounded bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Email */}
            <div className="mb-5">
              <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "var(--color-ink)" }}>
                Email
              </label>
              <div className="relative">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 text-sm rounded border outline-none"
                  style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--color-ink)" }}>
                  Password
                </label>
                <Link href="/lupa-password" className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
                  Lupa Password?
                </Link>
              </div>
              <div className="relative">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 text-sm rounded border outline-none"
                  style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
                />
              </div>
            </div>

            {/* Keep signed in */}
            <label className="flex items-center gap-2.5 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer accent-[var(--color-primary)]"
              />
              <span className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
                Keep me signed in
              </span>
            </label>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 text-sm font-semibold rounded text-white disabled:opacity-60 mb-6"
              style={{ background: "var(--color-primary)" }}
            >
              {isSubmitting ? "Memproses..." : "Login"}
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: "var(--color-neutral-dark)" }} />
              <span className="text-xs tracking-wide" style={{ color: "var(--color-secondary)" }}>
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--color-neutral-dark)" }} />
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 text-sm font-medium rounded border"
                style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.14c-.22-.69-.35-1.43-.35-2.14s.13-1.45.35-2.14V7.02H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.98l2.85-2.21.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.02l3.66 2.84c.87-2.6 3.3-4.48 6.16-4.48z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 text-sm font-medium rounded border"
                style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-3.014 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.122-1.68.013.13.03.28.03.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.367 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.96 4.45z"/>
                </svg>
                Apple
              </button>
            </div>
          </form>
        </motion.div>

        {/* Create account */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm mt-6"
          style={{ color: "var(--color-ink-soft)" }}
        >
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="font-semibold" style={{ color: "var(--color-primary)" }}>
            Create Account
          </Link>
        </motion.p>
      </div>

      {/* ── Footer simpel ── */}
      <footer className="py-6" style={{ background: "var(--color-neutral-dark)" }}>
        <div className="container-bloomerie flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>Bloomerie</p>
            <p className="text-xs" style={{ color: "var(--color-secondary)" }}>© 2026 Bloomerie. Keindahan dalam Setiap Kelopak.</p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/kebijakan-privasi" className="text-xs" style={{ color: "var(--color-ink-soft)" }}>Kebijakan Privasi</Link>
            <Link href="/syarat-ketentuan" className="text-xs" style={{ color: "var(--color-ink-soft)" }}>Syarat & Ketentuan</Link>
            <Link href="/hubungi-kami" className="text-xs" style={{ color: "var(--color-ink-soft)" }}>Hubungi Kami</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

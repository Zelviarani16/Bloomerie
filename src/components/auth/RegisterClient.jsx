"use client";

/*
  RegisterClient.jsx
  Halaman Register untuk user baru
*/

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function RegisterClient() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validasi
    if (!formData.nama || !formData.email || !formData.password) {
      setError("Semua field harus diisi");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok");
      return;
    }

    setIsSubmitting(true);

    // Register user baru
    const result = register(formData.nama, formData.email, formData.password);

    setTimeout(() => {
      setIsSubmitting(false);

      if (result.success) {
        // Arahkan ke halaman login
        router.push("/login");
      } else {
        setError(result.error);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "white" }}>
      {/* ── Header simpel ── */}
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
            Buat Akun Baru
          </h1>
          <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Bergabung dengan Bloomerie untuk pengalaman belanja yang lebih baik
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
              <div className="mb-5 p-3 rounded" style={{ background: "var(--color-neutral)" }}>
                <p className="text-sm" style={{ color: "var(--color-primary)" }}>{error}</p>
              </div>
            )}

            {/* Nama */}
            <div className="mb-5">
              <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "var(--color-ink)" }}>
                Nama Lengkap
              </label>
              <div className="relative">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                  className="w-full pl-11 pr-4 py-3 text-sm rounded border outline-none"
                  style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
                />
              </div>
            </div>

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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 text-sm rounded border outline-none"
                  style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "var(--color-ink)" }}>
                Password
              </label>
              <div className="relative">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimal 6 karakter"
                  required
                  minLength={6}
                  className="w-full pl-11 pr-4 py-3 text-sm rounded border outline-none"
                  style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
                />
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div className="mb-6">
              <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "var(--color-ink)" }}>
                Konfirmasi Password
              </label>
              <div className="relative">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password"
                  required
                  className="w-full pl-11 pr-4 py-3 text-sm rounded border outline-none"
                  style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2.5 mb-6 cursor-pointer">
              <input
                type="checkbox"
                required
                className="w-4 h-4 rounded cursor-pointer accent-[var(--color-primary)] mt-0.5"
              />
              <span className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
                Saya setuju dengan{" "}
                <Link href="/syarat-ketentuan" className="font-semibold" style={{ color: "var(--color-primary)" }}>
                  Syarat & Ketentuan
                </Link>{" "}
                dan{" "}
                <Link href="/kebijakan-privasi" className="font-semibold" style={{ color: "var(--color-primary)" }}>
                  Kebijakan Privasi
                </Link>
              </span>
            </label>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 text-sm font-semibold rounded text-white disabled:opacity-60 mb-4"
              style={{ background: "var(--color-primary)" }}
            >
              {isSubmitting ? "Memproses..." : "Daftar"}
            </motion.button>

            {/* Already have account */}
            <p className="text-center text-sm" style={{ color: "var(--color-ink-soft)" }}>
              Sudah punya akun?{" "}
              <Link href="/login" className="font-semibold" style={{ color: "var(--color-primary)" }}>
                Masuk
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

      {/* ── Footer simpel ── */}
      <footer className="py-6" style={{ background: "var(--color-neutral-dark)" }}>
        <div className="container-bloomerie flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>Bloomerie</p>
            <p className="text-xs" style={{ color: "var(--color-secondary)" }}>© 2024 Bloomerie. Keindahan dalam Setiap Kelopak.</p>
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

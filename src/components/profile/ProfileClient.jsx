"use client";

/*
  ProfileClient.jsx
  Halaman profil user - tampilkan data user, edit profile, logout
*/

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function ProfileClient() {
  const router = useRouter();
  const { user, logout, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
  });

  // Redirect jika belum login (pakai useEffect untuk avoid setState during render)
  useEffect(() => {
    if (user) {
      setIsLoading(false);
      setFormData({
        nama: user.nama || "",
        email: user.email || "",
        telepon: user.telepon || "",
        alamat: user.alamat || "",
      });
    } else {
      router.push("/login");
    }
  }, [user, router]);

  // Tampilkan loading state
  if (isLoading || !user) {
    return (
      <div className="py-12">
        <div className="container-bloomerie max-w-2xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-sm" style={{ color: "var(--color-secondary)" }}>
              Memuat...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      nama: user.nama,
      email: user.email,
      telepon: user.telepon,
      alamat: user.alamat,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      logout();
      router.push("/");
    }
  };

  return (
    <div className="py-12">
      <div className="container-bloomerie max-w-2xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl lg:text-3xl font-bold mb-1.5" style={{ color: "var(--color-ink)" }}>
            Profil Saya
          </h1>
          <p className="text-sm" style={{ color: "var(--color-secondary)" }}>
            Kelola informasi akun dan pengaturan privasi Anda
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl border p-6 md:p-8"
          style={{ borderColor: "var(--color-neutral-dark)" }}
        >
          {/* Avatar & Name */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b" style={{ borderColor: "var(--color-neutral)" }}>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
              style={{ background: "var(--color-neutral)", color: "var(--color-primary)" }}
            >
              {user.nama.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold" style={{ color: "var(--color-ink)" }}>
                {user.nama}
              </h2>
              <p className="text-sm" style={{ color: "var(--color-secondary)" }}>
                {user.email}
              </p>
              <span
                className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold"
                style={{ background: "var(--color-neutral)", color: "var(--color-ink-soft)" }}
              >
                Member sejak {user.tanggalBergabung}
              </span>
            </div>
          </div>

          {isEditing ? (
            /* Edit Form */
            <form onSubmit={handleSave}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "var(--color-ink)" }}>
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded border outline-none"
                    style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "var(--color-ink)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded border outline-none"
                    style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "var(--color-ink)" }}>
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 text-sm rounded border outline-none"
                    style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "var(--color-ink)" }}>
                    Alamat
                  </label>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Jl. ... No. ..., Kota"
                    className="w-full px-4 py-3 text-sm rounded border outline-none resize-none"
                    style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-6 border-t" style={{ borderColor: "var(--color-neutral)" }}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="px-6 py-2.5 text-sm font-semibold rounded text-white"
                  style={{ background: "var(--color-primary)" }}
                >
                  Simpan Perubahan
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleCancel}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="px-6 py-2.5 text-sm font-semibold rounded border"
                  style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
                >
                  Batal
                </motion.button>
              </div>
            </form>
          ) : (
            /* View Mode */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: "var(--color-secondary)" }}>
                  Nama Lengkap
                </label>
                <p className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                  {user.nama}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: "var(--color-secondary)" }}>
                  Email
                </label>
                <p className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                  {user.email}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: "var(--color-secondary)" }}>
                  No. Telepon
                </label>
                <p className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                  {user.telepon || "-"}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: "var(--color-secondary)" }}>
                  Alamat
                </label>
                <p className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                  {user.alamat || "-"}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-6 border-t" style={{ borderColor: "var(--color-neutral)" }}>
                <motion.button
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="px-6 py-2.5 text-sm font-semibold rounded border"
                  style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
                >
                  Edit Profil
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Menu Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 space-y-3"
        >
          <Link
            href="/riwayat-transaksi"
            className="flex items-center justify-between p-4 bg-white rounded-xl border hover:border-[var(--color-primary)] transition-colors"
            style={{ borderColor: "var(--color-neutral-dark)" }}
          >
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                Riwayat Transaksi
              </span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3 text-sm font-semibold rounded-lg border text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Keluar
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

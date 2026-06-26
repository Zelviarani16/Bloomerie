"use client";

/*
  app/checkout/konfirmasi/page.jsx
  Halaman sederhana yang tampil setelah submit checkout berhasil
  (dummy, belum ada order ID asli dari backend). Tidak ada di
  screenshot Figma yang dikirim, tapi dibutuhkan secara fungsional
  supaya alur checkout punya "akhir cerita" yang jelas, bukan
  menggantung begitu saja.
*/

import Link from "next/link";
import { motion } from "framer-motion";

export default function KonfirmasiPage() {
  return (
    <div className="container-bloomerie py-20 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ background: "var(--color-tertiary)" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--color-ink)" }}
      >
        Pesanan Berhasil Dibuat!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm mb-8 max-w-sm"
        style={{ color: "var(--color-ink-soft)" }}
      >
        Terima kasih telah berbelanja di Bloomerie. Kami akan segera
        memproses pesanan Anda dan mengirimkan konfirmasi melalui email.
      </motion.p>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-3">
        <Link href="/riwayat-transaksi">
          <button
            className="px-6 py-3 text-xs font-semibold tracking-wide uppercase rounded border"
            style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
          >
            Lihat Riwayat Transaksi
          </button>
        </Link>
        <Link href="/katalog">
          <button
            className="px-6 py-3 text-xs font-semibold tracking-wide uppercase rounded text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Lanjut Belanja
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
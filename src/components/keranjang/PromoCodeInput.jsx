"use client";

/*
  PromoCodeInput.jsx
  Box "Punya kode promo?" di bawah tabel keranjang sesuai Figma.
  Logic validasi kode promo masih dummy (belum ada backend) — kode
  "BLOOM10" dianggap valid sebagai contoh, sisanya invalid.
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PromoCodeInput() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle"); // idle | valid | invalid

  function handleApply() {
    if (code.trim().toUpperCase() === "BLOOM10") {
      setStatus("valid");
    } else {
      setStatus("invalid");
    }
  }

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-lg mt-2"
      style={{ background: "var(--color-neutral)" }}
    >
      <div className="flex items-center gap-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
          <circle cx="7" cy="7" r="1" fill="var(--color-primary)" />
        </svg>
        <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
          Punya kode promo? Gunakan sekarang untuk diskon tambahan.
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="KODEPROMO"
          className="px-4 py-2.5 text-sm rounded border outline-none uppercase"
          style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
        />
        <button
          onClick={handleApply}
          className="px-5 py-2.5 text-xs font-semibold uppercase rounded text-white whitespace-nowrap"
          style={{ background: "var(--color-primary)" }}
        >
          Pakai
        </button>
      </div>

      <AnimatePresence>
        {status === "valid" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs w-full"
            style={{ color: "var(--color-tertiary)" }}
          >
            ✓ Kode promo berhasil diterapkan!
          </motion.p>
        )}
        {status === "invalid" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs w-full"
            style={{ color: "var(--color-primary)" }}
          >
            Kode promo tidak valid atau sudah kedaluwarsa.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
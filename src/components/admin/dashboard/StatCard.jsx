"use client";

/*
  StatCard.jsx
  card putih, icon kecil di kotak pink lembut, persentase
  growth hijau di kanan atas (opsional), label uppercase kecil, angka
  besar bold, subtext kecil di bawah.
*/

import { motion } from "framer-motion";

export default function StatCard({ icon, label, value, subtext, growth, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white rounded-lg p-6 border"
      style={{ borderColor: "var(--color-neutral-dark)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded flex items-center justify-center"
          style={{ background: "#FEF2F4", color: "var(--color-primary)" }}
        >
          {icon}
        </div>
        {growth !== undefined && (
          <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--color-tertiary)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            +{growth}%
          </span>
        )}
      </div>

      <p className="text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: "var(--color-secondary)" }}>
        {label}
      </p>
      <p className="text-2xl font-bold mb-1" style={{ color: "var(--color-ink)" }}>
        {value}
      </p>
      <p className="text-xs" style={{ color: "var(--color-secondary)" }}>
        {subtext}
      </p>
    </motion.div>
  );
}

"use client";

/*
  ArtikelStats.jsx
  Stat cards untuk halaman Kelola Artikel
  - Total Artikel
  - Artikel Bulan Ini
*/

import { motion } from "framer-motion";

const StatCard = ({ icon, label, value, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white rounded-lg p-6 border"
      style={{ borderColor: "var(--color-neutral-dark)" }}
    >
      <div
        className="w-10 h-10 rounded flex items-center justify-center mb-4"
        style={{ background: "#FEF2F4", color: "var(--color-primary)" }}
      >
        {icon}
      </div>

      <p className="text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: "var(--color-secondary)" }}>
        {label}
      </p>
      <p className="text-2xl font-bold" style={{ color: "var(--color-ink)" }}>
        {value}
      </p>
    </motion.div>
  );
};

export default function ArtikelStats({ stats }) {
  const statItems = [
    {
      label: "Total Artikel",
      value: stats.totalArtikel,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      label: "Artikel Bulan Ini",
      value: stats.artikelBulanIni,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" style={{ maxWidth: "600px" }}>
      {statItems.map((item, index) => (
        <StatCard key={item.label} {...item} index={index} />
      ))}
    </div>
  );
}

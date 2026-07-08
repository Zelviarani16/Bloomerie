"use client";

/*
  ArsipStats.jsx
  Stat cards untuk halaman Arsip Artikel
  - Total Arsip
  - Bulan Ini
  - Penyimpanan
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

export default function ArsipStats({ stats }) {
  const statItems = [
    {
      label: "Total Arsip",
      value: `${stats.totalArsip} Artikel`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="21 8 21 21 3 21 3 8" />
          <rect x="1" y="3" width="22" height="5" />
          <line x1="10" y1="12" x2="14" y2="12" />
        </svg>
      ),
    },
    {
      label: "Bulan Ini",
      value: `${stats.arsipBulanIni} Artikel`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: "Penyimpanan",
      value: stats.penyimpananArsip,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {statItems.map((item, index) => (
        <StatCard key={item.label} {...item} index={index} />
      ))}
    </div>
  );
}

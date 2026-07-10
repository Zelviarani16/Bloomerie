"use client";

/*
  PelangganStats.jsx
  3 card statistik di atas tabel
  - Total Pengguna: 2,840
  - User Baru (Bulan Ini): +124
  - Pengguna Disuspend: 12
*/

import { motion } from "framer-motion";

const StatCard = ({ icon, label, value, index, valueColor }) => {
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
      <p className="text-2xl font-bold" style={{ color: valueColor || "var(--color-ink)" }}>
        {value}
      </p>
    </motion.div>
  );
};

export default function PelangganStats({ stats }) {
  const statItems = [
    {
      label: "Total Pengguna",
      value: stats.totalPengguna.toLocaleString("id-ID"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      label: "User Baru (Bulan Ini)",
      value: `+${stats.userBaruBulanIni}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      ),
    },
    {
      label: "Pengguna Disuspend",
      value: stats.penggunaDisuspend,
      valueColor: "var(--color-primary)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
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

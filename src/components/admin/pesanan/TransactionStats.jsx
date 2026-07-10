"use client";

/*
  TransactionStats.jsx
  Sama style dengan InventoryStats - 4 card simpel:
  - Total Produk → Total Pesanan
  - Stok Rendah → Pending (Butuh Aksi)
  - Kategori → Diproses
  - Produk Aktif → Dikirim
*/

import { motion } from "framer-motion";

export default function TransactionStats({ stats }) {
  const items = [
    { label: "Total Pesanan", value: stats?.totalPesanan?.toLocaleString("id-ID") || 0, color: "var(--color-ink)" },
    { label: "Pending", value: stats?.pending || 0, color: "var(--color-primary)" },
    { label: "Diproses", value: stats?.diproses || 0, color: "var(--color-ink)" },
    { label: "Dikirim", value: stats?.dikirim || 0, color: "var(--color-tertiary)" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
          className="bg-white rounded-lg p-6 border"
          style={{ borderColor: "var(--color-neutral-dark)" }}
        >
          <p className="text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "var(--color-secondary)" }}>
            {item.label}
          </p>
          <p className="text-2xl font-bold" style={{ color: item.color }}>
            {item.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

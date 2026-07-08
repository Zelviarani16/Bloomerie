"use client";

/*
  InventoryStats.jsx
  Sesuai Figma: 4 card simpel tanpa icon (beda dari StatCard di
  dashboard yang ada icon+growth%), cuma label kecil uppercase +
  angka besar. Angka "Stok Rendah" diberi warna merah karena itu
  butuh perhatian admin.
*/

import { motion } from "framer-motion";

export default function InventoryStats({ stats }) {
  const items = [
    { label: "Total Produk", value: stats.totalProduk, color: "var(--color-ink)" },
    { label: "Stok Rendah", value: stats.stokRendah, color: "var(--color-primary)" },
    { label: "Kategori", value: stats.kategori, color: "var(--color-ink)" },
    { label: "Produk Aktif", value: stats.produkAKTIF, color: "var(--color-tertiary)" },
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

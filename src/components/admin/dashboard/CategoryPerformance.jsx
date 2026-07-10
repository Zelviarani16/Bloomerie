"use client";

/*
  CategoryPerformance.jsx
  card kanan dashboard, list kategori dengan progress
  bar tipis di bawah tiap nama, persentase di kanan, link "Lihat
  Detail Kategori" di bawah list.
*/

import { motion } from "framer-motion";
import Link from "next/link";

export default function CategoryPerformance({ categories }) {
  return (
    <div className="bg-white rounded-lg p-6 border" style={{ borderColor: "var(--color-neutral-dark)" }}>
      <h2 className="text-lg font-bold mb-6" style={{ color: "var(--color-ink)" }}>
        Performa Kategori
      </h2>

      <div className="flex flex-col gap-5 mb-5">
        {categories.map((cat, index) => (
          <div key={cat.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>
                {cat.name}
              </span>
              <span className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
                {cat.percentage}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-neutral-dark)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${cat.percentage}%` }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full"
                style={{ background: "var(--color-primary)" }}
              />
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/admin/laporan"
        className="text-sm font-semibold flex items-center gap-1.5"
        style={{ color: "var(--color-primary)" }}
      >
        Lihat Detail Kategori
        <span>→</span>
      </Link>
    </div>
  );
}

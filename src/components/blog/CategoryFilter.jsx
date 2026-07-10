"use client";

/*
  CategoryFilter.jsx
  Tombol filter kategori artikel
  - Semua Artikel, Tips Perawatan, Inspirasi Buket, Gaya Hidup, Event & Pernikahan
  - Tombol aktif ganti warna background
*/

import { motion } from "framer-motion";

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <motion.button
            key={category}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategoryChange(category)}
            className="px-5 py-2.5 rounded-full text-sm font-medium transition-colors border"
            style={{
              background: isActive ? "var(--color-primary)" : "white",
              color: isActive ? "white" : "var(--color-ink)",
              borderColor: isActive ? "var(--color-primary)" : "var(--color-neutral-dark)",
            }}
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
}

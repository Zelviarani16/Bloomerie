"use client";

/*
  FeaturedSection.jsx
  Sorotan utama / featured article sesuai Figma
  - Gambar besar di kiri
  - Label "SOROTAN UTAMA" / "FEATURED"
  - Judul besar + excerpt + tanggal + tombol "BACA SELENGKAPNYA"
*/

import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturedSection({ article }) {
  if (!article) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden mb-16"
      style={{ background: "var(--color-neutral)" }}
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay di mobile */}
          <div className="absolute inset-0 md:hidden bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content - rata atas, padding lebih ringkas */}
        <div className="p-6 md:p-8 flex flex-col justify-start">
          {/* Badge */}
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 w-fit"
            style={{ background: "var(--color-primary)", color: "white" }}
          >
            Sorotan Utama
          </span>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-bold mb-3 leading-tight" style={{ color: "var(--color-ink)" }}>
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm mb-3 leading-relaxed" style={{ color: "var(--color-secondary)" }}>
            {article.excerpt}
          </p>

          {/* Date */}
          <p className="text-xs font-medium mb-4" style={{ color: "var(--color-secondary)" }}>
            {article.date}
          </p>

          {/* Button */}
          <a href="https://homely-lifecycle-872486.framer.app/" target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-colors"
              style={{ background: "var(--color-primary)" }}
            >
              Baca Selengkapnya
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.button>
          </a>
        </div>
      </div>
    </motion.section>
  );
}

"use client";

/*
  ArticleCard.jsx
  Reusable card artikel — dipakai di BlogPreview (Beranda) dan nanti
  juga di halaman Blog (/blog) supaya konsisten.

 foto di atas (rounded), kategori kecil warna
  primary uppercase, judul bold, excerpt 2 baris, tanggal di bawah.
*/

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ArticleCard({ article, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/blog/${article.slug}`} className="group block">
        {/* Foto artikel */}
        <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden mb-4 bg-neutral-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Kategori */}
        <p
          className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-2"
          style={{ color: "var(--color-primary)" }}
        >
          {article.category}
        </p>

        {/* Judul */}
        <h3
          className="text-base font-bold leading-snug mb-2 transition-colors group-hover:opacity-70"
          style={{ color: "var(--color-ink)" }}
        >
          {article.title}
        </h3>

        {/* Excerpt — dibatasi 2 baris pakai line-clamp */}
        <p
          className="text-sm leading-relaxed mb-3 line-clamp-2"
          style={{ color: "var(--color-ink-soft)" }}
        >
          {article.excerpt}
        </p>

        {/* Tanggal */}
        <p className="text-xs" style={{ color: "var(--color-secondary)" }}>
          {article.date}
        </p>
      </Link>
    </motion.div>
  );
}
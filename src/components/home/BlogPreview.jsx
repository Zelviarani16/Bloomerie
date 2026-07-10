"use client";

/*
  BlogPreview.jsx
  Section "Blog & Inspirasi" di Beranda.
  background sedikit beda dari putih (neutral),
  heading + subtext di tengah (center, beda dari FeaturedProducts yang
  rata kiri), grid 3 kolom card artikel di bawahnya.
*/

import { motion } from "framer-motion";
import Link from "next/link";
import { articles } from "@/data/articles";

// Article card untuk preview di homepage
const ArticlePreviewCard = ({ article, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden border"
      style={{ borderColor: "var(--color-neutral-dark)" }}
    >
      <div className="relative h-[180px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
        />
        <span
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.95)", color: "var(--color-primary)" }}
        >
          {article.category}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs mb-1" style={{ color: "var(--color-secondary)" }}>
          {article.date}
        </p>
        <h3 className="text-sm font-bold mb-2 line-clamp-2 leading-snug" style={{ color: "var(--color-ink)" }}>
          {article.title}
        </h3>
        <p className="text-xs line-clamp-2 leading-relaxed mb-3" style={{ color: "var(--color-secondary)" }}>
          {article.excerpt}
        </p>
        <Link
          href={`/blog/${article.slug}`}
          className="text-xs font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          Baca Selengkapnya →
        </Link>
      </div>
    </motion.article>
  );
};

export default function BlogPreview() {
  // Ambil 3 artikel pertama (bukan featured)
  const previewArticles = articles.filter((a) => !a.featured).slice(0, 3);

  return (
    <section className="py-16 lg:py-20" style={{ background: "var(--color-neutral)" }}>
      <div className="container-bloomerie">

        {/* Header — rata tengah, beda dari FeaturedProducts yang rata kiri */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: "var(--color-ink)" }}>
            Blog &amp; Inspirasi
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "var(--color-ink-soft)" }}>
            Tips merawat bunga dan filosofi di balik setiap rangkaian.
          </p>
        </motion.div>

        {/* Grid artikel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {previewArticles.map((article, index) => (
            <ArticlePreviewCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
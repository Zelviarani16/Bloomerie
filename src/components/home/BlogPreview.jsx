"use client";

/*
  BlogPreview.jsx
  Section "Blog & Inspirasi" di Beranda.
  Sesuai design Figma: background sedikit beda dari putih (neutral),
  heading + subtext di tengah (center, beda dari FeaturedProducts yang
  rata kiri), grid 3 kolom card artikel di bawahnya.
*/

import { motion } from "framer-motion";
import ArticleCard from "@/components/ui/ArticleCard";
import { articles } from "@/data/articles";

export default function BlogPreview() {
  const featuredArticles = articles.filter((a) => a.featured);

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
          {featuredArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

/*
  BlogClient.jsx
  Komponen utama halaman Blog
  - Featured section (sorotan utama)
  - Category filter buttons
  - Article grid
*/

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import FeaturedSection from "./FeaturedSection";
import CategoryFilter from "./CategoryFilter";
import ArticleGrid from "./ArticleGrid";
import { CATEGORIES, getFeaturedArticle, getArticlesByCategory } from "@/data/articles";

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  // Get featured article
  const featuredArticle = getFeaturedArticle();

  // Filter articles by category
  const filteredArticles = useMemo(() => {
    return getArticlesByCategory(activeCategory);
  }, [activeCategory]);

  return (
    <div className="py-12">
      <div className="container-bloomerie">
        {/* Page Header - align kiri, sama kayak Katalog */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl lg:text-3xl font-bold mb-1.5" style={{ color: "var(--color-ink)" }}>
            Blog
          </h1>
          <p className="text-sm" style={{ color: "var(--color-secondary)" }}>
            Temukan inspirasi, tips, dan cerita menarik seputar dunia floral
          </p>
        </motion.div>

        {/* Featured Section */}
        <FeaturedSection article={featuredArticle} />

        {/* Category Filter */}
        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Article Grid */}
        <ArticleGrid articles={filteredArticles} />
      </div>
    </div>
  );
}
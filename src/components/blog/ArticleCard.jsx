"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ArticleCard({ article, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-white rounded-xl overflow-hidden border transition-all hover:shadow-lg"
      style={{ borderColor: "var(--color-neutral-dark)" }}
    >
      <a href="https://homely-lifecycle-872486.framer.app/" target="_blank" rel="noopener noreferrer" className="block relative h-[200px] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.95)", color: "var(--color-primary)" }}
        >
          {article.category}
        </span>
      </a>

      <div className="p-5">
        <p className="text-xs font-medium mb-2" style={{ color: "var(--color-secondary)" }}>
          {article.date}
        </p>

        <a href="https://homely-lifecycle-872486.framer.app/" target="_blank" rel="noopener noreferrer">
          <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors" style={{ color: "var(--color-ink)" }}>
            {article.title}
          </h3>
        </a>

        <p className="text-sm mb-4 line-clamp-3 leading-relaxed" style={{ color: "var(--color-secondary)" }}>
          {article.excerpt}
        </p>

        <a
          href="https://homely-lifecycle-872486.framer.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:gap-2.5"
          style={{ color: "var(--color-primary)" }}
        >
          Baca Selengkapnya
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}
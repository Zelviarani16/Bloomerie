"use client";

/*
  ArticleGrid.jsx
  Grid container untuk article cards
*/

import ArticleCard from "./ArticleCard";

export default function ArticleGrid({ articles }) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          className="mx-auto mb-4"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-neutral-dark)"
          strokeWidth="1.5"
        >
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <p className="text-sm" style={{ color: "var(--color-secondary)" }}>
          Belum ada artikel dalam kategori ini.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </div>
  );
}

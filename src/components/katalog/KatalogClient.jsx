"use client";

/*
  KatalogClient.jsx
  Komponen utama halaman Katalog — ini "otak"-nya, mengelola semua
  state (filter kategori, harga maks, rating min, sort, halaman aktif)
  di satu tempat, lalu meneruskan ke FilterSidebar dan ProductCard
  lewat props.

  Kenapa dipisah dari page.jsx (lihat app/katalog/page.jsx)?
  Karena page.jsx di Next.js App Router defaultnya Server Component,
  sedangkan kita butuh useState/interaktivitas di sini — jadi logic
  yang butuh "use client" dipisah ke file ini.
*/

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "@/components/katalog/FilterSidebar";
import Pagination from "@/components/katalog/Pagination";
import { products } from "@/data/products";

const ITEMS_PER_PAGE = 4;

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Harga: Rendah ke Tinggi" },
  { value: "price-desc", label: "Harga: Tinggi ke Rendah" },
  { value: "rating", label: "Rating Tertinggi" },
];

export default function KatalogClient() {
  // ── State filter (draft, belum di-apply) ──
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [minRating, setMinRating] = useState(0);

  // ── State filter yang SUDAH di-apply (yang benar-benar dipakai untuk filter produk) ──
  // Dipisah dari state draft di atas supaya perubahan slider/checkbox tidak langsung
  // mem-filter produk — user harus klik "Apply Filters" dulu, sesuai tombol di Figma.
  const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
    maxPrice: 500000,
    minRating: 0,
  });

  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);

  function toggleCategory(category) {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  }

  function handleApplyFilters() {
    setAppliedFilters({
      categories: selectedCategories,
      maxPrice,
      minRating,
    });
    setCurrentPage(1); // reset ke halaman 1 setiap kali filter berubah
  }

  // ── Filter + sort produk berdasarkan appliedFilters ──
  // useMemo supaya tidak dihitung ulang di setiap render, hanya saat
  // dependency (appliedFilters, sortBy) berubah.
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (appliedFilters.categories.length > 0 && !appliedFilters.categories.includes(p.category)) {
        return false;
      }
      if (p.price > appliedFilters.maxPrice) return false;
      if (appliedFilters.minRating > 0 && p.rating < appliedFilters.minRating) return false;
      return true;
    });

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [appliedFilters, sortBy]);

  // ── Pagination ──
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container-bloomerie py-10 lg:py-12">
      {/* ── Heading ── */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-1.5" style={{ color: "var(--color-ink)" }}>
          Katalog Kami
        </h1>
        <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
          Menampilkan {filteredProducts.length} hasil
          {appliedFilters.categories.length > 0 && (
            <> untuk &ldquo;{appliedFilters.categories.join(", ")}&rdquo;</>
          )}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ── Sidebar filter ── */}
        <FilterSidebar
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
          maxPrice={maxPrice}
          onChangeMaxPrice={setMaxPrice}
          minRating={minRating}
          onChangeMinRating={setMinRating}
          onApply={handleApplyFilters}
        />

        {/* ── Konten utama ── */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-end mb-6">
            <label className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--color-secondary)" }}>
                Urutkan
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm px-3 py-2 rounded border outline-none"
                style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Grid produk */}
          <AnimatePresence mode="wait">
            {paginatedProducts.length > 0 ? (
              <motion.div
                key={currentPage + sortBy}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10"
              >
                {paginatedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} variant="catalog" />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
                  Tidak ada produk yang cocok dengan filter ini.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}
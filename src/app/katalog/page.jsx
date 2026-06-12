"use client";

/*
  Halaman Katalog (/katalog)
  Struktur:
  - Navbar (shared dari components)
  - Sidebar filter: kategori checkbox, price range slider, rating
  - Product grid: 2 kolom, tiap card hover → reveal tombol
  - Pagination
  - Footer
  
  Interaktif:
  - Filter langsung menyaring produk (state di React, tidak perlu backend)
  - Price slider live update
  - Card hover: image scale + tombol "Lihat Detail" muncul
  - Framer Motion: masuk stagger per card
*/

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image"

// ── Data produk (nanti ganti dengan fetch dari API/CMS) ──
const ALL_PRODUCTS = [
  { id: 1, name: "Blush Romance",     desc: "Premium Pink Roses & Lilies",    price: 280000, rating: 4.9, reviews: 120, category: "bouquets",  tag: null,      color: "#F0E6DF" },
  { id: 2, name: "Midnight Serenade", desc: "Deep Red Roses & Lisianthus",    price: 420000, rating: 4.8, reviews: 154, category: "bouquets",  tag: null,      color: "#2A1A1A" },
  { id: 3, name: "Sunny Whisper",     desc: "Sunflowers & Daisies",           price: 185000, rating: 4.7, reviews: 92,  category: "gifts",     tag: null,      color: "#F5E8C0" },
  { id: 4, name: "Pastel Dream",      desc: "Peonies & Hydrangeas",           price: 320000, rating: 5.0, reviews: 42,  category: "occasions", tag: "Baru",    color: "#EDE0EC" },
  { id: 5, name: "Ethereal Clouds",   desc: "Dried Pampas & Cotton",          price: 310000, rating: 4.6, reviews: 67,  category: "gifts",     tag: null,      color: "#EDE8DE" },
  { id: 6, name: "Velvet Crimson",    desc: "Dark Red Roses Exclusive",       price: 450000, rating: 4.9, reviews: 88,  category: "bouquets",  tag: "Terlaris",color: "#3D1A1A" },
  { id: 7, name: "Garden Party",      desc: "Mixed Seasonal Wildflowers",     price: 220000, rating: 4.5, reviews: 55,  category: "occasions", tag: null,      color: "#D8E8D0" },
  { id: 8, name: "Morning Dew",       desc: "White Roses & Eucalyptus",       price: 260000, rating: 4.8, reviews: 110, category: "bouquets",  tag: null,      color: "#E8EDE8" },
];

const CATEGORIES = [
  { value: "all",       label: "Semua Produk" },
  { value: "bouquets",  label: "Signature Bouquets" },
  { value: "gifts",     label: "Gifts & Hampers" },
  { value: "occasions", label: "Occasion Specials" },
];

// ── Komponen: satu kartu produk ──
function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      // Animasi masuk: tiap card delay berdasarkan index (stagger)
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      exit={{ opacity: 0, y: 12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer"
    >
      {/* ── Gambar area ── */}
      <div
        className="relative overflow-hidden mb-4"
        style={{ background: product.color, aspectRatio: "4/5" }}
      >
        {/* Tag (Baru / Terlaris) */}
        {product.tag && (
          <span
            className="absolute top-3 left-3 z-10 text-[10px] tracking-widest uppercase px-2.5 py-1"
            style={{
              background: "var(--crimson)",
              color: "white",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            {product.tag}
          </span>
        )}

        {/* Placeholder foto — ganti dengan <Image src="..." fill className="object-cover" /> */}

                    <Image
                        src="/images/katalog.jpg"
                        alt="Heading Navbar"
                        fill
                        className="object-cover"
                      />          
                      
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,5,8,0.7) 0%, transparent 60%)" }}>

                      </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg viewBox="0 0 80 100" className="w-1/2" fill="none">
            {[0,60,120,180,240,300].map((a,i) => (
              <ellipse key={i} cx="40" cy="22" rx="12" ry="20" fill="currentColor"
                style={{ color: "var(--crimson)" }}
                transform={`rotate(${a} 40 50)`} opacity={0.7}
              />
            ))}
            <circle cx="40" cy="50" r="10" fill="white" opacity="0.5"/>
          </svg>
        </div>

        {/* Hover overlay: tombol lihat detail muncul dari bawah */}
        <motion.div
          animate={{ y: hovered ? 0 : 48, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 p-4"
        >
          <Link href={`/katalog/${product.id}`}>
            <button
              className="w-full py-2.5 text-[11px] tracking-[0.12em] uppercase"
              style={{
                background: "white",
                color: "var(--ink)",
                fontFamily: "'DM Sans', sans-serif",
                border: "none",
              }}
            >
              Lihat Detail
            </button>
          </Link>
        </motion.div>
      </div>

      {/* ── Info produk ── */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              className="text-base font-medium"
              style={{ fontFamily: "'Fraunces', serif", fontVariationSettings: "'opsz' 40", color: "var(--ink)" }}
            >
              {product.name}
            </h3>
            <p className="text-[12px] mt-0.5" style={{ color: "var(--stone)", fontFamily: "'DM Sans', sans-serif" }}>
              {product.desc}
            </p>
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--crimson)">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
            <span className="text-[12px]" style={{ color: "var(--stone)", fontFamily: "'DM Sans', sans-serif" }}>
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
        <p
          className="text-[15px] font-medium mt-2"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--ink)" }}
        >
          Rp {product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </motion.div>
  );
}

// ── Halaman utama Katalog ──
export default function KatalogPage() {
  // State filter
  const [activeCategory, setActiveCategory] = useState("all");
  const [maxPrice, setMaxPrice]             = useState(500000);
  const [minRating, setMinRating]           = useState(0);
  const [sortBy, setSortBy]                 = useState("recommended");

  // Filter + sort produk berdasarkan state (useMemo: hanya recalculate kalau dependency berubah)
  const filtered = useMemo(() => {
    let result = ALL_PRODUCTS.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      return true;
    });

    if (sortBy === "price-asc")  result = [...result].sort((a,b) => a.price - b.price);
    if (sortBy === "price-desc") result = [...result].sort((a,b) => b.price - a.price);
    if (sortBy === "rating")     result = [...result].sort((a,b) => b.rating - a.rating);

    return result;
  }, [activeCategory, maxPrice, minRating, sortBy]);

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24">

        {/* ── Page title ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: "var(--crimson)", fontFamily: "'DM Sans', sans-serif" }}>
            ✦ Koleksi Kami
          </p>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontVariationSettings: "'opsz' 72", fontSize: "clamp(2rem,5vw,3.2rem)", color: "var(--ink)", fontWeight: 400, letterSpacing: "-0.03em" }}>
            Our{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "var(--crimson)" }}>
              Flowers
            </em>
          </h1>
        </motion.div>

        <div className="flex gap-12">

          {/* ── Sidebar Filter ── */}
          <aside className="hidden md:block w-52 flex-shrink-0">
            <h2 className="text-[13px] font-medium mb-6" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--ink)" }}>
              Filters
            </h2>

            {/* Kategori */}
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.12em] uppercase mb-3" style={{ color: "var(--stone-light)", fontFamily: "'DM Sans', sans-serif" }}>
                Kategori
              </p>
              {CATEGORIES.map((cat) => (
                <label key={cat.value} className="flex items-center gap-2.5 mb-2.5 cursor-pointer group">
                  {/* Custom checkbox */}
                  <div
                    onClick={() => setActiveCategory(cat.value)}
                    className="w-4 h-4 border flex items-center justify-center transition-colors"
                    style={{
                      borderColor: activeCategory === cat.value ? "var(--crimson)" : "var(--border)",
                      background: activeCategory === cat.value ? "var(--crimson)" : "transparent",
                    }}
                  >
                    {activeCategory === cat.value && (
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="white">
                        <polyline points="2,6 5,9 10,3" strokeWidth="2" stroke="white" fill="none"/>
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-[13px] transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: activeCategory === cat.value ? "var(--ink)" : "var(--stone)",
                    }}
                    onClick={() => setActiveCategory(cat.value)}
                  >
                    {cat.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Price range */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <p className="text-[10px] tracking-[0.12em] uppercase" style={{ color: "var(--stone-light)", fontFamily: "'DM Sans', sans-serif" }}>
                  Harga Maks
                </p>
                <p className="text-[12px]" style={{ color: "var(--ink)", fontFamily: "'DM Sans', sans-serif" }}>
                  Rp {(maxPrice/1000).toFixed(0)}rb
                </p>
              </div>
              {/* Slider native — styling via CSS variables */}
              <input
                type="range"
                min={100000}
                max={600000}
                step={10000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "var(--crimson)" }}
              />
              <div className="flex justify-between mt-1">
                <span className="text-[10px]" style={{ color: "var(--stone-light)" }}>100rb</span>
                <span className="text-[10px]" style={{ color: "var(--stone-light)" }}>600rb</span>
              </div>
            </div>

            {/* Rating filter */}
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.12em] uppercase mb-3" style={{ color: "var(--stone-light)", fontFamily: "'DM Sans', sans-serif" }}>
                Rating Min
              </p>
              {[4.5, 4.0].map((r) => (
                <label key={r} className="flex items-center gap-2.5 mb-2.5 cursor-pointer">
                  <div
                    onClick={() => setMinRating(minRating === r ? 0 : r)}
                    className="w-4 h-4 border flex items-center justify-center transition-colors"
                    style={{
                      borderColor: minRating === r ? "var(--crimson)" : "var(--border)",
                      background: minRating === r ? "var(--crimson)" : "transparent",
                    }}
                  >
                    {minRating === r && (
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="white">
                        <polyline points="2,6 5,9 10,3" strokeWidth="2" stroke="white" fill="none"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({length: 5}).map((_,i) => (
                      <svg key={i} width="11" height="11" viewBox="0 0 24 24"
                        fill={i < Math.floor(r) ? "var(--crimson)" : "none"}
                        stroke="var(--crimson)" strokeWidth="1.5"
                      >
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                      </svg>
                    ))}
                  </div>
                </label>
              ))}
            </div>

            <button
              className="w-full py-2.5 text-[11px] tracking-[0.12em] uppercase"
              onClick={() => { setActiveCategory("all"); setMaxPrice(500000); setMinRating(0); }}
              style={{
                background: "var(--crimson)",
                color: "white",
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
              }}
            >
              Reset Filter
            </button>
          </aside>

          {/* ── Main: Sort bar + Product grid ── */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-8 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <p className="text-[13px]" style={{ color: "var(--stone)", fontFamily: "'DM Sans', sans-serif" }}>
                Menampilkan <strong style={{ color: "var(--ink)" }}>{filtered.length}</strong> produk
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] tracking-widest uppercase" style={{ color: "var(--stone-light)", fontFamily: "'DM Sans', sans-serif" }}>
                  Sort by
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-[13px] px-3 py-1.5 border"
                  style={{
                    borderColor: "var(--border)",
                    background: "white",
                    color: "var(--ink)",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                  }}
                >
                  <option value="recommended">Direkomendasikan</option>
                  <option value="price-asc">Harga: Terendah</option>
                  <option value="price-desc">Harga: Tertinggi</option>
                  <option value="rating">Rating Terbaik</option>
                </select>
              </div>
            </div>

            {/* Product grid — AnimatePresence biar animasi keluar saat filter berubah */}
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                <motion.div className="grid grid-cols-2 gap-x-6 gap-y-10">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24"
                >
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "1.5rem", color: "var(--stone)" }}>
                    Tidak ada produk yang cocok
                  </p>
                  <button
                    onClick={() => { setActiveCategory("all"); setMaxPrice(500000); setMinRating(0); }}
                    className="mt-4 text-[12px] underline"
                    style={{ color: "var(--crimson)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Reset filter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                {["‹", "1", "2", "3", "›"].map((p, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 text-[13px] border transition-colors"
                    style={{
                      borderColor: p === "1" ? "var(--crimson)" : "var(--border)",
                      background: p === "1" ? "var(--crimson)" : "transparent",
                      color: p === "1" ? "white" : "var(--ink)",
                      fontFamily: "'DM Sans', sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
"use client";

/*
  Halaman Blog / The Journal (/blog)
  Struktur:
  - Hero kecil dengan judul editorial
  - Featured article (besar, full-width)
  - Grid artikel biasa (3 kolom)
  - Tag filter (klik tag → filter artikel)
  
  Interaktif:
  - Tag filter dengan animasi
  - Card hover: gambar scale naik pelan
  - Stagger masuk per card
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image"

const ARTICLES = [
  {
    id: 1,
    title: "The Art of Mindful Floristry: Curating Your Sanctuary",
    excerpt: "Membawa ketenangan alam ke ruang hidup Anda melalui seni merangkai bunga yang penuh kesadaran.",
    author: "Elena Rosewood",
    date: "10 Mei 2026",
    readTime: "12 menit",
    tag: "Floral Artistry",
    featured: true,
    bgColor: "#D8C8BC",
    image: "/images/cerita.jpg",
  },
  {
    id: 2,
    title: "Minimalism untuk Pemula: Sederhanakan Hidup Anda",
    excerpt: "Pelajari cara mengurangi kebisingan dan fokus pada esensi terbaik dari setiap ruangan.",
    author: "Rika Santoso",
    date: "21 April 2026",
    readTime: "8 menit",
    tag: "Simplicity",
    featured: false,
    bgColor: "#E8E0D0",
    image: "/images/artikel1.jpg",
  },
  {
    id: 3,
    title: "Tren Bunga Terpopuler untuk Musim 2025",
    excerpt: "Dari rangkaian sculptural hingga wildflower liar — ini yang akan mendominasi tahun depan.",
    author: "Dini Pratiwi",
    date: "17 Februari 2026",
    readTime: "6 menit",
    tag: "Insights",
    featured: false,
    bgColor: "#D0D8C8",
    image: "/images/artikel2.jpg",
  },
  {
    id: 4,
    title: "Digital Detox: Merebut Kembali Perhatian Anda",
    excerpt: "Bagaimana keterlibatan dengan alam bisa menjadi antidot paling sederhana dari kelelahan digital.",
    author: "Fajar Nugroho",
    date: "26 Mei 2026",
    readTime: "10 menit",
    tag: "Lifestyle",
    featured: false,
    bgColor: "#DCD0E8",
    image: "/images/artikel3.jpg",
  },
  {
    id: 5,
    title: "Tips Merawat Buket Agar Tahan Lama",
    excerpt: "Rahasia dari florist profesional untuk menjaga kesegaran bunga potong di rumah selama mungkin.",
    author: "Sari Wulandari",
    date: "21 Maret 2026",
    readTime: "5 menit",
    tag: "Tips & Perawatan",
    featured: false,
    bgColor: "#E8D8C8",
    image: "/images/artikel4.jpg",
  },
  {
    id: 6,
    title: "Memilih Buket untuk Setiap Momen",
    excerpt: "Panduan lengkap memilih rangkaian yang tepat — dari ulang tahun, pernikahan, hingga duka cita.",
    author: "Elena Rosewood",
    date: "18 April 2026",
    readTime: "7 menit",
    tag: "Panduan",
    featured: false,
    bgColor: "#C8D8E8",
    image: "/images/artikel5.jpg",
  },
];

const TAGS = ["Semua", "Floral Artistry", "Simplicity", "Insights", "Lifestyle", "Tips & Perawatan", "Panduan"];

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("Semua");

  const featured = ARTICLES.find((a) => a.featured);
  const filtered = ARTICLES
    .filter((a) => !a.featured)
    .filter((a) => activeTag === "Semua" || a.tag === activeTag);

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24">

        {/* ── Header section ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: "var(--crimson)", fontFamily: "'DM Sans', sans-serif" }}>
              ✦ The Journal
            </p>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontVariationSettings: "'opsz' 72", fontSize: "clamp(2rem,5vw,3.2rem)", color: "var(--ink)", fontWeight: 400, letterSpacing: "-0.03em" }}>
              Cerita &{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "var(--crimson)" }}>
                Inspirasi
              </em>
            </h1>
          </div>
          <p className="hidden md:block text-[13px]" style={{ color: "var(--stone)", fontFamily: "'DM Sans', sans-serif" }}>
            Pengetahuan & panduan dari dunia bunga
          </p>
        </motion.div>

        {/* ── Featured article ── */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <Link href={`/blog/${featured.id}`} className="group block">
              <div className="grid md:grid-cols-2 border" style={{ borderColor: "var(--border)" }}>
                {/* Gambar featured (tall) */}
                <div
                  className="relative overflow-hidden"
                  style={{ background: featured.bgColor, minHeight: "360px" }}
                >
                  {/* Swap dengan <Image> asli */}
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex items-center justify-center opacity-90"
                  >
<Image
    src={featured.image}
    alt={featured.title}
    fill
    className="object-cover"
/>




                  </motion.div>

                  {/* Tag label di atas gambar */}
                  <div className="absolute bottom-6 left-6">
                    <span
                      className="px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase rounded-full"
                      style={{ background: "white", color: "var(--crimson)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {featured.tag}
                    </span>
                  </div>
                </div>

                {/* Teks featured */}
                <div className="p-8 md:p-12 flex flex-col justify-center" style={{ background: "white" }}>
                  <p className="text-[11px] tracking-[0.12em] uppercase mb-4" style={{ color: "var(--stone-light)", fontFamily: "'DM Sans', sans-serif" }}>
                    Artikel Pilihan
                  </p>
                  <h2
                    className="mb-4 group-hover:text-[var(--crimson)] transition-colors"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontVariationSettings: "'opsz' 72",
                      fontSize: "clamp(1.4rem,3vw,2rem)",
                      color: "var(--ink)",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-[13px] leading-relaxed mb-6" style={{ color: "var(--stone)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[12px]" style={{ color: "var(--stone-light)", fontFamily: "'DM Sans', sans-serif" }}>
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.readTime} baca</span>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[12px]" style={{ color: "var(--crimson)", fontFamily: "'DM Sans', sans-serif" }}>
                    Baca Selengkapnya
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >→</motion.span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* ── Tag filter ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TAGS.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setActiveTag(tag)}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-1.5 text-[11px] tracking-[0.06em] border transition-all"
              style={{
                borderColor: activeTag === tag ? "var(--crimson)" : "var(--border)",
                background: activeTag === tag ? "var(--crimson)" : "transparent",
                color: activeTag === tag ? "white" : "var(--stone)",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
              }}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* ── Article grid ── */}
        <AnimatePresence mode="popLayout">
          <motion.div className="grid md:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link href={`/blog/${article.id}`} className="group block">
                  {/* Gambar card */}
                  <div
                    className="relative overflow-hidden mb-4"
                    style={{ background: article.bgColor, aspectRatio: "4/3" }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full flex items-center justify-center"
                    >
     <Image
      src={article.image}
      alt={article.title}
      fill
      className="object-cover"
    />
                    </motion.div>
                  </div>

                  {/* Info */}
                  <p className="text-[10px] tracking-[0.12em] uppercase mb-2" style={{ color: "var(--crimson)", fontFamily: "'DM Sans', sans-serif" }}>
                    {article.tag}
                  </p>
                  <h3
                    className="mb-2 group-hover:text-[var(--crimson)] transition-colors"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontVariationSettings: "'opsz' 40",
                      fontSize: "1.05rem",
                      color: "var(--ink)",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.3,
                    }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--stone)", fontFamily: "'DM Sans', sans-serif" }}>
                    {article.excerpt}
                  </p>
                  <p className="text-[11px]" style={{ color: "var(--stone-light)", fontFamily: "'DM Sans', sans-serif" }}>
                    {article.date} · {article.readTime} baca
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
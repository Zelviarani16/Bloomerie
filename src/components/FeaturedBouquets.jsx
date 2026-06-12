"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Eternal Red Rose",
    category: "Bouquet Premium",
    price: "250.000",
    tag: "Terlaris",
    image: "/images/eternal-rose.jpg",
    gradient: "linear-gradient(160deg, #5a0f1b 0%, #8B1A2B 100%)",
  },
  {
    id: 2,
    name: "Pastel Dream",
    category: "Bouquet Kasual",
    price: "185.000",
    tag: "Baru",
    image: "/images/pastel-dream.jpg",
    gradient: "linear-gradient(160deg, #2d0a18 0%, #6b1535 100%)",
  },
  {
    id: 3,
    name: "White Elegance",
    category: "Bouquet Wedding",
    price: "320.000",
    tag: "Eksklusif",
    image: "/images/white-elegance.jpg",
    gradient: "linear-gradient(160deg, #1a0a0e 0%, #3d1220 100%)",
  },
  {
    id: 4,
    name: "Sunrise Gerbera",
    category: "Bunga Potong",
    price: "145.000",
    tag: "Baru",
    image: "/images/sunrise-gerbera.jpg",
    gradient: "linear-gradient(160deg, #3d1708 0%, #7a2b10 100%)",
  },
];

function ProductCard({ product, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        animate={{
          rotateY: hovered ? mousePos.x * 0.5 : 0,
          rotateX: hovered ? -mousePos.y * 0.5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative group cursor-none"
      >
        {/* Card */}
        <div
          className="relative overflow-hidden rounded-sm"
          style={{ background: product.gradient, aspectRatio: "3/4" }}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 120" className="w-2/3 opacity-20" fill="none">
              <ellipse cx="50" cy="30" rx="18" ry="28" fill="rgba(253,246,240,0.6)" />
              <ellipse cx="30" cy="45" rx="14" ry="22" fill="rgba(196,50,74,0.5)" transform="rotate(-30 30 45)" />
              <ellipse cx="70" cy="45" rx="14" ry="22" fill="rgba(196,50,74,0.5)" transform="rotate(30 70 45)" />
              <rect x="47" y="55" width="6" height="50" rx="3" fill="rgba(80,160,80,0.4)" />
            </svg>
          </div>
          )}

          {/* Hover overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 45%, rgba(15,5,8,0.98) 100%)",

            }}
          />

          {/* Tag */}
          {product.tag && (
            <div
              className="absolute top-4 left-4 px-3 py-1 text-[9px] tracking-[0.3em] uppercase font-body border border-[var(--crimson-light)] text-[var(--crimson-light)]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", background: "rgba(15,5,8,0.6)" }}
            >
              {product.tag}
            </div>
          )}

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <motion.div
              animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <p
                className="text-[9px] tracking-[0.3em] uppercase text-[var(--rose)] font-body mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {product.category}
              </p>
              <h3
                className="font-display text-xl text-[var(--cream)] mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {product.name}
              </h3>
              <p
                className="font-display text-lg text-[var(--crimson-light)]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Rp {product.price}
              </p>
            </motion.div>

            {/* Add to cart - appears on hover */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-3"
            >
              <button
                className="w-full py-2.5 bg-[var(--crimson)] text-[var(--cream)] text-[10px] tracking-[0.3em] uppercase font-body hover:bg-[var(--crimson-light)] transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Tambah ke Keranjang
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedBouquets() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-24 px-6" style={{ background: "var(--ink-mid)" }}>
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--crimson), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-body text-[10px] tracking-[0.4em] uppercase text-[var(--crimson-light)] mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ✦ Koleksi Pilihan
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-cream"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.1,
                color: "var(--cream)",
              }}
            >
              Bunga Terbaik
              <br />
              <span style={{ color: "var(--crimson-light)", fontStyle: "italic" }}>untuk Momen Terbaik</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="hidden md:block"
          >
            <Link
              href="/katalog"
              className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[var(--cream)] hover:text-[var(--crimson-light)] transition-colors font-body group"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Lihat Semua
              <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
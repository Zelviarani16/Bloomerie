"use client";

/*
  FeaturedProducts.jsx
  Section "Produk Pilihan" di Beranda.
  heading kiri + subtext, link "Lihat Semua ->"
  kanan (sejajar heading), grid 3 kolom card produk di bawahnya.

  Data produk ditarik dari data/products.js, difilter yang featured:true
  saja — supaya kalau nanti ada banyak produk, section ini tetap cuma
  nampilin yang dipilih sebagai unggulan.
*/

import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container-bloomerie">

        {/* Header: heading kiri, link kanan */}
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-1.5" style={{ color: "var(--color-ink)" }}>
              Produk Pilihan
            </h2>
            <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
              Kurasi eksklusif untuk mengekspresikan perasaan terdalam.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              href="/katalog"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold tracking-wide uppercase whitespace-nowrap group"
              style={{ color: "var(--color-primary)" }}
            >
              Lihat Semua
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Grid produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
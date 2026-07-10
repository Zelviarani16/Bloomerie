"use client";

/*
  ProductCard.jsx
  Reusable card produk — dipakai di FeaturedProducts (Beranda) DAN
  di halaman Katalog. Supaya satu komponen bisa dipakai di 2 tempat
  yang tampilannya sedikit beda, ditambahkan prop "variant":

  - variant="compact" (default)  -> dipakai di Beranda
    homepage: nama + tombol pill sejajar, harga di bawah, TANPA rating
  - variant="catalog"            -> dipakai di /katalog
    katalog: nama lalu deskripsi di bawahnya, harga + rating sejajar
    di baris bawah, TANPA tombol pill (karena seluruh card bisa diklik)
*/

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { formatRupiah } from "@/data/products";

export default function ProductCard({ product, index = 0, variant = "compact" }) {
  if (variant === "catalog") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href={`/produk/${product.slug}`} className="group block">
          {/* Foto + badge "Baru" kalau ada */}
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-neutral-100">
            {product.badge && (
              <span
                className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase px-2.5 py-1 rounded text-white"
                style={{ background: "var(--color-primary)" }}
              >
                {product.badge}
              </span>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Nama produk */}
          <h3 className="text-base font-semibold mb-1" style={{ color: "var(--color-ink)" }}>
            {product.name}
          </h3>

          {/* Deskripsi singkat */}
          <p className="text-sm mb-3" style={{ color: "var(--color-ink-soft)" }}>
            {product.description}
          </p>

          {/* Harga + rating sejajar */}
          <div className="flex items-center justify-between">
            <p className="text-base font-bold" style={{ color: "var(--color-ink)" }}>
              {formatRupiah(product.price)}
            </p>
            <div className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              <span className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                {product.rating}
              </span>
              <span className="text-sm" style={{ color: "var(--color-secondary)" }}>
                ({product.reviews})
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // ── variant="compact" (default, dipakai di Beranda) ──
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Foto produk */}
      <Link href={`/produk/${product.slug}`}>
        <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-neutral-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>

      {/* Nama + tombol Lihat Detail sejajar */}
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-ink)" }}>
          {product.name}
        </h3>

        <Link href={`/produk/${product.slug}`}>
          <motion.span
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block px-4 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap"
            style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
          >
            Lihat Detail
          </motion.span>
        </Link>
      </div>

      {/* Harga */}
      <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
        {formatRupiah(product.price)}
      </p>
    </motion.div>
  );
}
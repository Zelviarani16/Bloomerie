"use client";

/*
  RelatedProducts.jsx
  heading "Mungkin Anda Juga Suka" + link "Lihat Semua",
  grid 4 kolom produk. Pakai ProductCard variant="compact" yang sudah
  ada (sama seperti di Homepage) supaya konsisten tampilannya.
*/

import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";

export default function RelatedProducts({ products }) {
  if (products.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 container-bloomerie">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl lg:text-2xl font-bold" style={{ color: "var(--color-ink)" }}>
          Mungkin Anda Juga Suka
        </h2>
        <Link
          href="/katalog"
          className="text-sm font-semibold tracking-wide uppercase whitespace-nowrap"
          style={{ color: "var(--color-primary)" }}
        >
          Lihat Semua
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} variant="compact" />
        ))}
      </div>
    </section>
  );
}
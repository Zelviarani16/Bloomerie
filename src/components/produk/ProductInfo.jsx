"use client";

/*
  ProductInfo.jsx
  Bagian kanan halaman detail produk. Sesuai Figma:
  - Badge "Terlaris" kecil
  - Nama produk (besar, bold)
  - Harga (besar, primary color) — berubah sesuai ukuran yang dipilih
  - Rating bintang + jumlah ulasan
  - Deskripsi panjang
  - Pilihan ukuran buket (4 button, grid 2x2)
  - Textarea kartu ucapan (opsional)
  - Quantity selector (-/+) + button "Tambah ke Keranjang" sejajar
  - 2 baris info kecil (pengiriman, kualitas) di bawah
*/

import { useState } from "react";
import { motion } from "framer-motion";
import { formatRupiah } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductInfo({ product }) {
  const { addItem } = useCart();

  // Cari ukuran default, atau ukuran pertama kalau tidak ada yang default:true
  const defaultSize = product.sizes.find((s) => s.default) || product.sizes[0];

  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const finalPrice = product.price + selectedSize.priceOffset;

  function handleAddToCart() {
    addItem({
      // cartItemId unik per kombinasi produk+ukuran, dipakai untuk
      // update quantity / hapus item spesifik di halaman Keranjang
      cartItemId: `${product.slug}-${selectedSize.label}`,
      slug: product.slug,
      name: product.name,
      image: product.image,
      sizeLabel: selectedSize.label,
      price: finalPrice,
      quantity,
      note,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div>
      {/* Badge */}
      {product.badge && (
        <span
          className="inline-block text-xs font-semibold uppercase px-3 py-1 rounded-full mb-3"
          style={{ background: "#FEE2E2", color: "var(--color-primary)" }}
        >
          {product.badge}
        </span>
      )}

      {/* Nama produk */}
      <h1 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: "var(--color-ink)" }}>
        {product.name}
      </h1>

      {/* Harga */}
      <p className="text-2xl font-bold mb-3" style={{ color: "var(--color-primary)" }}>
        {formatRupiah(finalPrice)}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b" style={{ borderColor: "var(--color-neutral-dark)" }}>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={i < Math.round(product.rating) ? "#FBBF24" : "#E5E7EB"}
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          ))}
        </div>
        <span className="text-sm" style={{ color: "var(--color-secondary)" }}>
          ({product.reviews} Ulasan)
        </span>
      </div>

      {/* Deskripsi */}
      <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-ink-soft)" }}>
        {product.longDescription}
      </p>

      {/* Pilihan ukuran */}
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-wide uppercase mb-3" style={{ color: "var(--color-ink)" }}>
          Pilih Ukuran Buket
        </p>
        <div className="grid grid-cols-2 gap-3">
          {product.sizes.map((size) => {
            const isSelected = selectedSize.label === size.label;
            return (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size)}
                className="px-4 py-3 text-sm font-medium rounded border text-left transition-colors"
                style={{
                  borderColor: isSelected ? "var(--color-primary)" : "var(--color-neutral-dark)",
                  background: isSelected ? "var(--color-primary)" : "white",
                  color: isSelected ? "white" : "var(--color-ink)",
                }}
              >
                {size.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Kartu ucapan */}
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-wide uppercase mb-3" style={{ color: "var(--color-ink)" }}>
          Kartu Ucapan (Opsional)
        </p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Tuliskan pesan manis Anda di sini..."
          rows={3}
          className="w-full px-4 py-3 text-sm rounded border outline-none resize-none"
          style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
        />
      </div>

      {/* Quantity + Add to cart */}
      <div className="flex items-center gap-3 mb-4">
        {/* Quantity selector */}
        <div className="flex items-center border rounded" style={{ borderColor: "var(--color-neutral-dark)" }}>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-12 flex items-center justify-center text-lg"
            style={{ color: "var(--color-ink)" }}
            aria-label="Kurangi jumlah"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-medium" style={{ color: "var(--color-ink)" }}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-12 flex items-center justify-center text-lg"
            style={{ color: "var(--color-ink)" }}
            aria-label="Tambah jumlah"
          >
            +
          </button>
        </div>

        {/* Add to cart button */}
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 h-12 flex items-center justify-center gap-2 text-sm font-semibold rounded text-white"
          style={{ background: justAdded ? "var(--color-tertiary)" : "var(--color-primary)" }}
        >
          {justAdded ? (
            "✓ Ditambahkan ke Keranjang"
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" />
              </svg>
              Tambah ke Keranjang
            </>
          )}
        </motion.button>
      </div>

      {/* Info kecil bawah */}
      <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: "var(--color-secondary)" }}>
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          Pengiriman Hari yang Sama
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Kualitas Premium Terjamin
        </span>
      </div>
    </div>
  );
}
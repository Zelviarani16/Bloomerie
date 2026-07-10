"use client";

/*
  CartItemRow.jsx
  Satu baris produk di tabel Keranjang.
  foto kecil + nama + varian (kiri), harga satuan, quantity stepper,
  subtotal (harga x quantity), link "Hapus" di bawah nama.
*/

import { motion } from "framer-motion";
import Image from "next/image";
import { formatRupiah } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function CartItemRow({ item }) {
  const { updateQuantity, removeItem } = useCart();

  const subtotal = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      className="grid grid-cols-[auto_1fr_auto_auto_auto] sm:grid-cols-[80px_1fr_100px_120px_100px] gap-4 items-center py-5 border-b"
      style={{ borderColor: "var(--color-neutral-dark)" }}
    >
      {/* Foto */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Nama + varian + hapus */}
      <div className="min-w-0">
        <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-ink)" }}>
          {item.name}
        </p>
        <p className="text-xs mb-1.5" style={{ color: "var(--color-secondary)" }}>
          Varian: {item.sizeLabel}
        </p>
        <button
          onClick={() => removeItem(item.cartItemId)}
          className="text-xs flex items-center gap-1 hover:opacity-70"
          style={{ color: "var(--color-primary)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
          Hapus
        </button>
      </div>

      {/* Harga satuan — disembunyikan di mobile supaya tidak terlalu sempit */}
      <p className="hidden sm:block text-sm" style={{ color: "var(--color-ink-soft)" }}>
        {formatRupiah(item.price)}
      </p>

      {/* Quantity stepper */}
      <div className="flex items-center border rounded" style={{ borderColor: "var(--color-neutral-dark)" }}>
        <button
          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
          className="w-8 h-9 flex items-center justify-center text-base"
          style={{ color: "var(--color-ink)" }}
          aria-label="Kurangi"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-medium" style={{ color: "var(--color-ink)" }}>
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
          className="w-8 h-9 flex items-center justify-center text-base"
          style={{ color: "var(--color-ink)" }}
          aria-label="Tambah"
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <p className="text-sm font-bold text-right" style={{ color: "var(--color-primary)" }}>
        {formatRupiah(subtotal)}
      </p>
    </motion.div>
  );
}
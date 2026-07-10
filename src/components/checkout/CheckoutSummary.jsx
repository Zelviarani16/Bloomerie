"use client";

/*
  CheckoutSummary.jsx
  card kanan dengan list mini item (foto+nama+qty+harga),
  garis pemisah, lalu Subtotal/Ongkos Kirim/Biaya Layanan, Total
  Pembayaran besar, button "Bayar Sekarang", lalu icon row kecil
  (keamanan, garansi, dll — 4 ikon).
*/

import Image from "next/image";
import { motion } from "framer-motion";
import { formatRupiah } from "@/data/products";

const SERVICE_FEE = 2000;

export default function CheckoutSummary({ items, shippingCost, onSubmit, isSubmitting }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost + SERVICE_FEE;

  return (
    <div className="bg-white rounded-lg p-6 border sticky top-24" style={{ borderColor: "var(--color-neutral-dark)" }}>
      <h2 className="text-lg font-bold mb-5" style={{ color: "var(--color-ink)" }}>
        Ringkasan Pesanan
      </h2>

      {/* Mini list item */}
      <div className="flex flex-col gap-4 mb-5 pb-5 border-b" style={{ borderColor: "var(--color-neutral-dark)" }}>
        {items.map((item) => (
          <div key={item.cartItemId} className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded overflow-hidden bg-neutral-100 flex-shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "var(--color-ink)" }}>
                {item.name}
              </p>
              <p className="text-xs" style={{ color: "var(--color-secondary)" }}>
                Jumlah: {item.quantity}
              </p>
            </div>
            <p className="text-sm font-semibold whitespace-nowrap" style={{ color: "var(--color-ink)" }}>
              {formatRupiah(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Breakdown harga */}
      <div className="flex flex-col gap-2.5 mb-5">
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: "var(--color-ink-soft)" }}>Subtotal</span>
          <span style={{ color: "var(--color-ink)" }}>{formatRupiah(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: "var(--color-ink-soft)" }}>Ongkos Kirim</span>
          <span style={{ color: "var(--color-ink)" }}>{formatRupiah(shippingCost)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: "var(--color-ink-soft)" }}>Biaya Layanan</span>
          <span style={{ color: "var(--color-ink)" }}>{formatRupiah(SERVICE_FEE)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-5 pt-4 border-t" style={{ borderColor: "var(--color-neutral-dark)" }}>
        <span className="text-base font-bold" style={{ color: "var(--color-primary)" }}>
          Total Pembayaran
        </span>
        <span className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>
          {formatRupiah(total)}
        </span>
      </div>

      <motion.button
        onClick={onSubmit}
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full h-12 flex items-center justify-center text-sm font-semibold rounded text-white disabled:opacity-60 mb-3"
        style={{ background: "var(--color-primary)" }}
      >
        {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
      </motion.button>

      <p className="flex items-center justify-center gap-1.5 text-xs" style={{ color: "var(--color-secondary)" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        Pembayaran Terenkripsi &amp; Aman
      </p>
    </div>
  );
}
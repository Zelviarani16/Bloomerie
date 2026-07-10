"use client";

/*
  OrderSummary.jsx
  Card kanan halaman Keranjang.
  Subtotal, Estimasi Pengiriman, Pajak (PPN 11%), garis pemisah,
  Total Harga (besar, bold), button "Lanjut ke Pembayaran",
  2 baris info kecil (pembayaran aman, gratis ongkir).

  Kalkulasi ongkir & pajak dummy dulu (nilai tetap) — nanti gampang
  diganti logic asli (misal ongkir dari API kurir, pajak dari aturan
  bisnis sesungguhnya).
*/

import Link from "next/link";
import { motion } from "framer-motion";
import { formatRupiah } from "@/data/products";

const SHIPPING_COST = 25000;
const TAX_RATE = 0.11; // PPN 11%

export default function OrderSummary({ subtotal, itemCount }) {
  const shipping = subtotal > 0 ? SHIPPING_COST : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  return (
    <div className="rounded-lg p-6 sticky top-24" style={{ background: "var(--color-neutral)" }}>
      <h2 className="text-lg font-bold mb-5" style={{ color: "var(--color-ink)" }}>
        Ringkasan Pesanan
      </h2>

      <div className="flex flex-col gap-3 mb-5">
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: "var(--color-ink-soft)" }}>Subtotal ({itemCount} Produk)</span>
          <span style={{ color: "var(--color-ink)" }}>{formatRupiah(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: "var(--color-ink-soft)" }}>Estimasi Pengiriman</span>
          <span style={{ color: "var(--color-ink)" }}>{formatRupiah(shipping)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: "var(--color-ink-soft)" }}>Pajak (PPN 11%)</span>
          <span style={{ color: "var(--color-ink)" }}>{formatRupiah(tax)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-5 pt-4 border-t" style={{ borderColor: "var(--color-neutral-dark)" }}>
        <span className="text-base font-bold" style={{ color: "var(--color-ink)" }}>
          Total Harga
        </span>
        <span className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>
          {formatRupiah(total)}
        </span>
      </div>

      <Link href="/checkout">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={itemCount === 0}
          className="w-full h-12 flex items-center justify-center gap-2 text-sm font-semibold rounded text-white disabled:opacity-50"
          style={{ background: "var(--color-primary)" }}
        >
          Lanjut ke Pembayaran
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.button>
      </Link>

      <div className="flex flex-col gap-2 mt-5 text-xs" style={{ color: "var(--color-secondary)" }}>
        <span className="flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
          </svg>
          Pembayaran Aman &amp; Terenkripsi
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          Gratis Ongkir untuk min. Rp 1,5 Juta
        </span>
      </div>
    </div>
  );
}
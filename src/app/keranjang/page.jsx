"use client";

/*
  app/keranjang/page.jsx — Halaman Keranjang Belanja (/keranjang)

  "use client" di level page.jsx ini perlu karena pakai useCart()
  (Context) langsung di sini untuk cek apakah keranjang kosong atau
  tidak, untuk nampilin empty state.
*/

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/keranjang/CartItemRow";
import OrderSummary from "@/components/keranjang/OrderSummary";
import PromoCodeInput from "@/components/keranjang/PromoCodeInput";

export default function KeranjangPage() {
  const { items, subtotal, isLoaded } = useCart();

  // isLoaded mencegah "flash" empty state sebelum localStorage
  // selesai dibaca saat pertama buka halaman.
  if (!isLoaded) {
    return <div className="container-bloomerie py-16" />;
  }

  return (
    <div className="container-bloomerie py-10 lg:py-12">
      <h1 className="text-2xl lg:text-3xl font-bold mb-8" style={{ color: "var(--color-ink)" }}>
        Keranjang Belanja
      </h1>

      {items.length === 0 ? (
        // ── Empty state ──
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-dark)" strokeWidth="1.5" className="mb-4">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" />
          </svg>
          <p className="text-base font-semibold mb-2" style={{ color: "var(--color-ink)" }}>
            Keranjang Anda masih kosong
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--color-ink-soft)" }}>
            Yuk, jelajahi koleksi buket terbaik kami.
          </p>
          <Link href="/katalog">
            <button
              className="px-6 py-3 text-xs font-semibold tracking-wide uppercase rounded text-white"
              style={{ background: "var(--color-primary)" }}
            >
              Jelajahi Katalog
            </button>
          </Link>
        </motion.div>
      ) : (
        // ── Isi keranjang ──
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          <div>
            {/* Header tabel — disembunyikan di mobile */}
            <div
              className="hidden sm:grid grid-cols-[80px_1fr_100px_120px_100px] gap-4 pb-3 border-b text-xs font-semibold uppercase tracking-wide"
              style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-secondary)" }}
            >
              <span></span>
              <span>Produk</span>
              <span>Harga</span>
              <span>Jumlah</span>
              <span className="text-right">Subtotal</span>
            </div>

            {/* List item — AnimatePresence supaya item yang dihapus animasi keluar */}
            <AnimatePresence>
              {items.map((item) => (
                <CartItemRow key={item.cartItemId} item={item} />
              ))}
            </AnimatePresence>

            <PromoCodeInput />
          </div>

          <div>
            <OrderSummary subtotal={subtotal} itemCount={items.reduce((sum, i) => sum + i.quantity, 0)} />
          </div>
        </div>
      )}
    </div>
  );
}
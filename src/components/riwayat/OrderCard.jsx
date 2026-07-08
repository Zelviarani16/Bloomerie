"use client";

/*
  OrderCard.jsx
  Sesuai Figma: card putih horizontal, foto kiri, lalu kolom
  No.Pesanan, Tanggal, Item, Total, Status badge, button kanan
  ("Pesan Lagi" solid kalau selesai, "Detail" outline kalau belum).
*/

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { formatRupiah } from "@/data/products";
import { STATUS_LABELS } from "@/data/orders";

export default function OrderCard({ order, index = 0 }) {
  const statusInfo = STATUS_LABELS[order.status];
  const mainItem = order.items[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-lg border p-5"
      style={{ borderColor: "var(--color-neutral-dark)" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Foto */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
          <Image src={mainItem.image} alt={mainItem.name} fill className="object-cover" />
        </div>

        {/* No. Pesanan */}
        <div className="sm:w-32 flex-shrink-0">
          <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--color-secondary)" }}>
            No. Pesanan
          </p>
          <p className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>
            #{order.id}
          </p>
        </div>

        {/* Tanggal */}
        <div className="sm:w-28 flex-shrink-0">
          <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--color-secondary)" }}>
            Tanggal
          </p>
          <p className="text-sm" style={{ color: "var(--color-ink)" }}>
            {order.date}
          </p>
        </div>

        {/* Item */}
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--color-secondary)" }}>
            Item
          </p>
          <p className="text-sm truncate" style={{ color: "var(--color-ink)" }}>
            {mainItem.name}
            {order.extraItemsCount > 0 && (
              <span style={{ color: "var(--color-secondary)" }}> dan {order.extraItemsCount} lainnya</span>
            )}
          </p>
        </div>

        {/* Total */}
        <div className="sm:w-32 flex-shrink-0">
          <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--color-secondary)" }}>
            Total
          </p>
          <p className="text-sm font-bold" style={{ color: "var(--color-ink)" }}>
            {formatRupiah(order.total)}
          </p>
        </div>

        {/* Status badge */}
        <div className="sm:w-28 flex-shrink-0">
          <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--color-secondary)" }}>
            Status
          </p>
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
            style={{ background: statusInfo.bg, color: statusInfo.color }}
          >
            {statusInfo.label}
          </span>
        </div>

        {/* Button kanan */}
        <div className="sm:w-32 flex-shrink-0">
          {order.status === "selesai" ? (
            <Link href="/katalog">
              <button
                className="w-full px-4 py-2.5 text-xs font-semibold rounded text-white whitespace-nowrap"
                style={{ background: "var(--color-primary)" }}
              >
                Pesan Lagi
              </button>
            </Link>
          ) : (
            <Link href={`/riwayat-transaksi/${order.id}`}>
              <button
                className="w-full px-4 py-2.5 text-xs font-semibold rounded border whitespace-nowrap"
                style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
              >
                Detail
              </button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
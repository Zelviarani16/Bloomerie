"use client";

/*
  InventoryTable.jsx
  Sesuai Figma: tabel dengan kolom ID, Nama Produk (foto kecil+nama),
  Kategori (badge pill abu), Harga, Stok (merah kalau <= threshold),
  Status (dot + label), dan menu titik tiga di akhir baris.
*/

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { formatRupiah } from "@/data/products";
import { STATUS_BADGE, STOCK_THRESHOLD } from "@/data/admin-inventory";

export default function InventoryTable({ products }) {
  return (
    <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "var(--color-neutral-dark)" }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }}>
              {["ID", "Nama Produk", "Kategori", "Harga", "Stok", "Status", ""].map((head) => (
                <th
                  key={head}
                  className="text-left text-xs font-semibold tracking-wide uppercase py-3.5 px-4 whitespace-nowrap"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {products.map((product, index) => {
                const isLowStock = product.stock <= STOCK_THRESHOLD && product.stock > 0;
                const isOutOfStock = product.stock === 0;
                const statusInfo = STATUS_BADGE[product.status];

                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b"
                    style={{ borderColor: "var(--color-neutral-dark)" }}
                  >
                    <td className="py-4 px-4 text-sm" style={{ color: "var(--color-secondary)" }}>
                      #{product.id}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded overflow-hidden bg-neutral-100 flex-shrink-0">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <span className="text-sm font-medium whitespace-nowrap" style={{ color: "var(--color-ink)" }}>
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className="inline-block px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap"
                        style={{ background: "var(--color-neutral)", color: "var(--color-ink-soft)" }}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm whitespace-nowrap" style={{ color: "var(--color-ink)" }}>
                      {formatRupiah(product.price)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: isOutOfStock || isLowStock ? "var(--color-primary)" : "var(--color-ink)" }}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: statusInfo.dotColor }}
                        />
                        <span className="text-sm" style={{ color: statusInfo.textColor }}>
                          {statusInfo.label}
                        </span>
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button aria-label="Opsi lain" style={{ color: "var(--color-secondary)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="5" r="1.5" />
                          <circle cx="12" cy="12" r="1.5" />
                          <circle cx="12" cy="19" r="1.5" />
                        </svg>
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </AnimatePresence>
        </table>
      </div>

      {products.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Tidak ada produk yang ditemukan.
          </p>
        </div>
      )}
    </div>
  );
}

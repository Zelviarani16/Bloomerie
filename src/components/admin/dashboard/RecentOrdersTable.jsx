"use client";

/*
  RecentOrdersTable.jsx
  Sesuai Figma: heading "Pesanan Terbaru" + link "Lihat Semua",
  tabel dengan kolom ID Pesanan, Pelanggan (avatar inisial+nama),
  Produk, Tanggal, Status badge, Total, dan menu titik tiga di akhir.
*/

import Link from "next/link";
import { formatRupiah } from "@/data/products";
import { STATUS_BADGE } from "@/data/admin-dashboard";

export default function RecentOrdersTable({ orders }) {
  return (
    <div className="bg-white rounded-lg p-6 border" style={{ borderColor: "var(--color-neutral-dark)" }}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold" style={{ color: "var(--color-ink)" }}>
          Pesanan Terbaru
        </h2>
        <Link href="/admin/pesanan" className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
          Lihat Semua
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--color-neutral-dark)" }}>
              {["ID Pesanan", "Pelanggan", "Produk", "Tanggal", "Status", "Total", ""].map((head) => (
                <th
                  key={head}
                  className="text-left text-xs font-semibold tracking-wide uppercase py-3 px-2 whitespace-nowrap"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const statusInfo = STATUS_BADGE[order.status];
              return (
                <tr key={order.id} className="border-b" style={{ borderColor: "var(--color-neutral-dark)" }}>
                  <td className="py-4 px-2 text-sm font-semibold whitespace-nowrap" style={{ color: "var(--color-primary)" }}>
                    #{order.id}
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: "var(--color-neutral)", color: "var(--color-ink)" }}
                      >
                        {order.initials}
                      </span>
                      <span className="text-sm whitespace-nowrap" style={{ color: "var(--color-ink)" }}>
                        {order.customer}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-sm" style={{ color: "var(--color-ink-soft)" }}>
                    {order.product}
                  </td>
                  <td className="py-4 px-2 text-sm whitespace-nowrap" style={{ color: "var(--color-ink-soft)" }}>
                    {order.date}
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className="inline-block px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap"
                      style={{ background: statusInfo.bg, color: statusInfo.color }}
                    >
                      {statusInfo.label}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-sm font-semibold whitespace-nowrap" style={{ color: "var(--color-ink)" }}>
                    {formatRupiah(order.total)}
                  </td>
                  <td className="py-4 px-2">
                    <button aria-label="Opsi lain" style={{ color: "var(--color-secondary)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

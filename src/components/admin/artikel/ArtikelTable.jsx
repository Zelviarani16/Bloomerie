"use client";

/*
  ArtikelTable.jsx
  Tabel artikel dengan kolom: Judul Artikel, Status, Kategori, Penulis, Tanggal, Aksi
  Status badge pakai dot + text style (sama kayak Inventory & Pelanggan)
*/

import Image from "next/image";
import { STATUS_BADGE } from "@/data/admin-artikel";

const StatusBadge = ({ status }) => {
  const config = STATUS_BADGE[status] || STATUS_BADGE.Draft;
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: config.dotColor }} />
      <span className="text-sm font-medium" style={{ color: config.textColor }}>
        {config.label}
      </span>
    </span>
  );
};

const KategoriBadge = ({ kategori }) => {
  return (
    <span
      className="inline-block px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap"
      style={{ background: "var(--color-neutral)", color: "var(--color-ink-soft)" }}
    >
      {kategori}
    </span>
  );
};

export default function ArtikelTable({ artikel, onEdit, onDelete, onDownload, currentPage, totalItems, itemsPerPage }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "var(--color-neutral-dark)" }}>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className="border-b"
              style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }}
            >
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-secondary)" }}>
                Judul Artikel
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-secondary)" }}>
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-secondary)" }}>
                Kategori
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-secondary)" }}>
                Penulis
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-secondary)" }}>
                Tanggal
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-secondary)" }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {artikel.map((item, index) => (
              <tr
                key={item.id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                style={{ borderColor: "var(--color-neutral-dark)" }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-neutral-100 flex-shrink-0">
                      <Image src={item.gambar} alt={item.judul} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--color-ink)" }}>
                        {item.judul}
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-secondary)" }}>
                        {item.slug}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4">
                  <KategoriBadge kategori={item.kategori} />
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: "var(--color-ink-soft)" }}>
                  {item.penulis}
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: "var(--color-ink-soft)" }}>
                  {item.tanggal}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end items-center gap-1">
                    {/* Download */}
                    <button
                      onClick={() => onDownload && onDownload(item)}
                      className="w-8 h-8 rounded flex items-center justify-center transition-colors"
                      style={{ color: "var(--color-secondary)" }}
                      title="Unduh"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--color-neutral)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => onEdit && onEdit(item)}
                      className="w-8 h-8 rounded flex items-center justify-center transition-colors"
                      style={{ color: "var(--color-secondary)" }}
                      title="Edit"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--color-neutral)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => onDelete && onDelete(item)}
                      className="w-8 h-8 rounded flex items-center justify-center transition-colors"
                      style={{ color: "var(--color-primary)" }}
                      title="Hapus"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#FEE2E2";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="px-6 py-4 border-t flex items-center justify-between"
        style={{ borderColor: "var(--color-neutral-dark)" }}
      >
        <p className="text-sm" style={{ color: "var(--color-secondary)" }}>
          Menampilkan {startItem}-{endItem} dari {totalItems} artikel
        </p>
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 rounded border flex items-center justify-center text-sm transition-colors"
            style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className="w-8 h-8 rounded border text-sm font-medium transition-colors"
              style={{
                borderColor: page === 1 ? "var(--color-primary)" : "var(--color-neutral-dark)",
                background: page === 1 ? "var(--color-primary)" : "white",
                color: page === 1 ? "white" : "var(--color-ink)",
              }}
            >
              {page}
            </button>
          ))}
          <button
            className="w-8 h-8 rounded border flex items-center justify-center text-sm transition-colors"
            style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

/*
  ArsipTable.jsx
  Tabel arsip artikel dengan kolom: Judul Artikel, Tanggal Diarsipkan, Aksi
  Include alert box penting di bawah tabel
*/

import Image from "next/image";

export default function ArsipTable({ arsip, onRestore, onDelete, currentPage, totalItems, itemsPerPage }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "var(--color-neutral-dark)" }}>
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
                  Tanggal Diarsipkan
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-secondary)" }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {arsip.map((item, index) => (
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
                          Kategori: {item.kategori}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: "var(--color-ink-soft)" }}>
                    {item.tanggalDiarsipkan}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end items-center gap-1">
                      {/* Restore */}
                      <button
                        onClick={() => onRestore && onRestore(item)}
                        className="w-8 h-8 rounded flex items-center justify-center transition-colors"
                        style={{ color: "var(--color-secondary)" }}
                        title="Pulihkan"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--color-neutral)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="1 4 1 10 7 10" />
                          <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                        </svg>
                      </button>

                      {/* Delete Permanen */}
                      <button
                        onClick={() => onDelete && onDelete(item)}
                        className="w-8 h-8 rounded flex items-center justify-center transition-colors"
                        style={{ color: "var(--color-primary)" }}
                        title="Hapus Permanen"
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
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
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

      {/* Alert Box - Important Notice */}
      <div
        className="p-4 rounded-lg border flex gap-3"
        style={{ background: "#FEF3C7", borderColor: "#FCD34D" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D97706"
          strokeWidth="2"
          className="flex-shrink-0 mt-0.5"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: "#92400E" }}>
            Penting: Penghapusan Artikel
          </p>
          <p className="text-sm" style={{ color: "#92400E" }}>
            Artikel yang dihapus secara permanen dari arsip tidak dapat dipulihkan kembali. Pastikan Anda telah memeriksa kembali sebelum melakukan aksi hapus permanen.
          </p>
        </div>
      </div>
    </div>
  );
}
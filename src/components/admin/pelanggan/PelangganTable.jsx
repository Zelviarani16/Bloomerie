"use client";

/*
  PelangganTable.jsx
  Sesuai Figma: Tabel dengan kolom:
  - Nama Pelanggan (dengan inisial avatar)
  - Email
  - Tanggal Bergabung
  - Status (AKTIF/SUSPEN badge)
  - Aksi (Edit, Block, More)
*/

import { useState } from "react";

// Style status sama seperti InventoryTable: dot (titik) + text
const STATUS_CONFIG = {
  AKTIF: { dotColor: "#059669", textColor: "#065F46" },
  SUSPEN: { dotColor: "#DC2626", textColor: "#991B1B" },
};

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.AKTIF;
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: config.dotColor }} />
      <span className="text-sm font-medium" style={{ color: config.textColor }}>
        {status}
      </span>
    </span>
  );
};

const Avatar = ({ nama }) => {
  // Ambil inisial dari nama
  const initials = nama
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
      style={{ background: "var(--color-neutral)", color: "var(--color-primary)" }}
    >
      {initials}
    </div>
  );
};

const ActionMenu = ({ item, onEdit, onToggleBlock }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {/* Edit Button */}
        <button
          onClick={() => onEdit(item)}
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

        {/* Block/Unblock Button */}
        <button
          onClick={() => onToggleBlock(item)}
          className="w-8 h-8 rounded flex items-center justify-center transition-colors"
          style={{ color: item.status === "SUSPEN" ? "var(--color-tertiary)" : "var(--color-secondary)" }}
          title={item.status === "SUSPEN" ? "Buka Blokir" : "Blokir"}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-neutral)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          {item.status === "SUSPEN" ? (
            // Unblock icon
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 019.9-1" />
            </svg>
          ) : (
            // Block icon
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          )}
        </button>

        {/* More Options */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 rounded flex items-center justify-center transition-colors"
          style={{ color: "var(--color-secondary)" }}
          title="Lainnya"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-neutral)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div
            className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border z-20 py-1"
            style={{ borderColor: "var(--color-neutral-dark)" }}
          >
            <button
              onClick={() => {
                onEdit(item);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              style={{ color: "var(--color-ink)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Lihat Detail
            </button>
            <button
              onClick={() => {
                onToggleBlock(item);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              style={{ color: item.status === "SUSPEN" ? "var(--color-tertiary)" : "#DC2626" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {item.status === "SUSPEN" ? (
                  <>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 019.9-1" />
                  </>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </>
                )}
              </svg>
              {item.status === "SUSPEN" ? "Buka Blokir" : "Blokir Akun"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default function PelangganTable({ pelanggan, onEdit, onToggleBlock, onPageChange, currentPage, totalPages }) {
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
                Nama Pelanggan
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-secondary)" }}>
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-secondary)" }}>
                Tanggal Bergabung
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-secondary)" }}>
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-secondary)" }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {pelanggan.map((item, index) => (
              <tr
                key={item.id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                style={{ borderColor: "var(--color-neutral-dark)" }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar nama={item.namaLengkap} />
                    <span className="font-medium text-sm" style={{ color: "var(--color-ink)" }}>
                      {item.nama}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: "var(--color-ink-soft)" }}>
                  {item.email}
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: "var(--color-ink-soft)" }}>
                  {item.tanggalBergabung}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <ActionMenu item={item} onEdit={onEdit} onToggleBlock={onToggleBlock} />
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
          Menampilkan 1-{pelanggan.length} dari 2,840 pengguna
        </p>
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 rounded border flex items-center justify-center text-sm transition-colors disabled:opacity-50"
            style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className="w-8 h-8 rounded border text-sm font-medium transition-colors"
              style={{
                borderColor: currentPage === page ? "var(--color-primary)" : "var(--color-neutral-dark)",
                background: currentPage === page ? "var(--color-primary)" : "white",
                color: currentPage === page ? "white" : "var(--color-ink)",
              }}
            >
              {page}
            </button>
          ))}
          <button
            className="w-8 h-8 rounded border flex items-center justify-center text-sm transition-colors"
            style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
            onClick={() => onPageChange(currentPage + 1)}
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

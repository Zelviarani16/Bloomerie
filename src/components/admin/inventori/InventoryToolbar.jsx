"use client";

/*
  InventoryToolbar.jsx
  search input full-width kiri, button "Filter" dan
  "Ekspor" kanan (outline, ada icon).
*/

export default function InventoryToolbar({ searchQuery, onSearchChange }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
      <div className="relative flex-1">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="2"
          className="absolute left-4 top-1/2 -translate-y-1/2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama produk atau ID..."
          className="w-full pl-11 pr-4 py-3 text-sm rounded border outline-none"
          style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
        />
      </div>

      <div className="flex gap-3">
        <button
          className="flex items-center gap-2 px-4 py-3 text-sm rounded border whitespace-nowrap"
          style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filter
        </button>
        <button
          className="flex items-center gap-2 px-4 py-3 text-sm rounded border whitespace-nowrap"
          style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Ekspor
        </button>
      </div>
    </div>
  );
}

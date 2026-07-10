"use client";

/*
  FilterSidebar.jsx
  - "Filters" heading
  - Kategori: checkbox list
  - Rentang Harga: slider + label angka kiri-kanan
  - Rating: checkbox dengan bintang
  - Button "Apply Filters" solid maroon di bawah

  Semua state filter (kategori dipilih, harga maks, rating min)
  dikelola di parent (KatalogClient.jsx) dan diteruskan turun lewat
  props — supaya sidebar ini "dumb component" murni tampilan, logic
  filter-nya tetap di satu tempat saja.
*/

import { CATEGORIES } from "@/data/products";

export default function FilterSidebar({
  selectedCategories,
  onToggleCategory,
  maxPrice,
  onChangeMaxPrice,
  minRating,
  onChangeMinRating,
  onApply,
}) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <h2 className="text-lg font-bold mb-5" style={{ color: "var(--color-ink)" }}>
        Filters
      </h2>

      {/* ── Kategori ── */}
      <div className="mb-7">
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--color-ink)" }}>
          Kategori
        </p>
        <div className="flex flex-col gap-2.5">
          {CATEGORIES.map((category) => {
            const isChecked = selectedCategories.includes(category);
            return (
              <label key={category} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleCategory(category)}
                  className="w-4 h-4 rounded cursor-pointer accent-[var(--color-primary)]"
                />
                <span
                  className="text-sm"
                  style={{ color: isChecked ? "var(--color-primary)" : "var(--color-ink-soft)" }}
                >
                  {category}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ── Rentang Harga ── */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
            Rentang Harga
          </p>
          <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
            Rp {maxPrice.toLocaleString("id-ID")}
          </p>
        </div>
        <input
          type="range"
          min={0}
          max={500000}
          step={10000}
          value={maxPrice}
          onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--color-primary)]"
        />
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs" style={{ color: "var(--color-secondary)" }}>Rp 0</span>
          <span className="text-xs" style={{ color: "var(--color-secondary)" }}>Rp 500.000</span>
        </div>
      </div>

      {/* ── Rating ── */}
      <div className="mb-7">
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--color-ink)" }}>
          Rating
        </p>
        <div className="flex flex-col gap-2.5">
          {[5, 4].map((starCount) => (
            <label key={starCount} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={minRating === starCount}
                onChange={() => onChangeMinRating(minRating === starCount ? 0 : starCount)}
                className="w-4 h-4 rounded cursor-pointer accent-[var(--color-primary)]"
              />
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill={i < starCount ? "#FBBF24" : "#E5E7EB"}
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ── Apply button ── */}
      <button
        onClick={onApply}
        className="w-full py-3 text-xs font-semibold tracking-[0.1em] uppercase rounded text-white"
        style={{ background: "var(--color-primary)" }}
      >
        Apply Filters
      </button>
    </aside>
  );
}
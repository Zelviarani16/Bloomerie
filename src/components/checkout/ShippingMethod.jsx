"use client";

/*
  ShippingMethod.jsx
  Sesuai Figma: card dengan 3 pilihan radio (Standar, Ekspres, Same Day),
  tiap pilihan ada label + estimasi waktu di kiri, harga di kanan.
  Yang terpilih ada border + dot merah penuh.
*/

export const SHIPPING_OPTIONS = [
  { id: "standard", label: "Pengiriman Standar", note: "Estimasi 2-3 Hari Kerja", price: 25000 },
  { id: "express", label: "Pengiriman Ekspres", note: "Estimasi 1 Hari Kerja", price: 35000 },
  { id: "sameday", label: "Layanan Same Day", note: "Sampai Sebelum Jam 8 Malam", price: 55000 },
];

export default function ShippingMethod({ selected, onChange }) {
  return (
    <div className="bg-white rounded-lg p-6 border" style={{ borderColor: "var(--color-neutral-dark)" }}>
      <div className="flex items-center gap-2.5 mb-5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
          <path d="M16.5 9.4L7.55 4.24" />
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
        <h2 className="text-base font-bold" style={{ color: "var(--color-ink)" }}>
          Metode Pengiriman
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {SHIPPING_OPTIONS.map((option) => {
          const isSelected = selected === option.id;
          return (
            <label
              key={option.id}
              className="flex items-center justify-between p-4 rounded border cursor-pointer transition-colors"
              style={{
                borderColor: isSelected ? "var(--color-primary)" : "var(--color-neutral-dark)",
                background: isSelected ? "#FEF2F4" : "white",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Custom radio dot */}
                <span
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: isSelected ? "var(--color-primary)" : "var(--color-neutral-dark)" }}
                >
                  {isSelected && <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--color-primary)" }} />}
                </span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
                    {option.label}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-secondary)" }}>
                    {option.note}
                  </p>
                </div>
              </div>

              <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
                Rp {option.price.toLocaleString("id-ID")}
              </p>

              <input
                type="radio"
                name="shippingMethod"
                value={option.id}
                checked={isSelected}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
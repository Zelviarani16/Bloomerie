"use client";

/*
  OrderTabs.jsx
  4 pill button (Semua Pesanan, Menunggu, Dikirim, Selesai).
  Yang aktif solid maroon, sisanya outline tipis abu.
*/

const TABS = [
  { value: "all", label: "Semua Pesanan" },
  { value: "menunggu", label: "Menunggu" },
  { value: "dikirim", label: "Dikirim" },
  { value: "selesai", label: "Selesai" },
];

export default function OrderTabs({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className="px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap transition-colors"
            style={{
              background: isActive ? "var(--color-primary)" : "white",
              color: isActive ? "white" : "var(--color-ink-soft)",
              borderColor: isActive ? "var(--color-primary)" : "var(--color-neutral-dark)",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
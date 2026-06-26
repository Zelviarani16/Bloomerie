"use client";

/*
  PaymentMethod.jsx
  Sesuai Figma: card dengan grid 2x2, tiap pilihan ada ikon besar,
  nama metode, sub-text kecil (bank/provider). Yang terpilih ada
  border + background pink lembut (sama pattern seperti ShippingMethod
  tapi grid bukan list).
*/

export const PAYMENT_OPTIONS = [
  {
    id: "bank_transfer",
    label: "Transfer Bank",
    note: "BCA, Mandiri, BNI",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="3" y1="21" x2="21" y2="21" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polygon points="12 2 21 10 3 10" />
        <line x1="6" y1="10" x2="6" y2="21" />
        <line x1="10" y1="10" x2="10" y2="21" />
        <line x1="14" y1="10" x2="14" y2="21" />
        <line x1="18" y1="10" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    id: "qris",
    label: "QRIS / E-Wallet",
    note: "GoPay, OVO, ShopeePay",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <line x1="14" y1="14" x2="21" y2="14" />
        <line x1="14" y1="18" x2="21" y2="18" />
        <line x1="17" y1="14" x2="17" y2="21" />
      </svg>
    ),
  },
  {
    id: "credit_card",
    label: "Kartu Kredit",
    note: "Visa, Mastercard",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "cod",
    label: "Bayar di Tempat",
    note: "Hanya di Area Jakarta",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
];

export default function PaymentMethod({ selected, onChange }) {
  return (
    <div className="bg-white rounded-lg p-6 border" style={{ borderColor: "var(--color-neutral-dark)" }}>
      <div className="flex items-center gap-2.5 mb-5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        <h2 className="text-base font-bold" style={{ color: "var(--color-ink)" }}>
          Metode Pembayaran
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {PAYMENT_OPTIONS.map((option) => {
          const isSelected = selected === option.id;
          return (
            <label
              key={option.id}
              className="flex flex-col items-center text-center p-5 rounded border cursor-pointer transition-colors"
              style={{
                borderColor: isSelected ? "var(--color-primary)" : "var(--color-neutral-dark)",
                background: isSelected ? "#FEF2F4" : "white",
              }}
            >
              <span
                className="mb-2.5"
                style={{ color: isSelected ? "var(--color-primary)" : "var(--color-ink-soft)" }}
              >
                {option.icon}
              </span>
              <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-ink)" }}>
                {option.label}
              </p>
              <p className="text-xs" style={{ color: "var(--color-secondary)" }}>
                {option.note}
              </p>

              <input
                type="radio"
                name="paymentMethod"
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
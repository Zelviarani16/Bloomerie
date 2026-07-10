"use client";

/*
  ShippingForm.jsx
  card putih dengan ikon truck + "Informasi Pengiriman",
  grid 2 kolom (Nama Depan/Belakang), full-width (Nomor Telepon,
  Alamat Lengkap sebagai textarea), grid 2 kolom lagi (Kota, Kode Pos).

  State form dikelola di parent (CheckoutClient) dan diteruskan turun
  lewat props "values" + "onChange" — pola yang sama seperti
  FilterSidebar di halaman Katalog (controlled component, parent
  pegang semua data).
*/

const FIELDS_ROW1 = [
  { name: "firstName", label: "Nama Depan", placeholder: "Budi" },
  { name: "lastName", label: "Nama Belakang", placeholder: "Santoso" },
];

export default function ShippingForm({ values, onChange }) {
  function handleInputChange(e) {
    onChange({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div className="bg-white rounded-lg p-6 border" style={{ borderColor: "var(--color-neutral-dark)" }}>
      <div className="flex items-center gap-2.5 mb-5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
        <h2 className="text-base font-bold" style={{ color: "var(--color-ink)" }}>
          Informasi Pengiriman
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {FIELDS_ROW1.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-ink)" }}>
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={values[field.name] || ""}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 text-sm rounded border outline-none"
              style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-ink)" }}>
          Nomor Telepon
        </label>
        <input
          type="tel"
          name="phone"
          value={values.phone || ""}
          onChange={handleInputChange}
          placeholder="+62 812 3456 7890"
          className="w-full px-4 py-3 text-sm rounded border outline-none"
          style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-ink)" }}>
          Alamat Lengkap
        </label>
        <textarea
          name="address"
          value={values.address || ""}
          onChange={handleInputChange}
          placeholder="Jl. Mawar Indah No. 123, Kebayoran Baru"
          rows={3}
          className="w-full px-4 py-3 text-sm rounded border outline-none resize-none"
          style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-ink)" }}>
            Kota
          </label>
          <input
            type="text"
            name="city"
            value={values.city || ""}
            onChange={handleInputChange}
            placeholder="Jakarta Selatan"
            className="w-full px-4 py-3 text-sm rounded border outline-none"
            style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-ink)" }}>
            Kode Pos
          </label>
          <input
            type="text"
            name="postalCode"
            value={values.postalCode || ""}
            onChange={handleInputChange}
            placeholder="12150"
            className="w-full px-4 py-3 text-sm rounded border outline-none"
            style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
          />
        </div>
      </div>
    </div>
  );
}
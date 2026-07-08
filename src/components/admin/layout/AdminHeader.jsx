/*
  AdminHeader.jsx
  Beberapa halaman admin (lihat screenshot Kelola Produk, Kelola
  Transaksi) punya avatar admin kecil di pojok kanan atas konten,
  beberapa lainnya tidak. Dipisah jadi komponen kecil opsional yang
  bisa diselipkan di halaman mana saja yang butuh.
*/

import Image from "next/image";

export default function AdminHeader({ adminName = "Admin Bloomerie", adminRole = "Manajer Toko" }) {
  return (
    <div className="flex items-center gap-3 justify-end mb-6">
      <div className="text-right">
        <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
          {adminName}
        </p>
        <p className="text-xs" style={{ color: "var(--color-secondary)" }}>
          {adminRole}
        </p>
      </div>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
        style={{ background: "var(--color-primary)" }}
      >
        {adminName.charAt(0)}
      </div>
    </div>
  );
}

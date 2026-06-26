/*
  Breadcrumb.jsx
  Reusable, dipakai di halaman Detail Produk dan nanti bisa dipakai
  di halaman lain juga (Detail Artikel, dll).

  Props "items" berupa array of { label, href }. Item terakhir
  otomatis dianggap halaman aktif (tidak jadi link, warna lebih gelap).
*/

import Link from "next/link";

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-2">
            {isLast || !item.href ? (
              <span style={{ color: "var(--color-ink)" }}>{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:opacity-70" style={{ color: "var(--color-secondary)" }}>
                {item.label}
              </Link>
            )}
            {!isLast && (
              <span style={{ color: "var(--color-secondary)" }}>›</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
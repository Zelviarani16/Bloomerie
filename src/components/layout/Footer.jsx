/*
  Footer.jsx
  Sesuai design Figma:
  - Background neutral-dark (sedikit lebih gelap dari background utama)
  - Kiri: nama brand + tagline singkat
  - Tengah/kanan: link Kebijakan Privasi, Syarat & Ketentuan, Hubungi Kami
  - Ikon share/email kanan
  - Baris bawah: copyright

  Tidak butuh "use client" karena tidak ada interaktivitas/animasi
  di komponen ini — render statis saja lebih ringan.
*/

import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
  { label: "Hubungi Kami", href: "/hubungi-kami" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-neutral-dark)" }}>
      <div className="container-bloomerie py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

          {/* ── Brand + tagline ── */}
          <div>
            <p className="text-lg font-bold" style={{ color: "var(--color-primary)" }}>
              Bloomerie
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--color-secondary)" }}>
              © 2024 Bloomerie. Keindahan dalam Setiap Kelopak.
            </p>
          </div>

          {/* ── Link tengah ── */}
          <ul className="flex flex-wrap items-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Ikon kanan ── */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Share"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white hover:opacity-80 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="1.6">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
                <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
              </svg>
            </a>
            <a
              href="mailto:hello@bloomerie.com"
              aria-label="Email"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white hover:opacity-80 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="1.6">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
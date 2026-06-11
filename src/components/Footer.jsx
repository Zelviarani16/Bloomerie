"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6"
      style={{ background: "var(--ink)", borderTop: "1px solid rgba(139,26,43,0.3)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3
              className="font-display text-4xl text-[var(--cream)] mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              Bloomerie
            </h3>
            <p
              className="font-body text-xs leading-loose mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(253,246,240,0.5)", maxWidth: "280px" }}
            >
              Merangkai keindahan alam menjadi ekspresi perasaan yang tulus. 
              Florist premium Surabaya sejak 2020.
            </p>
            <div className="flex gap-4">
              {["Instagram", "WhatsApp", "TikTok"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[9px] tracking-[0.3em] uppercase font-body text-[var(--crimson-light)] hover:text-[var(--cream)] transition-colors border-b border-[var(--crimson)] pb-0.5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Toko", links: ["Katalog", "Buket Pernikahan", "Dekorasi", "Custom Order"] },
            { title: "Info", links: ["Tentang Kami", "Blog", "FAQ", "Kontak"] },
          ].map((col) => (
            <div key={col.title}>
              <h4
                className="font-body text-[10px] tracking-[0.4em] uppercase text-[var(--crimson-light)] mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="font-body text-xs text-[rgba(253,246,240,0.5)] hover:text-[var(--cream)] transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(139,26,43,0.2)" }}
        >
          <p
            className="font-body text-[10px] text-[rgba(253,246,240,0.3)]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            © 2025 Bloomerie. All rights reserved.
          </p>
          <p
            className="font-body text-[10px] text-[rgba(253,246,240,0.3)] italic"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Dibuat dengan ❤ di Surabaya
          </p>
        </div>
      </div>
    </footer>
  );
}
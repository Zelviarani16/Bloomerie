"use client";

/*
  HeroSection.jsx
  Sesuai design Figma: layout 2 kolom (teks kiri, foto kanan),
  background lembut pink-cream, eyebrow text kecil uppercase,
  headline 2 warna (hitam + primary maroon), 2 tombol CTA.

  Animasi pakai Framer Motion:
  - Teks kiri: fade-up bertahap (eyebrow -> headline -> paragraf -> button)
  - Foto kanan: fade-in dari kanan, sedikit delay dari teks
  - Tidak pakai random value apapun supaya tidak ada resiko hydration
    mismatch (pelajaran dari project sebelumnya)
*/

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Variant animasi dipisah jadi object supaya tidak duplikat kode di setiap elemen
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        // Gradasi lembut pink-cream sesuai screenshot Figma
        background: "linear-gradient(135deg, #FBF1F1 0%, #F8EDED 50%, #FAF6F2 100%)",
      }}
    >
      <div className="container-bloomerie grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">

        {/* ── Kolom kiri: teks ── */}
        <div>
          {/* Eyebrow text */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            Elegan &amp; Abadi
          </motion.p>

          {/* Headline 2 warna */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.1}
            className="font-bold leading-[1.15] mb-5"
            style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)", color: "var(--color-ink)" }}
          >
            Keindahan Alam dalam{" "}
            <span style={{ color: "var(--color-primary)" }}>Setiap Kelopak</span>
          </motion.h1>

          {/* Paragraf deskripsi */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
            className="text-base leading-relaxed mb-8 max-w-md"
            style={{ color: "var(--color-ink-soft)" }}
          >
            Kami mengkurasi bunga-bunga terbaik dari seluruh penjuru negeri
            untuk menciptakan rangkaian yang tidak hanya indah dipandang,
            tetapi juga menyentuh hati. Sempurna untuk setiap momen berharga
            Anda.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.3}
            className="flex flex-wrap gap-3"
          >
            <Link href="/katalog">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3 text-xs font-semibold tracking-[0.1em] uppercase rounded text-white transition-colors"
                style={{ background: "var(--color-primary)" }}
              >
                Jelajahi Koleksi
              </motion.button>
            </Link>

          </motion.div>
        </div>

        {/* ── Kolom kanan: foto buket ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md aspect-[4/5] rounded-lg overflow-hidden">
            {/*
              Ganti src ini dengan foto buket asli kamu.
              Taruh file di /public/images/hero-bouquet.jpg lalu pakai
              src="/images/hero-bouquet.jpg"
            */}
            <Image
              src="/images/hero-bouquet.png"
              alt="Buket bunga mawar pink dan lily putih"
              fill
              priority
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
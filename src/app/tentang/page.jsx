"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image"

// Komponen: animasi reveal saat masuk viewport
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  // once: true → animasi hanya sekali, tidak berulang saat scroll balik
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const TEAM = [
  { name: "Aisyah Putri",   role: "Head Florist",         initial: "AP", color: "#E8D8D0", image: "/images/aisyah.jpg" },
  { name: "Reza Firmansyah", role: "Creative Director",    initial: "RF", color: "#D0D8E8", image: "/images/rezabr.jpg" },
  { name: "Nadia Santoso",  role: "Customer Experience",   initial: "NS", color: "#D8E8D0", image: "/images/nadia.jpg" },
  { name: "Bima Wicaksono", role: "Logistics & Delivery",  initial: "BW", color: "#E8E0D0", image: "/images/bima.jpg" },
];

export default function TentangPage() {
  const heroRef = useRef(null);

  // Parallax: hero image bergerak lebih lambat dari scroll
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY   = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpa = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Hero dengan parallax ── */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ height: "80vh" }}>
        {/* Background parallax */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
            <Image
                src="/images/headingbr.jpg"
                alt="Heading Navbar"
                fill
                className="object-cover"
              />          
              
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,5,8,0.7) 0%, transparent 60%)" }}>
            {/* Dekorasi sementara */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg viewBox="0 0 300 300" className="w-96" fill="none">
                {[0,40,80,120,160,200,240,280,320].map((a,i) => (
                  <ellipse key={i} cx="150" cy="60" rx="28" ry="55"
                    fill="var(--crimson)" transform={`rotate(${a} 150 150)`} opacity="0.8"/>
                ))}
                <circle cx="150" cy="150" r="35" fill="white" opacity="0.4"/>
              </svg>
            </div>
            {/* Overlay gelap dari bawah supaya teks bisa dibaca */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,28,26,0.6) 0%, transparent 60%)" }} />
          </div>
        </motion.div>

        {/* Teks hero di atas gambar */}
        <motion.div
          style={{ opacity: heroOpa }}
          className="absolute bottom-0 left-0 right-0 p-10 md:p-16 max-w-7xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[11px] tracking-[0.15em] uppercase mb-3"
            style={{ color: "rgba(253,248,245,0.7)", fontFamily: "'DM Sans', sans-serif" }}
          >
            ✦ Tentang Bloomerie
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{
              fontFamily: "'Fraunces', serif",
              fontVariationSettings: "'opsz' 144",
              fontSize: "clamp(2.2rem,6vw,4rem)",
              color: "var(--cream)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Merangkai{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>
              momen
            </em>
            ,<br />satu kelopak satu kelopak.
          </motion.h1>
        </motion.div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">

        {/* Filosofi — dua kolom editorial */}
        <Reveal className="mb-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[11px] tracking-[0.15em] uppercase mb-4" style={{ color: "var(--crimson)", fontFamily: "'DM Sans', sans-serif" }}>
                Filosofi Kami
              </p>
              <h2 style={{
                fontFamily: "'Fraunces', serif",
                fontVariationSettings: "'opsz' 72",
                fontSize: "clamp(1.8rem,4vw,2.8rem)",
                color: "var(--ink)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
              }}>
                Lebih dari sekadar toko bunga.{" "}
                <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "var(--crimson)" }}>
                  Kami merangkai perasaan.
                </em>
              </h2>
            </div>
            <div className="pt-2 md:pt-10">
              <p className="text-[14px] leading-loose mb-5" style={{ color: "var(--stone)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8 }}>
                Bloomerie lahir dari keyakinan sederhana: bahwa setiap momen berharga layak dirayakan dengan keindahan yang tulus. Bukan sekadar buket yang cantik, tapi rangkaian yang bercerita.
              </p>
              <p className="text-[14px] leading-loose" style={{ color: "var(--stone)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8 }}>
                Kami bekerja sama langsung dengan petani bunga lokal di Jawa Timur, memastikan setiap tangkai dipetik segar dan dibawa ke tangan Anda dalam kondisi terbaik.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.1} className="mb-24">
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
          >
            {[
              { num: "2020",   label: "Tahun berdiri" },
              { num: "500+",   label: "Variasi bouquet" },
              { num: "10rb+",  label: "Pelanggan puas" },
              { num: "2 jam",  label: "Pengiriman kilat" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="py-8 px-6 text-center"
                style={{ borderRight: i < 3 ? "1px solid var(--border)" : "none" }}
              >
                <div style={{
                  fontFamily: "'Fraunces', serif",
                  fontVariationSettings: "'opsz' 144",
                  fontSize: "2.2rem",
                  color: "var(--crimson)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                }}>
                  {s.num}
                </div>
                <div className="text-[11px] tracking-[0.1em] uppercase mt-1" style={{ color: "var(--stone)", fontFamily: "'DM Sans', sans-serif" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Blockquote editorial */}


        <Reveal delay={0.1} className="mb-24 text-center max-w-2xl mx-auto">
          <p style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: "clamp(1.4rem,3vw,2rem)",
            color: "var(--ink)",
            lineHeight: 1.5,
          }}>
            "Bunga adalah bahasa diam yang berbicara langsung ke hati, melampaui kata-kata yang kadang tak cukup."
          </p>
          <span className="mt-4 block text-[11px] tracking-[0.15em] uppercase" style={{ color: "var(--stone-light)", fontFamily: "'DM Sans', sans-serif" }}>
            — Aisyah Putri, Head Florist
          </span>
        </Reveal>

        {/* Team */}
        <Reveal delay={0.1}>
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.15em] uppercase mb-3" style={{ color: "var(--crimson)", fontFamily: "'DM Sans', sans-serif" }}>
              Tim Kami
            </p>
            <h2 style={{
              fontFamily: "'Fraunces', serif",
              fontVariationSettings: "'opsz' 72",
              fontSize: "clamp(1.8rem,4vw,2.5rem)",
              color: "var(--ink)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
            }}>
              Orang-orang di balik{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "var(--crimson)" }}>
                setiap kelopak
              </em>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden cursor-pointer"
              >
                {/* Avatar area */}
                <div
                  className="relative mb-4"
                  style={{ background: member.color, aspectRatio: "3/4" }}
                >
                    {member.image && (
  <Image
    src={member.image}
    alt={member.name}
    fill
    className="object-cover"
  />
)}


                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-end p-4"
                    style={{ background: "rgba(28,28,26,0.5)" }}
                  >
                    <p className="text-[11px] tracking-[0.1em] uppercase" style={{ color: "var(--cream)", fontFamily: "'DM Sans', sans-serif" }}>
                      Lihat profil →
                    </p>
                  </motion.div>
                </div>

                {/* Nama & role */}
                <h3 style={{
                  fontFamily: "'Fraunces', serif",
                  fontVariationSettings: "'opsz' 40",
                  fontSize: "1rem",
                  color: "var(--ink)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}>
                  {member.name}
                </h3>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--stone)", fontFamily: "'DM Sans', sans-serif" }}>
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── CTA strip ── */}
      <section className="py-16 px-6" style={{ background: "var(--ink)" }}>
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Fraunces', serif",
                fontVariationSettings: "'opsz' 72",
                fontSize: "clamp(1.8rem,4vw,2.8rem)",
                color: "var(--cream)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
              }}
            >
              Siap menemukan bouquet{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "#C4828E" }}>
                sempurna?
              </em>
            </h2>
            <Link href="/katalog">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-3.5 text-[11px] tracking-[0.15em] uppercase"
                style={{
                  background: "var(--crimson)",
                  color: "white",
                  border: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                }}
              >
                Jelajahi Katalog
              </motion.button>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
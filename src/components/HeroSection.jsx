"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image"

const PETALS = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 6 + Math.random() * 7,
  size: 4 + Math.random() * 12,
  rotate: Math.random() * 360,
}));

const HEADLINE_WORDS = ["Keindahan", "Alam,", "Dikemas", "dengan", "Cinta."];

function FloatingPetal({ x, delay, duration, size, rotate }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0, x: `${x}vw`, rotate }}
      animate={{
        y: "110vh",
        opacity: [0, 0.6, 0.6, 0],
        rotate: rotate + 180,
        x: [`${x}vw`, `${x + (Math.random() - 0.5) * 8}vw`],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className="fixed top-0 pointer-events-none z-10"
      style={{ width: size, height: size }}
    >
      {/* kelopak */}
      <svg viewBox="0 0 24 24" fill="rgba(196,50,74,0.5)">
        <ellipse cx="12" cy="8" rx="5" ry="8" />
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  const [activeWord, setActiveWord] = useState(0);

  const rotatingWords = ["Cinta", "Keanggunan", "Kebahagiaan", "Kenangan"];
  useEffect(() => {
    const t = setInterval(() => {
      setActiveWord((p) => (p + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const charVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.05 * i + 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f0508 0%, #1e0c12 50%, #0f0508 100%)" }}
    >
      {/* Grain */}
      <div className="grain-overlay absolute inset-0 z-0" />

      {/* Radial light */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          y: y1,
          background: "radial-gradient(circle, rgba(139,26,43,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Floating petals */}
      {PETALS.map((p) => (
        <FloatingPetal key={p.id} {...p} />
      ))}

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-16 grid lg:grid-cols-2 gap-16 items-center"
      >
        {/* Left: Text */}
        <div>
          {/* eyebrow */}
          {/* <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-body text-[11px] tracking-[0.4em] text-[var(--crimson-light)] uppercase mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Florist Premium Surabaya
          </motion.p> */}

          {/* Big display headline */}
          <h1
            className="font-display leading-none mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {HEADLINE_WORDS.map((word, wi) => (
              <span key={wi} className="inline-block overflow-hidden mr-[0.15em]">
                <motion.span
                  className="inline-block"
                  custom={wi}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    fontSize: wi === 0 ? "clamp(3rem, 8vw, 6.5rem)" : "clamp(2.5rem, 7vw, 5.5rem)",
                    fontWeight: wi === 0 ? 700 : wi === 3 ? 300 : 400,
                    fontStyle: wi === 4 ? "italic" : "normal",
                    color: wi === 2 ? "var(--crimson-light)" : "var(--cream)",
                    display: "block",
                    lineHeight: 1.05,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Rotating word */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              className="!text-[var(--cream-mid)] font-display text-xl italic font-light leading-relaxed"
              style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", }}
            >
              Setiap buket bercerita tentang
            </span>
            <div className="w-40 h-8 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeWord}
                  initial={{ y: 32, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -32, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute font-display text-xl font-semibold text-[var(--crimson-light)]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {rotatingWords[activeWord]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/katalog">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden px-8 py-4 bg-[var(--crimson)] text-[var(--cream)] text-xs tracking-[0.25em] uppercase font-body"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="relative z-10">Jelajahi Katalog</span>
                <motion.div
                  className="absolute inset-0 bg-[var(--crimson-light)]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
            <Link href="/tentang">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 border border-[rgba(253,246,240,0.3)] text-[var(--cream)] text-xs tracking-[0.25em] uppercase font-body hover:border-[var(--crimson-light)] transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Tentang Kami
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats row */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex gap-8 mt-12 pt-8 border-t border-[rgba(139,26,43,0.3)]"
          >
            {[
              { n: "500+", label: "Bouquet Tersedia" },
              { n: "98%", label: "Kepuasan Pelanggan" },
              { n: "2 Jam", label: "Pengiriman Kilat" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-3xl font-display font-light text-[var(--crimson-light)]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {s.n}
                </div>
                <div
                  className="text-[10px] tracking-[0.2em] uppercase text-[rgba(253,246,240,0.5)] font-body mt-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div> */}
        </div>

        {/* Right: Image stack */}
        <motion.div style={{ y: y2 }} className="relative hidden lg:block h-[600px]">
          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="absolute right-0 top-8 w-72 h-96 rounded-sm overflow-hidden border border-[rgba(139,26,43,0.4)]"
            style={{ background: "linear-gradient(135deg, #3d0f1a, #5a1525)" }}
          >
            <Image
              src="/images/eternal-rose.jpg"
              alt="Hero atas eternal rose"
              fill
              className="object-cover"
            />
            <div className="w-full h-full flex items-end p-6" style={{ background: "linear-gradient(180deg, rgba(139,26,43,0.1) 0%, rgba(15,5,8,0.8) 100%)" }}>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[var(--rose)] font-body mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Unggulan</p>
                <p className="font-display text-xl text-[var(--cream)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Eternal Rose</p>
                <p className="font-display text-sm text-[var(--crimson-light)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Rp 250.000</p>
              </div>
            </div>
          </motion.div>

          {/* Secondary card */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -5 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="absolute left-0 bottom-12 w-56 h-72 rounded-sm overflow-hidden border border-[rgba(139,26,43,0.3)]"
            style={{ background: "linear-gradient(135deg, #1e0c12, #3d0f1a)" }}
          >
            <Image
              src="/images/pastel-dream.jpg"
              alt="Hero atas eternal rose"
              fill
              className="object-cover"
            />
            <div className="w-full h-full flex items-end p-5" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(15,5,8,0.85) 100%)" }}>
              <div>
                <p className="font-display text-lg text-[var(--cream)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Pastel Dream</p>
                <p className="font-display text-xs text-[var(--crimson-light)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Rp 185.000</p>
              </div>
            </div>
          </motion.div>

          {/* Badge */}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-[var(--crimson)] to-transparent"
        />
        <p className="text-[9px] tracking-[0.4em] uppercase text-[rgba(253,246,240,0.4)] font-body" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Scroll
        </p>
      </motion.div> */}
    </section>
  );
}
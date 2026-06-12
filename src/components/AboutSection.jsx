"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image"

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      {/* Big background letter */}
      <motion.div
        style={{ y }}
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 select-none pointer-events-none"
      >
        <span
          className="font-display font-bold"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(12rem, 25vw, 22rem)",
            color: "rgba(139,26,43,0.05)",
            lineHeight: 1,
          }}
        >
          B
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Left: Visual block */}
        <div className="relative">
          {/* Main block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Decorative frame */}
            <div
              className="aspect-square max-w-sm relative"
              style={{ background: "linear-gradient(135deg, var(--crimson-deep), var(--ink-mid))", border: "1px solid rgba(139,26,43,0.4)" }}
            >
              {/* Flower illustration placeholder */}
              <Image
                src="/images/tentang.jpg"
                alt="Tentang Bloomerie"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
              </div>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,5,8,0.7) 0%, transparent 60%)" }} />
            </div>

            {/* Offset quote card */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-8 -right-8 max-w-xs p-6"
              style={{ background: "var(--crimson-deep)", border: "1px solid rgba(139,26,43,0.5)" }}
            >
              <p
                className="font-display italic text-lg text-[var(--cream)] leading-relaxed"
                style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic" }}
              >
                "Setiap bunga memiliki bahasa tersendiri untuk mengungkapkan perasaan."
              </p>
              <span
                className="mt-3 block text-[9px] tracking-[0.3em] uppercase text-[var(--crimson-light)] font-body"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                — Bloomerie Studio
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Text */}
        <div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.15,
              color: "var(--cream)",
            }}
          >
            Lebih dari sekadar
            <br />
            <em style={{ color: "var(--crimson-light)" }}>toko bunga.</em>
            <br />
            Melainkan sebuah karya seni
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-body text-sm leading-loose mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "rgba(253,246,240,0.6)",
              lineHeight: 1.9,
            }}
          >
            Bloomerie hadir untuk merangkai momen berharga dalam setiap tangkai bunga. 
            Kami mempercayai bahwa keindahan alam dapat menjadi medium paling tulus 
            untuk mengungkapkan perasaan dari ucapan selamat hingga cinta.
          </motion.p>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              { title: "Bunga Segar Setiap Hari", desc: "Dipetik langsung dari kebun terbaik di Jawa Timur" },
              { title: "Desain Custom", desc: "Rangkaian yang dibuat sesuai keinginan dan anggaran Anda" },
              { title: "Pengiriman Surabaya", desc: "Jangkauan 2 jam ke seluruh wilayah Surabaya" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="w-8 h-px bg-[var(--crimson)] mt-3 flex-shrink-0" />
                <div>
                  <h4
                    className="font-body text-sm text-[var(--cream)] font-medium mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {f.title}
                  </h4>
                  <p
                    className="font-body text-xs"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(253,246,240,0.5)" }}
                  >
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
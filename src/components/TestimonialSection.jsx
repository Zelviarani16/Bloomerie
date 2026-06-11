"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sari Dewi",
    role: "Pengantin",
    text: "Buket pernikahan saya luar biasa indah. Tim Bloomerie benar-benar memahami visi saya dan mengubahnya menjadi karya yang melampaui ekspektasi.",
    rating: 5,
  },
  {
    id: 2,
    name: "Budi Santoso",
    role: "Pelanggan Setia",
    text: "Sudah 3 tahun jadi pelanggan. Kualitas bunga selalu konsisten dan pengiriman selalu tepat waktu. Sangat direkomendasikan!",
    rating: 5,
  },
  {
    id: 3,
    name: "Maya Putri",
    role: "Event Organizer",
    text: "Sering kerja sama untuk dekorasi event. Bloomerie selalu profesional, kreatif, dan fleksibel dengan kebutuhan klien kami.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      className="relative py-24 px-6"
      style={{ background: "var(--crimson-deep)" }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 30% 50%, var(--crimson-light) 0%, transparent 60%)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-body text-[10px] tracking-[0.4em] uppercase text-[var(--rose)] mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Kata Mereka
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-[var(--cream)]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            Kepuasan Pelanggan
            <br />
            <em>adalah Segalanya</em>
          </motion.h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="p-8 relative"
              style={{
                background: "rgba(15,5,8,0.5)",
                border: "1px solid rgba(253,246,240,0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Quote mark */}
              <div
                className="font-display text-7xl font-bold leading-none mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(196,50,74,0.3)" }}
              >
                "
              </div>

              <p
                className="font-display italic text-[var(--cream)] text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", lineHeight: 1.7 }}
              >
                {t.text}
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <svg key={si} viewBox="0 0 12 12" className="w-3 h-3" fill="var(--crimson-light)">
                    <polygon points="6,1 7.8,4.6 12,5.2 9,8.1 9.7,12.3 6,10.3 2.3,12.3 3,8.1 0,5.2 4.2,4.6" />
                  </svg>
                ))}
              </div>

              <div>
                <p
                  className="font-body text-sm font-medium text-[var(--cream)]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {t.name}
                </p>
                <p
                  className="font-body text-[10px] tracking-widest uppercase text-[var(--rose)]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
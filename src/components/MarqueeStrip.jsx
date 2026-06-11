"use client";

import { motion } from "framer-motion";

const items = [
  "Buket Pernikahan",
  "✦",
  "Hadiah Ulang Tahun",
  "✦",
  "Anniversary",
  "✦",
  "Dekorasi Event",
  "✦",
  "Wisuda",
  "✦",
  "Same-Day Delivery",
  "✦",
  "Pesan Custom",
  "✦",
];

export default function MarqueeStrip() {
  const repeated = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden border-y border-[rgba(139,26,43,0.4)] py-4"
      style={{ background: "var(--crimson-deep)" }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-display italic text-lg text-[var(--cream)] mx-6 flex-shrink-0"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontStyle: "italic",
              color: item === "✦" ? "var(--crimson-light)" : "var(--cream)",
              fontSize: item === "✦" ? "10px" : "inherit",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
"use client";

/*
  ProductGallery.jsx
  foto besar di atas, 4 thumbnail kecil di bawahnya.
  Klik thumbnail -> foto besar berganti (state lokal, simple).
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ProductGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {/* Foto besar */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4 bg-neutral-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex]}
              alt={`${productName} — foto ${activeIndex + 1}`}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.slice(0, 4).map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100"
            style={{
              outline: activeIndex === index ? "2px solid var(--color-primary)" : "2px solid transparent",
              outlineOffset: "2px",
            }}
          >
            <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />

            {/* Overlay "+N Foto" di thumbnail terakhir kalau ada lebih banyak foto */}
            {index === 3 && images.length > 4 && (
              <div
                className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                +{images.length - 4} Foto
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
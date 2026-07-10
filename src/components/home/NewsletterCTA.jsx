"use client";

/*
  NewsletterCTA.jsx
  Section paling bawah homepage (sebelum Footer).
  background solid primary (maroon), teks putih,
  heading + subtext di tengah, form input email + button "DAFTAR"
  sejajar (input putih, button lebih gelap dari background).

  Form pakai state lokal sederhana (belum connect ke backend/API
  apapun) — submit cuma simulasi sukses dengan menampilkan pesan.
  Nanti gampang diganti jadi fetch ke endpoint newsletter asli.
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Simulasi delay submit — ganti dengan fetch() ke API asli nanti
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 800);
  }

  return (
    <section className="py-16 lg:py-20" style={{ background: "var(--color-primary)" }}>
      <div className="container-bloomerie text-center">

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl lg:text-3xl font-bold text-white mb-3"
        >
          Bergabunglah dengan Bloomerie
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm mb-8 max-w-md mx-auto"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          Dapatkan penawaran eksklusif dan inspirasi dekorasi mingguan
          langsung di email Anda.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="Alamat email Anda"
            className="flex-1 px-4 py-3 text-sm rounded outline-none"
            style={{ background: "white", color: "var(--color-ink)" }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={status === "loading"}
            className="px-7 py-3 text-xs font-semibold tracking-[0.1em] uppercase rounded whitespace-nowrap disabled:opacity-60"
            style={{ background: "var(--color-primary-dark)", color: "white" }}
          >
            {status === "loading" ? "..." : "Daftar"}
          </motion.button>
        </motion.form>

        {/* Pesan status — muncul/hilang dengan animasi, tidak menggeser layout */}
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-xs mt-4"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              ✓ Terima kasih! Email Anda berhasil terdaftar.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-xs mt-4"
              style={{ color: "#FFD6D6" }}
            >
              Mohon masukkan alamat email yang valid.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
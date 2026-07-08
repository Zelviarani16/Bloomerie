"use client";

/*
  ArsipClient.jsx
  Komponen utama halaman Arsip Artikel
*/

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ArsipStats from "./ArsipStats";
import ArsipTable from "./ArsipTable";
import { daftarArsip, artikelStats } from "@/data/admin-artikel";

const ITEMS_PER_PAGE = 5;

export default function ArsipClient({ stats }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data berdasarkan search
  const filteredArsip = daftarArsip.filter((artikel) => {
    return (
      searchQuery === "" ||
      artikel.judul.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Pagination
  const paginatedArsip = filteredArsip.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRestore = (artikel) => {
    console.log("Restore artikel:", artikel);
    if (confirm(`Yakin ingin memulihkan artikel "${artikel.judul}"?`)) {
      alert(`Artikel "${artikel.judul}" berhasil dipulihkan`);
    }
  };

  const handleDelete = (artikel) => {
    console.log("Delete permanen artikel:", artikel);
    if (confirm(`PERHATIAN: Artikel "${artikel.judul}" akan dihapus PERMANEN dan tidak dapat dipulihkan!\n\nLanjutkan?`)) {
      alert(`Artikel "${artikel.judul}" dihapus permanen`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-4" style={{ color: "var(--color-secondary)" }}>
        <Link href="/admin/dashboard" className="hover:text-[var(--color-primary)] transition-colors">
          Admin
        </Link>
        <span>/</span>
        <Link href="/admin/artikel" className="hover:text-[var(--color-primary)] transition-colors">
          Kelola Artikel
        </Link>
        <span>/</span>
        <span style={{ color: "var(--color-ink)" }}>Arsip Artikel</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-ink)" }}>
          Arsip Artikel
        </h1>
        <p className="text-sm" style={{ color: "var(--color-secondary)" }}>
          Kelola artikel yang telah diarsipkan dari halaman utama.
        </p>
      </div>

      {/* Stats Cards */}
      <ArsipStats stats={stats} />

      {/* Search Bar */}
      <div className="mb-6 relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: "var(--color-secondary)" }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Cari di arsip..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full md:w-80 pl-11 pr-4 py-3 rounded-lg border text-sm outline-none transition-colors"
          style={{
            borderColor: "var(--color-neutral-dark)",
            background: "white",
            color: "var(--color-ink)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--color-primary)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--color-neutral-dark)";
          }}
        />
      </div>

      {/* Table with Alert */}
      <ArsipTable
        arsip={paginatedArsip}
        onRestore={handleRestore}
        onDelete={handleDelete}
        currentPage={currentPage}
        totalItems={filteredArsip.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </motion.div>
  );
}
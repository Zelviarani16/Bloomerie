"use client";

/*
  ArtikelClient.jsx
  Komponen utama halaman Kelola Artikel
  Menggabungkan: ArtikelStats, ArtikelToolbar, ArtikelTable
*/

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ArtikelStats from "./ArtikelStats";
import ArtikelToolbar from "./ArtikelToolbar";
import ArtikelTable from "./ArtikelTable";
import { daftarArtikel, STATUS_OPTIONS, KATEGORI_OPTIONS } from "@/data/admin-artikel";

const ITEMS_PER_PAGE = 5;

export default function ArtikelClient({ stats }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState(KATEGORI_OPTIONS[0]);
  const [statusFilter, setStatusFilter] = useState(STATUS_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data berdasarkan search, kategori, dan status
  const filteredArtikel = useMemo(() => {
    return daftarArtikel.filter((artikel) => {
      const matchesSearch =
        searchQuery === "" ||
        artikel.judul.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesKategori =
        kategoriFilter === "Semua Kategori" || artikel.kategori === kategoriFilter;

      const matchesStatus =
        statusFilter === "Semua Status" || artikel.status === statusFilter;

      return matchesSearch && matchesKategori && matchesStatus;
    });
  }, [searchQuery, kategoriFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredArtikel.length / ITEMS_PER_PAGE);
  const paginatedArtikel = filteredArtikel.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page saat filter berubah
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleKategoriChange = (kategori) => {
    setKategoriFilter(kategori);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Action handlers
  const handleEdit = (artikel) => {
    console.log("Edit artikel:", artikel);
    alert(`Edit: ${artikel.judul}`);
  };

  const handleDelete = (artikel) => {
    console.log("Delete artikel:", artikel);
    if (confirm(`Yakin ingin menghapus artikel "${artikel.judul}"?`)) {
      alert(`Artikel "${artikel.judul}" akan dipindahkan ke arsip`);
    }
  };

  const handleDownload = (artikel) => {
    console.log("Download artikel:", artikel);
    alert(`Mengunduh: ${artikel.judul}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-ink)" }}>
          Kelola Artikel
        </h1>
        <p className="text-sm" style={{ color: "var(--color-secondary)" }}>
          Kelola konten edukatif dan inspiratif Bloomerie untuk pelanggan Anda.
        </p>
      </div>

      {/* Stats Cards */}
      <ArtikelStats stats={stats} />

      {/* Toolbar */}
      <ArtikelToolbar
        onSearch={handleSearch}
        onKategoriChange={handleKategoriChange}
        onStatusChange={handleStatusChange}
        kategoriOptions={KATEGORI_OPTIONS}
        statusOptions={STATUS_OPTIONS}
      />

      {/* Table */}
      <ArtikelTable
        artikel={paginatedArtikel}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDownload={handleDownload}
        currentPage={currentPage}
        totalItems={filteredArtikel.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </motion.div>
  );
}

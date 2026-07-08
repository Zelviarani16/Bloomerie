"use client";

/*
  PelangganClient.jsx
  Komponen utama halaman Kelola Pelanggan
  Menggabungkan: PelangganStats, PelangganToolbar, PelangganTable
  Handle: search, filter status, pagination, actions
*/

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PelangganStats from "./PelangganStats";
import PelangganToolbar from "./PelangganToolbar";
import PelangganTable from "./PelangganTable";
import { daftarPelanggan, STATUS_OPTIONS } from "@/data/admin-pelanggan";

const ITEMS_PER_PAGE = 5;

export default function PelangganClient({ stats }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(STATUS_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data berdasarkan search dan status
  const filteredPelanggan = useMemo(() => {
    return daftarPelanggan.filter((pelanggan) => {
      // Filter search (nama atau email)
      const matchesSearch =
        searchQuery === "" ||
        pelanggan.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pelanggan.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter status
      const matchesStatus = statusFilter === "Semua Status" || pelanggan.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredPelanggan.length / ITEMS_PER_PAGE);
  const paginatedPelanggan = filteredPelanggan.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page saat filter berubah
  const handleSearch = (query) => {
    setSearchQuery(query);
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
  const handleEdit = (pelanggan) => {
    console.log("Edit pelanggan:", pelanggan);
    // TODO: Buka modal edit atau redirect ke halaman detail
    alert(`Edit: ${pelanggan.namaLengkap}`);
  };

  const handleToggleBlock = (pelanggan) => {
    console.log("Toggle block:", pelanggan);
    // TODO: Panggil API untuk block/unblock
    const action = pelanggan.status === "SUSPEN" ? "membuka blokir" : "memblokir";
    if (confirm(`Yakin ingin ${action} akun ${pelanggan.namaLengkap}?`)) {
      // TODO: Update status via API
      alert(`${pelanggan.status === "SUSPEN" ? "Blokir dibuka" : "Akun diblokir"} untuk ${pelanggan.namaLengkap}`);
    }
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
          Kelola Pengguna
        </h1>
        <p className="text-sm" style={{ color: "var(--color-secondary)" }}>
          Manajemen basis data pelanggan dan kontrol akses akun.
        </p>
      </div>

      {/* Stats Cards */}
      <PelangganStats stats={stats} />

      {/* Toolbar (Search + Filter) */}
      <PelangganToolbar
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        statusOptions={STATUS_OPTIONS}
      />

      {/* Table */}
      <PelangganTable
        pelanggan={paginatedPelanggan}
        onEdit={handleEdit}
        onToggleBlock={handleToggleBlock}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </motion.div>
  );
}
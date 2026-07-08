"use client";

/*
  ArtikelToolbar.jsx
  Search bar, filter dropdowns, action buttons, dan button tambah artikel baru
  Sesuai Figma: search, filter kategori, filter status, icon, button merah "Tambah Artikel Baru"
*/

import { useState } from "react";
import Link from "next/link";

export default function ArtikelToolbar({
  onSearch,
  onKategoriChange,
  onStatusChange,
  kategoriOptions,
  statusOptions,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedKategori, setSelectedKategori] = useState(kategoriOptions[0]);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleKategoriChange = (e) => {
    const value = e.target.value;
    setSelectedKategori(value);
    onKategoriChange(value);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSelectedStatus(value);
    onStatusChange(value);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Search Bar */}
      <div className="flex-1 min-w-[200px] relative">
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
          placeholder="Cari judul artikel..."
          value={searchValue}
          onChange={handleSearchChange}
          className="w-full pl-11 pr-4 py-3 rounded-lg border text-sm outline-none transition-colors"
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

      {/* Dropdown Kategori */}
      <select
        value={selectedKategori}
        onChange={handleKategoriChange}
        className="px-4 py-3 rounded-lg border text-sm outline-none cursor-pointer transition-colors min-w-[160px]"
        style={{
          borderColor: "var(--color-neutral-dark)",
          background: "white",
          color: "var(--color-ink)",
        }}
      >
        {kategoriOptions.map((kategori) => (
          <option key={kategori} value={kategori}>
            {kategori}
          </option>
        ))}
      </select>

      {/* Dropdown Status */}
      <select
        value={selectedStatus}
        onChange={handleStatusChange}
        className="px-4 py-3 rounded-lg border text-sm outline-none cursor-pointer transition-colors min-w-[140px]"
        style={{
          borderColor: "var(--color-neutral-dark)",
          background: "white",
          color: "var(--color-ink)",
        }}
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      {/* Filter/More Icon Button */}
      <button
        className="w-12 h-12 rounded-lg border flex items-center justify-center transition-colors"
        style={{
          borderColor: "var(--color-neutral-dark)",
          background: "white",
          color: "var(--color-secondary)",
        }}
        title="Filter Lainnya"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-primary)";
          e.currentTarget.style.color = "var(--color-primary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-neutral-dark)";
          e.currentTarget.style.color = "var(--color-secondary)";
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      </button>

      {/* Link ke Arsip */}
      <Link
        href="/admin/artikel/arsip"
        className="flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors"
        style={{
          borderColor: "var(--color-neutral-dark)",
          background: "white",
          color: "var(--color-secondary)",
        }}
        title="Arsip Artikel"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="21 8 21 21 3 21 3 8" />
          <rect x="1" y="3" width="22" height="5" />
          <line x1="10" y1="12" x2="14" y2="12" />
        </svg>
        Arsip
      </Link>

      {/* Tombol Tambah Artikel Baru */}
      <button
        className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white transition-colors"
        style={{ background: "var(--color-primary)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#B91C1C";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--color-primary)";
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Tambah Artikel Baru
      </button>
    </div>
  );
}

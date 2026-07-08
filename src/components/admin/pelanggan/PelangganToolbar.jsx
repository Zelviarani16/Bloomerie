"use client";

/*
  PelangganToolbar.jsx
  Sesuai Figma: search bar, dropdown filter status, icon filter, icon download
*/

import { useState } from "react";

export default function PelangganToolbar({ onSearch, onStatusChange, statusOptions }) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSelectedStatus(value);
    onStatusChange(value);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Search Bar */}
      <div className="flex-1 relative">
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
          placeholder="Cari nama atau email..."
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

      {/* Dropdown Status */}
      <select
        value={selectedStatus}
        onChange={handleStatusChange}
        className="px-4 py-3 rounded-lg border text-sm outline-none cursor-pointer transition-colors"
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

      {/* Filter Icon Button */}
      <button
        className="w-12 h-12 rounded-lg border flex items-center justify-center transition-colors"
        style={{
          borderColor: "var(--color-neutral-dark)",
          background: "white",
          color: "var(--color-secondary)",
        }}
        title="Filter"
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

      {/* Download Icon Button */}
      <button
        className="w-12 h-12 rounded-lg border flex items-center justify-center transition-colors"
        style={{
          borderColor: "var(--color-neutral-dark)",
          background: "white",
          color: "var(--color-secondary)",
        }}
        title="Unduh"
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
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>
    </div>
  );
}
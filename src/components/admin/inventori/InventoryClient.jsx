"use client";

/*
  InventoryClient.jsx
  "Otak" halaman Inventori — kelola search dan pagination.
  Pattern sama seperti KatalogClient / RiwayatClient sebelumnya.
*/

import { useState, useMemo } from "react";
import InventoryStats from "@/components/admin/inventori/InventoryStats";
import InventoryToolbar from "@/components/admin/inventori/InventoryToolbar";
import InventoryTable from "@/components/admin/inventori/InventoryTable";
import Pagination from "@/components/katalog/Pagination";
import { inventoryStats, inventoryProducts } from "@/data/admin-inventory";

const ITEMS_PER_PAGE = 10;

export default function InventoryClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return inventoryProducts;

    const query = searchQuery.trim().toLowerCase();
    return inventoryProducts.filter(
      (p) => p.name.toLowerCase().includes(query) || p.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleSearchChange(value) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-1.5" style={{ color: "var(--color-ink)" }}>
            Kelola Produk
          </h1>
          <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Pantau dan kelola inventaris bunga Bloomerie Anda.
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded text-white whitespace-nowrap"
          style={{ background: "var(--color-primary)" }}
        >
          + Tambah Produk Baru
        </button>
      </div>

      <InventoryStats stats={inventoryStats} />
      <InventoryToolbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <InventoryTable products={paginatedProducts} />

      <div className="flex items-center justify-between mt-5">
        <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
          Menampilkan {paginatedProducts.length} dari {filteredProducts.length} produk
        </p>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

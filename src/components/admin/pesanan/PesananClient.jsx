"use client";

/*
  PesananClient.jsx
  Halaman Kelola Transaksi untuk Admin
  - Pattern sama dengan InventoryClient
*/

import { useState, useMemo } from "react";
import TransactionStats from "@/components/admin/pesanan/TransactionStats";
import TransactionToolbar from "@/components/admin/pesanan/TransactionToolbar";
import TransactionTable from "@/components/admin/pesanan/TransactionTable";
import Pagination from "@/components/katalog/Pagination";
import { transactions } from "@/data/admin-transactions";

const ITEMS_PER_PAGE = 10;

export default function PesananClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return transactions;

    const query = searchQuery.trim().toLowerCase();
    return transactions.filter(
      (t) =>
        t.orderNumber.toLowerCase().includes(query) ||
        t.customerName.toLowerCase().includes(query) ||
        t.customerEmail.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE));
  const paginatedTransactions = filteredTransactions.slice(
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
            Kelola Transaksi
          </h1>
          <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Pantau dan verifikasi pesanan masuk secara real-time.
          </p>
        </div>
      </div>

      <TransactionStats />
      <TransactionToolbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <TransactionTable data={paginatedTransactions} />

      <div className="flex items-center justify-between mt-5">
        <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
          Menampilkan {paginatedTransactions.length} dari {filteredTransactions.length} pesanan
        </p>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

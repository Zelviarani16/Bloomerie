"use client";

/*
  PesananClient.jsx
  Halaman Kelola Transaksi - Update status pesanan
*/

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTransactions, updateTransactionStatus, getTransactionStats } from "@/data/store";
import TransactionStats from "./TransactionStats";
import TransactionToolbar from "./TransactionToolbar";
import Pagination from "@/components/katalog/Pagination";

const ITEMS_PER_PAGE = 10;

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "diproses", label: "Diproses" },
  { value: "dikirim", label: "Dikirim" },
  { value: "selesai", label: "Selesai" },
];

export default function PesananClient() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ totalPesanan: 0, pending: 0, diproses: 0, dikirim: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const loadData = () => {
    const data = getTransactions();
    setTransactions(data);
    setStats(getTransactionStats());
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = transactions;

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (t) =>
          t.orderNumber.toLowerCase().includes(query) ||
          t.customerName.toLowerCase().includes(query) ||
          t.customerEmail.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter((t) => t.status === filterStatus);
    }

    return result;
  }, [transactions, searchQuery, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE));
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (orderNumber, newStatus) => {
    updateTransactionStatus(orderNumber, newStatus);
    loadData();
  };

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

      <TransactionStats stats={stats} />
      <TransactionToolbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {/* Status Filter Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[
          { value: "all", label: "Semua" },
          { value: "pending", label: "Pending" },
          { value: "diproses", label: "Diproses" },
          { value: "dikirim", label: "Dikirim" },
          { value: "selesai", label: "Selesai" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => { setFilterStatus(tab.value); setCurrentPage(1); }}
            className="px-4 py-2 text-sm font-medium rounded-full transition-colors"
            style={{
              background: filterStatus === tab.value ? "var(--color-primary)" : "var(--color-neutral)",
              color: filterStatus === tab.value ? "white" : "var(--color-ink)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "var(--color-neutral-dark)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }}>
                {["No. Order", "Tanggal", "Pelanggan", "Status", "Bukti Bayar", "Aksi"].map((head) => (
                  <th key={head} className="text-left text-xs font-semibold tracking-wide uppercase py-3.5 px-4 whitespace-nowrap" style={{ color: "var(--color-secondary)" }}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <motion.tr
                  key={transaction.orderNumber}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "var(--color-neutral-dark)" }}
                >
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>#{transaction.orderNumber}</span>
                  </td>
                  <td className="py-4 px-4 text-sm whitespace-nowrap" style={{ color: "var(--color-ink)" }}>{transaction.date}</td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm font-medium whitespace-nowrap" style={{ color: "var(--color-ink)" }}>{transaction.customerName}</p>
                      <p className="text-xs" style={{ color: "var(--color-secondary)" }}>{transaction.customerEmail}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={transaction.status}
                      onChange={(e) => handleStatusChange(transaction.orderNumber, e.target.value)}
                      className="px-3 py-1.5 text-xs font-medium rounded-full border cursor-pointer outline-none"
                      style={{
                        background: transaction.status === "pending" ? "#FEE2E2" : transaction.status === "diproses" ? "#FEF3C7" : transaction.status === "dikirim" ? "#D1FAE5" : "#ECFDF5",
                        color: transaction.status === "pending" ? "#991B1B" : transaction.status === "diproses" ? "#92400E" : transaction.status === "dikirim" ? "#065F46" : "#059669",
                        borderColor: "transparent",
                      }}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    {transaction.proofImage ? (
                      <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-soft)" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </button>
                    ) : transaction.proofVerified ? (
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-xs" style={{ color: "#059669" }}>Verified</span>
                      </div>
                    ) : (
                      <span className="text-xs" style={{ color: "var(--color-secondary)" }}>-</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => setSelectedTransaction(transaction)}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedTransactions.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
              {filterStatus === "all" ? "Belum ada transaksi." : "Tidak ada transaksi dengan status ini."}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
          Menampilkan {paginatedTransactions.length} dari {filteredTransactions.length} transaksi
        </p>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedTransaction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTransaction(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-ink)" }}>
                Detail Transaksi #{selectedTransaction.orderNumber}
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-secondary)" }}>Pelanggan</span>
                  <span style={{ color: "var(--color-ink)" }}>{selectedTransaction.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-secondary)" }}>Email</span>
                  <span style={{ color: "var(--color-ink)" }}>{selectedTransaction.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-secondary)" }}>Tanggal</span>
                  <span style={{ color: "var(--color-ink)" }}>{selectedTransaction.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: "var(--color-secondary)" }}>Status</span>
                  <select
                    value={selectedTransaction.status}
                    onChange={(e) => {
                      handleStatusChange(selectedTransaction.orderNumber, e.target.value);
                      setSelectedTransaction({ ...selectedTransaction, status: e.target.value });
                    }}
                    className="px-3 py-1 text-xs font-medium rounded-full border outline-none"
                    style={{
                      background: selectedTransaction.status === "pending" ? "#FEE2E2" : selectedTransaction.status === "diproses" ? "#FEF3C7" : selectedTransaction.status === "dikirim" ? "#D1FAE5" : "#ECFDF5",
                      color: selectedTransaction.status === "pending" ? "#991B1B" : selectedTransaction.status === "diproses" ? "#92400E" : selectedTransaction.status === "dikirim" ? "#065F46" : "#059669",
                    }}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button onClick={() => setSelectedTransaction(null)} className="w-full mt-6 py-2.5 text-sm font-semibold rounded text-white" style={{ background: "var(--color-primary)" }}>
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

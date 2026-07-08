"use client";

/*
  RiwayatClient.jsx
  "Otak" halaman Riwayat Transaksi — kelola tab filter status,
  search by nomor pesanan, dan pagination. Pattern-nya sama seperti
  KatalogClient (semua state di satu tempat, komponen anak "dumb").
*/

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrderTabs from "@/components/riwayat/OrderTabs";
import OrderCard from "@/components/riwayat/OrderCard";
import Pagination from "@/components/katalog/Pagination";
import { orders } from "@/data/orders";

const ITEMS_PER_PAGE = 5;

export default function RiwayatClient() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    let result = orders;

    if (activeTab !== "all") {
      result = result.filter((o) => o.status === activeTab);
    }

    if (searchQuery.trim()) {
      result = result.filter((o) =>
        o.id.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }

    return result;
  }, [activeTab, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ITEMS_PER_PAGE));
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleTabChange(tab) {
    setActiveTab(tab);
    setCurrentPage(1);
  }

  return (
    <div className="container-bloomerie py-10 lg:py-12">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-1.5" style={{ color: "var(--color-ink)" }}>
          Riwayat Transaksi
        </h1>
        <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
          Pantau semua pesanan bunga Anda dalam satu tempat.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <OrderTabs active={activeTab} onChange={handleTabChange} />

        <div className="relative w-full sm:w-64">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-secondary)"
            strokeWidth="2"
            className="absolute left-3 top-1/2 -translate-y-1/2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari No. Pesanan..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded border outline-none"
            style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {paginatedOrders.length > 0 ? (
          <motion.div
            key={activeTab + searchQuery + currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            {paginatedOrders.map((order, index) => (
              <OrderCard key={order.id} order={order} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
              Tidak ada transaksi yang ditemukan.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
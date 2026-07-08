/*
  app/admin/dashboard/page.jsx — Dashboard Admin (/admin/dashboard)

  Sesuai Figma: heading + date picker + button "Tambah Produk" di
  header, 3 stat card, grid 2 kolom (chart kiri lebih besar, performa
  kategori kanan lebih kecil), tabel pesanan terbaru di bawah.

  AdminSidebar TIDAK ditulis di sini — sudah otomatis lewat
  app/admin/layout.jsx, sama seperti Navbar di halaman user.
*/

import StatCard from "@/components/admin/dashboard/StatCard";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import CategoryPerformance from "@/components/admin/dashboard/CategoryPerformance";
import RecentOrdersTable from "@/components/admin/dashboard/RecentOrdersTable";
import { formatRupiah } from "@/data/products";
import { dashboardStats, revenueChart, categoryPerformance, recentOrders } from "@/data/admin-dashboard";

export const metadata = {
  title: "Dashboard Admin — Bloomerie",
};

export default function AdminDashboardPage() {
  return (
    <div>
      {/* ── Header: heading + date picker + tombol ── */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-1.5" style={{ color: "var(--color-ink)" }}>
            Dashboard Utama
          </h1>
          <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Selamat datang kembali, berikut ringkasan performa hari ini.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2.5 text-sm rounded border"
            style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            JAN 2024
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded text-white whitespace-nowrap"
            style={{ background: "var(--color-primary)" }}
          >
            + Tambah Produk
          </button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <StatCard
          index={0}
          label="Total Penjualan"
          value={formatRupiah(dashboardStats.totalPenjualan)}
          subtext="Bulan ini dibandingkan bulan lalu"
          growth={dashboardStats.totalPenjualanGrowth}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          }
        />
        <StatCard
          index={1}
          label="Pesanan Baru"
          value={`${dashboardStats.pesananBaru} Pesanan`}
          subtext={`Menunggu diproses: ${dashboardStats.pesananMenunggu}`}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" />
            </svg>
          }
        />
        <StatCard
          index={2}
          label="Produk Aktif"
          value={`${dashboardStats.produkAktif} Katalog`}
          subtext={`${dashboardStats.stokHampirHabis} Stok hampir habis`}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          }
        />
      </div>

      {/* ── Chart + Performa kategori ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueChart} />
        </div>
        <CategoryPerformance categories={categoryPerformance} />
      </div>

      {/* ── Tabel pesanan terbaru ── */}
      <RecentOrdersTable orders={recentOrders} />
    </div>
  );
}

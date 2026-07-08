/*
  data/admin-dashboard.js
  Dummy data khusus dashboard admin — terpisah dari data/orders.js
  (yang dipakai user untuk riwayat transaksi sendiri) karena struktur
  datanya beda kebutuhan: dashboard butuh data pelanggan, kategori
  performa, dan tren harian yang tidak relevan untuk halaman user.
*/

export const dashboardStats = {
  totalPenjualan: 45280000,
  totalPenjualanGrowth: 12,
  pesananBaru: 142,
  pesananMenunggu: 18,
  produkAktif: 86,
  stokHampirHabis: 6,
};

// Data chart 7 hari terakhir — value = pendapatan aktual (warna gelap),
// height total bar = semacam "target" (warna pucat) untuk perbandingan visual
export const revenueChart = [
  { day: "Sen", value: 35, total: 60 },
  { day: "Sel", value: 42, total: 65 },
  { day: "Rab", value: 30, total: 55 },
  { day: "Kam", value: 58, total: 75 },
  { day: "Jum", value: 65, total: 78 },
  { day: "Sab", value: 75, total: 80, highlight: true },
  { day: "Min", value: 48, total: 70 },
];

export const categoryPerformance = [
  { name: "Buket Mawar", percentage: 42 },
  { name: "Bunga Papan", percentage: 28 },
  { name: "Dekorasi Meja", percentage: 15 },
  { name: "Lainnya", percentage: 15 },
];

export const STATUS_BADGE = {
  selesai: { label: "Selesai", bg: "#D1FAE5", color: "#065F46" },
  proses: { label: "Proses", bg: "#FCE7F3", color: "#9D174D" },
  menunggu: { label: "Menunggu", bg: "#F3F4F6", color: "#4B5563" },
};

export const recentOrders = [
  { id: "ORD-2841", customer: "Andi Nasution", initials: "AN", product: "Midnight Rose Bouquet", date: "24 Jan, 14:20", status: "selesai", total: 450000 },
  { id: "ORD-2842", customer: "Siti Lestari", initials: "SL", product: "Sunshine Lily Arrangement", date: "24 Jan, 15:05", status: "proses", total: 325000 },
  { id: "ORD-2843", customer: "Rian Kusuma", initials: "RK", product: "Grand Opening Flower Board", date: "24 Jan, 16:30", status: "menunggu", total: 1200000 },
];

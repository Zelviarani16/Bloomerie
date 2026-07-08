/*
  data/admin-transactions.js
  Dummy data untuk halaman Kelola Transaksi. Beda dari data/orders.js
  (riwayat transaksi milik user) — di sini ada field "proofImage"
  (bukti bayar) dan "verified" yang menentukan jenis aksi yang
  ditampilkan di kolom Aksi Verifikasi (lihat Figma: tombol beda-beda
  tergantung status — pending butuh approve/reject, diproses butuh
  "Kirim Paket", dikirim cuma bisa "Lacak Resi").
*/

export const transactionStats = {
  totalPesanan: 1284,
  totalPesananGrowth: 12,
  pending: 18,
  diproses: 42,
  dikirim: 125,
};

export const STATUS_BADGE = {
  pending: { label: "Pending", bg: "#FEE2E2", color: "#991B1B" },
  diproses: { label: "Diproses", bg: "#F3F4F6", color: "#4B5563" },
  dikirim: { label: "Dikirim", bg: "#D1FAE5", color: "#065F46" },
};

export const transactions = [
  {
    orderNumber: "BLM-92831",
    date: "24 Okt, 14:20",
    customerName: "Andini Larasati",
    customerEmail: "andini.l@gmail.com",
    status: "pending",
    proofImage: "/images/admin/proof-1.jpg",
    proofVerified: false,
  },
  {
    orderNumber: "BLM-92830",
    date: "24 Okt, 13:45",
    customerName: "Budi Santoso",
    customerEmail: "budi_88@yahoo.com",
    status: "diproses",
    proofImage: null,
    proofVerified: true,
  },
  {
    orderNumber: "BLM-92828",
    date: "24 Okt, 11:15",
    customerName: "Siti Aminah",
    customerEmail: "sitiaminah@outlook.com",
    status: "dikirim",
    proofImage: null,
    proofVerified: true,
  },
  {
    orderNumber: "BLM-92825",
    date: "24 Okt, 09:30",
    customerName: "Reza Artamev",
    customerEmail: "reza.art@gmail.com",
    status: "pending",
    proofImage: "/images/admin/proof-2.jpg",
    proofVerified: false,
  },
  {
    orderNumber: "BLM-92819",
    date: "23 Okt, 19:50",
    customerName: "Maya Putri",
    customerEmail: "maya.putri@gmail.com",
    status: "diproses",
    proofImage: null,
    proofVerified: true,
  },
];

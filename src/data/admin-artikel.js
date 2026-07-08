/*
  src/data/admin-artikel.js
  Data dummy untuk halaman Kelola Artikel dan Arsip Artikel (Admin)

  Sesuai Figma:
  - Kelola Artikel: Tabel dengan kolom Judul, Status, Kategori, Penulis, Tanggal, Aksi
  - Arsip Artikel: Tabel dengan kolom Judul, Tanggal Diarsipkan, Aksi
  - Status: Diterbitkan, Draft
  - Kategori: Tips Perawatan, Inspirasi Buket, Event & Promo, dll
*/

export const artikelStats = {
  totalArtikel: 12,
  artikelBulanIni: 3,
  totalArsip: 24,
  arsipBulanIni: 5,
  penyimpananArsip: "12.5 MB",
};

export const STATUS_OPTIONS = ["Semua Status", "Diterbitkan", "Draft"];

export const KATEGORI_OPTIONS = [
  "Semua Kategori",
  "Tips Perawatan",
  "Inspirasi Buket",
  "Event & Promo",
  "Inspirasi",
  "Tips & Trik",
  "Belanja",
  "Artikel Umum",
];

export const STATUS_BADGE = {
  Diterbitkan: { label: "Diterbitkan", dotColor: "#059669", textColor: "#065F46" },
  Draft: { label: "Draft", dotColor: "#9CA3AF", textColor: "#4B5563" },
};

export const daftarArtikel = [
  {
    id: 1,
    slug: "cara-jaga-mawar-segar",
    judul: "5 Cara Menjaga Mawar Tetap Segar",
    status: "Diterbitkan",
    kategori: "Tips Perawatan",
    penulis: "Sarah Amalia",
    tanggal: "24 Okt 2023",
    gambar: "/images/blog/dekorasi-pernikahan.webp",
  },
  {
    id: 2,
    slug: "tren-buket-2024",
    judul: "Tren Buket Pernikahan 2024",
    status: "Draft",
    kategori: "Inspirasi Buket",
    penulis: "Admin Utama",
    tanggal: "15 Nov 2023",
    gambar: "/images/blog/filosofi-warna.webp",
  },
  {
    id: 3,
    slug: "promo-akhir-tahun",
    judul: "Promo Spesial Akhir Tahun Bloomerie",
    status: "Diterbitkan",
    kategori: "Event & Promo",
    penulis: "Budi Darmawan",
    tanggal: "01 Des 2023",
    gambar: "/images/blog/dekorasi-pernikahan.webp",
  },
  {
    id: 4,
    slug: "artikel-contoh-4",
    judul: "Mengenal Bunga Krisan dan Perawatannya",
    status: "Diterbitkan",
    kategori: "Tips Perawatan",
    penulis: "Sarah Amalia",
    tanggal: "10 Des 2023",
    gambar: "/images/blog/filosofi-warna.webp",
  },
  {
    id: 5,
    slug: "artikel-contoh-5",
    judul: "Kombinasi Warna Buket yang Harmonis",
    status: "Draft",
    kategori: "Inspirasi Buket",
    penulis: "Rina Wijaya",
    tanggal: "20 Des 2023",
    gambar: "/images/blog/dekorasi-pernikahan.webp",
  },
  {
    id: 6,
    slug: "artikel-contoh-6",
    judul: "Cara Memilih Bunga untuk Ucapan Selamat",
    status: "Diterbitkan",
    kategori: "Belanja",
    penulis: "Ahmad Fauzi",
    tanggal: "05 Jan 2024",
    gambar: "/images/blog/filosofi-warna.webp",
  },
];

export const daftarArsip = [
  {
    id: 1,
    slug: "rahasia-mawar-summer",
    judul: "Rahasia Menjaga Kesegaran Bunga Mawar di Musim Panas",
    kategori: "Tips & Trik",
    tanggalDiarsipkan: "12 Oktober 2023",
    gambar: "/images/blog/dekorasi-pernikahan.webp",
  },
  {
    id: 2,
    slug: "dekorasi-minimalis-2023",
    judul: "Tren Dekorasi Pernikahan Minimalis 2023",
    kategori: "Inspirasi",
    tanggalDiarsipkan: "05 September 2023",
    gambar: "/images/blog/filosofi-warna.webp",
  },
  {
    id: 3,
    slug: "panduan-bunga-ucapan",
    judul: "Panduan Memilih Bunga untuk Ucapan Selamat",
    kategori: "Belanja",
    tanggalDiarsipkan: "28 Agustus 2023",
    gambar: "/images/blog/dekorasi-pernikahan.webp",
  },
  {
    id: 4,
    slug: "filosofi-anggrek",
    judul: "Filosofi Bunga Anggrek dalam Budaya Timur",
    kategori: "Artikel Umum",
    tanggalDiarsipkan: "15 Juli 2023",
    gambar: "/images/blog/filosofi-warna.webp",
  },
  {
    id: 5,
    slug: "contoh-arsip-5",
    judul: "Cara Membuat Bouquet Bunga Sendiri di Rumah",
    kategori: "Tips & Trik",
    tanggalDiarsipkan: "20 Juni 2023",
    gambar: "/images/blog/dekorasi-pernikahan.webp",
  },
];
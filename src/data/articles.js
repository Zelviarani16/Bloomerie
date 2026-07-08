/*
  data/articles.js
  Dummy data artikel blog untuk halaman /blog user

  Sesuai Figma:
  - Featured article (sorotan utama) di atas
  - Grid artikel dengan filter kategori: Semua, Tips Perawatan, Inspirasi Buket, Gaya Hidup, Event & Pernikahan
  - Card dengan thumbnail, tanggal, judul, excerpt, link "Baca Selengkapnya"
*/

export const CATEGORIES = [
  "Semua Artikel",
  "Tips Perawatan",
  "Inspirasi Buket",
  "Gaya Hidup",
  "Event & Pernikahan",
];

export const articles = [
  {
    id: 1,
    slug: "seni-merangkai-bunga-menciptakan-keharmonisan",
    title: "Seni Merangkai Bunga: Menciptakan Keharmonisan dalam Setiap Kelopak",
    excerpt:
      "Temukan rahasia di balik desain bunga klasik Bloomerie. Dari pemilihan warna yang harmonis hingga teknik pemotongan batang untuk menjaga kesegaran lebih lama.",
    image: "/images/blog/dekorasi-pernikahan.webp",
    date: "15 Jan 2024",
    dateRaw: "2024-01-15",
    category: "Inspirasi Buket",
    featured: true,
    readTime: "5 menit",
  },
  {
    id: 2,
    slug: "5-cara-menjaga-bunga-segar-di-rumah",
    title: "5 Cara Menjaga Bunga Segar di Rumah",
    excerpt:
      "Sering mendapati bunga Anda cepat layu? Ikuti langkah praktis ini untuk memperpanjang usia bunga potong Anda.",
    image: "/images/blog/tips-menjaga.jpg",
    date: "12 Januari 2024",
    dateRaw: "2024-01-12",
    category: "Tips Perawatan",
    featured: false,
    readTime: "4 menit",
  },
  {
    id: 3,
    slug: "tren-buket-pernikahan-minimalis-2024",
    title: "Tren Buket Pernikahan Minimalis 2024",
    excerpt:
      "Gaya 'Quiet Luxury' merambah dunia floral. Temukan inspirasi rangkaian bunga yang sederhana namun tetap memberikan kesan.",
    image: "/images/blog/dekorasi-pernikahan.webp",
    date: "08 Januari 2024",
    dateRaw: "2024-01-08",
    category: "Inspirasi Buket",
    featured: false,
    readTime: "6 menit",
  },
  {
    id: 4,
    slug: "bunga-sebagai-terapi-mengurangi-stres",
    title: "Bunga Sebagai Terapi: Mengurangi Stres di Kantor",
    excerpt:
      "Kehadiran tanaman dan bunga di ruang kerja terbukti meningkatkan produktivitas dan suasana hati. Simak pilihan bunga yang cocok.",
    image: "/images/blog/filosofi-warna.webp",
    date: "05 Januari 2024",
    dateRaw: "2024-01-05",
    category: "Gaya Hidup",
    featured: false,
    readTime: "5 menit",
  },
  {
    id: 5,
    slug: "makna-warna-bunga-dalam-mengekspresikan-cinta",
    title: "Makna Warna Bunga dalam Mengekspresikan Cinta",
    excerpt:
      "Setiap warna membawa pesan yang berbeda. Temukan arti di balik merah marun, putih, dan warna-warna lainnya dalam buket.",
    image: "/images/blog/filosofi-warna.webp",
    date: "02 Januari 2024",
    dateRaw: "2024-01-02",
    category: "Tips Perawatan",
    featured: false,
    readTime: "4 menit",
  },
  {
    id: 6,
    slug: "dekorasi-meja-natal-dengan-bunga",
    title: "Dekorasi Meja Natal dengan Sentuhan Bunga",
    excerpt:
      "Buat suasana Natal lebih hangat dengan kombinasi bunga poinsettia dan dekorasi meja yang elegan.",
    image: "/images/blog/dekorasi-pernikahan.webp",
    date: "25 Des 2023",
    dateRaw: "2023-12-25",
    category: "Event & Pernikahan",
    featured: false,
    readTime: "3 menit",
  },
];

// Get featured article
export const getFeaturedArticle = () => articles.find((a) => a.featured);

// Get articles by category
export const getArticlesByCategory = (category) => {
  if (category === "Semua Artikel") return articles.filter((a) => !a.featured);
  return articles.filter((a) => a.category === category && !a.featured);
};

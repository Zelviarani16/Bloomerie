/*
  data/articles.js
  Dummy data artikel blog — sama seperti products.js, ini sementara
  sebelum ada backend/CMS asli. Field "slug" dipakai untuk URL detail
  artikel nanti (/blog/cara-menjaga-buket-bunga-tetap-segar).
*/

export const articles = [
  {
    id: 1,
    slug: "cara-menjaga-buket-bunga-tetap-segar-selama-seminggu",
    category: "Tips Merawat",
    title: "Cara Menjaga Buket Bunga Tetap Segar Selama Seminggu",
    excerpt:
      "Pelajari teknik perendaman dan suhu ruangan yang tepat agar bunga Anda tidak layu terlalu cepat.",
    image: "/images/blog/tips-merawat.jpg",
    date: "12 Mar 2024",
    featured: true,
  },
  {
    id: 2,
    slug: "makna-warna-bunga-dalam-mengekspresikan-cinta",
    category: "Filosofi",
    title: "Makna Warna Bunga dalam Mengekspresikan Cinta",
    excerpt:
      "Setiap warna membawa pesan yang berbeda. Temukan arti di balik merah marun, putih, dan warna lainnya.",
    image: "/images/blog/filosofi-warna.jpg",
    date: "08 Mar 2024",
    featured: true,
  },
  {
    id: 3,
    slug: "inspirasi-dekorasi-pernikahan-minimalis-modern-2024",
    category: "Event",
    title: "Inspirasi Dekorasi Pernikahan Minimalis Modern 2024",
    excerpt:
      "Tren dekorasi tahun ini beralih ke desain yang lebih bersih dengan fokus pada detail kecil yang...",
    image: "/images/blog/dekorasi-pernikahan.jpg",
    date: "01 Mar 2024",
    featured: true,
  },
];
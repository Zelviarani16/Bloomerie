/*
  data/products.js
  Dummy data produk — dipakai sementara sebelum ada backend/API asli.
  Nanti kalau sudah ada backend, file ini gampang diganti jadi
  fungsi fetch ke endpoint, struktur datanya tetap sama jadi
  komponen yang sudah pakai data ini tidak perlu diubah banyak.

  Field tambahan untuk halaman Katalog:
  - category: dipakai filter sidebar (harus salah satu dari CATEGORIES di bawah)
  - rating, reviews: ditampilkan di card + dipakai filter rating
  - description: teks pendek di bawah nama produk (lihat screenshot Katalog)
*/

export const CATEGORIES = ["Buket Mawar", "Buket Lily", "Buket Bunga Kering", "Anggrek Tropis"];

/*
  Field tambahan untuk halaman Detail Produk (/produk/[slug]):
  - badge: label kecil di atas nama produk ("Terlaris", "Baru", dst)
  - gallery: array foto untuk thumbnail (foto pertama = foto utama)
  - sizes: pilihan ukuran buket, ada flag "default" untuk yang terpilih awal
  - careNotes: 3 poin checklist di section "Detail Produk & Perawatan"
  - careTip: teks di box abu-abu "Tips Perawatan"
  Produk yang belum punya field ini akan otomatis dilengkapi nilai
  default lewat fungsi getProductBySlug() di bawah, supaya halaman
  detail tidak error kalau buka produk lama yang datanya belum lengkap.
*/

export const products = [
  {
    id: 1,
    slug: "morning-dew",
    name: "Morning Dew",
    price: 280000,
    image: "/images/products/morning-dew.jpg",
    category: "Buket Mawar",
    description: "Premium Pink Roses & Lilies",
    rating: 4.9,
    reviews: 120,
    featured: true,
    badge: "Terlaris",
    longDescription:
      "Simbol keanggunan yang abadi. Rangkaian mawar pink premium dipadukan lily putih yang lembut, dirangkai khusus untuk momen-momen yang paling berkesan.",
    gallery: [
      "/images/products/morning-dew.jpg",
      "/images/products/morning-dew-2.jpg",
      "/images/products/morning-dew-3.jpg",
      "/images/products/morning-dew-4.jpg",
    ],
    sizes: [
      { label: "Petit (5 Tangkai)", priceOffset: -80000 },
      { label: "Standard (12 Tangkai)", priceOffset: 0, default: true },
      { label: "Deluxe (24 Tangkai)", priceOffset: 150000 },
      { label: "Grand (50 Tangkai)", priceOffset: 400000 },
    ],
    careNotes: [
      "Mawar dan lily pilihan dengan kelopak yang segar.",
      "Aroma alami yang lembut dan menenangkan.",
      "Tahan hingga 5-7 hari dengan perawatan yang tepat.",
    ],
    careTip:
      "Potong ujung batang secara miring (45 derajat) setiap 2 hari. Letakkan dalam vas dengan air bersih dan hindari paparan sinar matahari langsung.",
  },
  {
    id: 2,
    slug: "velvet-crimson",
    name: "Velvet Crimson",
    price: 420000,
    image: "/images/products/velvet-crimson.jpg",
    category: "Buket Mawar",
    description: "Deep Red Roses & Lisianthus",
    rating: 4.8,
    reviews: 154,
    featured: true,
  },
  {
    id: 3,
    slug: "ethereal-clouds",
    name: "Ethereal Clouds",
    price: 310000,
    image: "/images/products/ethereal-clouds.jpg",
    category: "Buket Bunga Kering",
    description: "Dried Pampas & Cotton",
    rating: 4.7,
    reviews: 92,
    featured: true,
  },
  {
    id: 4,
    slug: "sunny-whisper",
    name: "Sunny Whisper",
    price: 149000,
    image: "/images/products/sunny-whisper.jpg",
    category: "Buket Lily",
    description: "Sunflowers & Daisies",
    rating: 4.7,
    reviews: 92,
    featured: false,
  },
  {
    id: 5,
    slug: "pastel-dream",
    name: "Pastel Dream",
    price: 320000,
    image: "/images/products/pastel-dream.jpg",
    category: "Anggrek Tropis",
    description: "Peonies & Hydrangeas",
    rating: 5.0,
    reviews: 42,
    featured: false,
    badge: "Baru",
  },
  {
    id: 6,
    slug: "midnight-serenade",
    name: "Midnight Serenade",
    price: 170000,
    image: "/images/products/midnight-serenade.jpg",
    category: "Buket Mawar",
    description: "Deep Red Roses & Lisianthus",
    rating: 4.8,
    reviews: 154,
    featured: false,
  },
  {
    id: 7,
    slug: "blush-romance",
    name: "Blush Romance",
    price: 249000,
    image: "/images/products/blush-romance.jpg",
    category: "Buket Mawar",
    description: "Premium Pink Roses & Lilies",
    rating: 4.9,
    reviews: 120,
    featured: false,
  },
  {
    id: 8,
    slug: "golden-sands-dried",
    name: "Golden Sands Dried",
    price: 295000,
    image: "/images/products/golden-sands-dried.jpg",
    category: "Buket Bunga Kering",
    description: "Dried Pampas & Eucalyptus",
    rating: 4.6,
    reviews: 67,
    featured: false,
  },
];

// Helper: format angka jadi "Rp 280.000"
export function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

/*
  getProductBySlug — ambil 1 produk berdasarkan slug, sekaligus
  melengkapi field yang mungkin belum ada (gallery, sizes, careNotes,
  dst) dengan nilai default. Ini supaya produk lama yang datanya
  belum lengkap tetap bisa dibuka halaman detailnya tanpa error.
*/
export function getProductBySlug(slug) {
  const product = products.find((p) => p.slug === slug);
  if (!product) return null;

  return {
    longDescription: product.description,
    gallery: [product.image],
    sizes: [{ label: "Standard", priceOffset: 0, default: true }],
    careNotes: [
      "Bunga segar pilihan, dipetik langsung dari kebun terbaik.",
      "Dirangkai dengan teliti oleh florist berpengalaman.",
      "Tahan hingga 5-7 hari dengan perawatan yang tepat.",
    ],
    careTip:
      "Potong ujung batang secara miring setiap 2 hari dan letakkan di tempat sejuk, hindari sinar matahari langsung.",
    ...product, // field asli produk selalu menimpa default di atas
  };
}

/*
  getRelatedProducts — ambil produk lain (exclude produk saat ini),
  maksimal 4, diutamakan dari kategori yang sama dulu.
*/
export function getRelatedProducts(currentSlug, limit = 4) {
  const current = products.find((p) => p.slug === currentSlug);
  const others = products.filter((p) => p.slug !== currentSlug);

  if (!current) return others.slice(0, limit);

  const sameCategory = others.filter((p) => p.category === current.category);
  const different = others.filter((p) => p.category !== current.category);

  return [...sameCategory, ...different].slice(0, limit);
}
/*
  data/admin-inventory.js
  Dummy data inventori — terpisah dari data/products.js (yang dipakai
  halaman user/katalog publik) karena field yang dibutuhkan beda:
  admin perlu kode ID produk (#BLM-001), jumlah stok aktual, dan
  status (AKTIF/DRAFT) yang tidak relevan ditampilkan ke pembeli.
*/

export const inventoryStats = {
  totalProduk: 124,
  stokRendah: 8,
  kategori: 12,
  produkAKTIF: 112,
};

export const STOCK_THRESHOLD = 5; // di bawah angka ini dianggap "stok rendah" dan diberi warna merah

export const STATUS_BADGE = {
  AKTIF: { label: "AKTIF", dotColor: "#059669", textColor: "#065F46" },
  DRAFT: { label: "DRAFT", dotColor: "#9CA3AF", textColor: "#4B5563" },
};

export const inventoryProducts = [
  {
    id: "BLM-001",
    name: "Mawar Merah Premium",
    image: "/images/products/velvet-crimson.jpg",
    category: "Bouquet",
    price: 450000,
    stock: 24,
    status: "AKTIF",
  },
  {
    id: "BLM-002",
    name: "Lily Putih Elegan",
    image: "/images/products/ethereal-clouds.jpg",
    category: "Vas",
    price: 320000,
    stock: 3,
    status: "AKTIF",
  },
  {
    id: "BLM-003",
    name: "Dekorasi Meja Natal",
    image: "/images/products/pastel-dream.jpg",
    category: "Musiman",
    price: 580000,
    stock: 0,
    status: "DRAFT",
  },
  {
    id: "BLM-004",
    name: "Peony Pink Lembut",
    image: "/images/products/blush-romance.jpg",
    category: "Bouquet",
    price: 650000,
    stock: 15,
    status: "AKTIF",
  },
  {
    id: "BLM-005",
    name: "Morning Dew",
    image: "/images/products/morning-dew.jpg",
    category: "Bouquet",
    price: 280000,
    stock: 18,
    status: "AKTIF",
  },
  {
    id: "BLM-006",
    name: "Sunny Whisper",
    image: "/images/products/sunny-whisper.webp",
    category: "Bouquet",
    price: 149000,
    stock: 2,
    status: "AKTIF",
  },
  {
    id: "BLM-007",
    name: "Golden Sands Dried",
    image: "/images/products/golden-sands.webp",
    category: "Vas",
    price: 295000,
    stock: 9,
    status: "DRAFT",
  },
  {
    id: "BLM-008",
    name: "Midnight Serenade",
    image: "/images/products/midnight-serenade.jpg",
    category: "Bouquet",
    price: 170000,
    stock: 0,
    status: "DRAFT",
  },
];

export const CATEGORIES_ADMIN = ["Bouquet", "Vas", "Musiman"];

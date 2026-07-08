/*
  data/orders.js
  Dummy data riwayat transaksi — sementara sebelum ada backend asli.
  Status mengikuti 3 kategori di tab filter Figma: menunggu, dikirim,
  selesai. Field "items" array karena 1 pesanan bisa berisi >1 produk
  (lihat baris pertama di Figma: "Midnight Bouquet dan 2 lainnya").
*/

export const orders = [
  {
    id: "BLM-98231",
    date: "12 Okt 2023",
    status: "selesai",
    items: [{ name: "Midnight Bouquet", image: "/images/products/velvet-crimson.jpg" }],
    extraItemsCount: 2,
    total: 450000,
  },
  {
    id: "BLM-98552",
    date: "15 Okt 2023",
    status: "menunggu",
    items: [{ name: "Serenity White Orchid", image: "/images/products/ethereal-clouds.jpg" }],
    extraItemsCount: 0,
    total: 275000,
  },
  {
    id: "BLM-98987",
    date: "18 Okt 2023",
    status: "dikirim",
    items: [{ name: "Golden Spring Tulips", image: "/images/products/sunny-whisper.webp" }],
    extraItemsCount: 0,
    total: 300000,
  },
  {
    id: "BLM-99102",
    date: "20 Okt 2023",
    status: "selesai",
    items: [{ name: "Morning Dew", image: "/images/products/morning-dew.jpg" }],
    extraItemsCount: 1,
    total: 560000,
  },
];

export const STATUS_LABELS = {
  menunggu: { label: "Menunggu", color: "#92400E", bg: "#FEF3C7" },
  dikirim: { label: "Dikirim", color: "#1E40AF", bg: "#DBEAFE" },
  selesai: { label: "Selesai", color: "#065F46", bg: "#D1FAE5" },
};
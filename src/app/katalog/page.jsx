/*
  app/katalog/page.jsx — Halaman Katalog (/katalog)

  File ini sengaja simpel — cuma render KatalogClient. Server Component
  (file ini) dipisah dari Client Component (KatalogClient.jsx) supaya
  nanti kalau perlu metadata SEO per halaman, generateMetadata bisa
  ditaruh di sini tanpa konflik dengan "use client".
*/

import KatalogClient from "@/components/katalog/KatalogClient";

export const metadata = {
  title: "Katalog | Bloomerie",
  description: "Jelajahi koleksi lengkap buket bunga Bloomerie.",
};

export default function KatalogPage() {
  return <KatalogClient />;
}
/*
  app/admin/artikel/page.jsx
  Halaman Kelola Artikel untuk Admin
*/

import ArtikelClient from "@/components/admin/artikel/ArtikelClient";

export const metadata = {
  title: "Kelola Artikel | Bloomerie Admin",
  description: "Kelola konten edukatif dan inspiratif Bloomerie untuk pelanggan Anda",
};

export default function ArtikelPage() {
  return <ArtikelClient />;
}

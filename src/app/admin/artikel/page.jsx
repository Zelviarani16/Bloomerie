/*
  app/admin/artikel/page.jsx
  Halaman Kelola Artikel untuk Admin

  Sesuai Figma:
  - Header: "Kelola Artikel" + subtitle
  - 2 Stat Cards: Total Artikel, Artikel Bulan Ini
  - Search + filter kategori + filter status + icon + link arsip + button tambah
  - Tabel dengan data artikel + pagination
*/

import ArtikelClient from "@/components/admin/artikel/ArtikelClient";
import { artikelStats } from "@/data/admin-artikel";

export const metadata = {
  title: "Kelola Artikel | Bloomerie Admin",
  description: "Kelola konten edukatif dan inspiratif Bloomerie untuk pelanggan Anda",
};

export default function ArtikelPage() {
  return <ArtikelClient stats={artikelStats} />;
}

/*
  app/admin/artikel/arsip/page.jsx
  Halaman Arsip Artikel untuk Admin

  - Breadcrumb: Admin / Kelola Artikel / Arsip Artikel
  - Header: "Arsip Artikel" + subtitle
  - 3 Stat Cards: Total Arsip, Bulan Ini, Penyimpanan
  - Search bar
  - Tabel arsip dengan action buttons
  - Alert box penting
*/

import ArsipClient from "@/components/admin/artikel/arsip/ArsipClient";
import { artikelStats } from "@/data/admin-artikel";

export const metadata = {
  title: "Arsip Artikel | Bloomerie Admin",
  description: "Kelola artikel yang telah diarsipkan dari halaman utama",
};

export default function ArsipPage() {
  return (
    <ArsipClient
      stats={{
        totalArsip: artikelStats.totalArsip,
        arsipBulanIni: artikelStats.arsipBulanIni,
        penyimpananArsip: artikelStats.penyimpananArsip,
      }}
    />
  );
}
/*
  app/admin/pelanggan/page.jsx
  Halaman Kelola Pelanggan untuk Admin

  Sesuai Figma:
  - Header: "Kelola Pengguna" + subtitle deskripsi
  - 3 Stat Cards: Total Pengguna, User Baru, Pengguna Disuspend
  - Search bar + dropdown status + filter + download icons
  - Tabel dengan data pelanggan + pagination
*/

import PelangganClient from "@/components/admin/pelanggan/PelangganClient";
import { pelangganStats } from "@/data/admin-pelanggan";

export const metadata = {
  title: "Kelola Pelanggan | Bloomerie Admin",
  description: "Manajemen basis data pelanggan dan kontrol akses akun",
};

export default function PelangganPage() {
  return <PelangganClient stats={pelangganStats} />;
}

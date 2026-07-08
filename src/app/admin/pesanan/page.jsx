/*
  app/admin/pesanan/page.jsx — Halaman Kelola Transaksi (/admin/pesanan)
*/

import PesananClient from "@/components/admin/pesanan/PesananClient";

export const metadata = {
  title: "Kelola Transaksi — Bloomerie Admin",
};

export default function PesananPage() {
  return <PesananClient />;
}

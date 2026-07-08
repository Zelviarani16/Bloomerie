/*
  app/admin/inventori/page.jsx — Halaman Kelola Produk (/admin/inventori)
*/

import InventoryClient from "@/components/admin/inventori/InventoryClient";

export const metadata = {
  title: "Kelola Produk — Bloomerie Admin",
};

export default function InventoriPage() {
  return <InventoryClient />;
}

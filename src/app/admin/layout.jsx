/*
  app/admin/layout.jsx
  Layout khusus untuk SEMUA halaman di bawah /admin/* — Next.js App
  Router otomatis menerapkan layout ini ke semua route turunannya
  (admin/dashboard, admin/inventori, dst) tanpa perlu import manual
  di tiap page.jsx.

  Ini terpisah dari root layout.jsx (yang isinya Navbar+Footer publik)
  — karena Navbar+Footer sudah di-set return null di halaman /admin/*
  (lihat Navbar.jsx & Footer.jsx), maka AdminSidebar di sini jadi
  satu-satunya navigasi yang muncul.
*/

import AdminSidebar from "@/components/admin/layout/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex" style={{ background: "var(--color-neutral)", minHeight: "100vh" }}>
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}

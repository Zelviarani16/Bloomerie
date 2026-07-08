/*
  app/register/page.jsx
  Halaman Register untuk user baru
*/

import RegisterClient from "@/components/auth/RegisterClient";

export const metadata = {
  title: "Daftar | Bloomerie",
  description: "Buat akun baru di Bloomerie untuk pengalaman belanja yang lebih baik",
};

export default function RegisterPage() {
  return <RegisterClient />;
}

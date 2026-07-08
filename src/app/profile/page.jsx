/*
  app/profile/page.jsx
  Halaman Profil User

  - Tampilkan data user (nama, email, telepon, alamat)
  - Tombol edit profil
  - Link ke riwayat transaksi & wishlist
  - Tombol logout
*/

import ProfileClient from "@/components/profile/ProfileClient";

export const metadata = {
  title: "Profil Saya | Bloomerie",
  description: "Kelola informasi akun dan pengaturan privasi Anda",
};

export default function ProfilePage() {
  return <ProfileClient />;
}

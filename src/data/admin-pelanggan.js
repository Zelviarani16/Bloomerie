/*
  src/data/admin-pelanggan.js
  Data dummy untuk halaman Kelola Pelanggan (Admin)

  - Tabel dengan kolom: Nama Pelanggan, Email, Tanggal Bergabung, Status, Aksi
  - 3 statistik: Total Pengguna, User Baru (Bulan Ini), Pengguna Disuspend
  - Status: AKTIF, SUSPEN
*/

export const pelangganStats = {
  totalPengguna: 2840,
  userBaruBulanIni: 124,
  penggunaDisuspend: 12,
};

export const daftarPelanggan = [
  {
    id: 1,
    nama: "SM Siti Maryam",
    namaLengkap: "Siti Maryam",
    email: "siti.maryam@email.com",
    tanggalBergabung: "12 Okt 2023",
    tanggalBergabungRaw: new Date("2023-10-12"),
    status: "AKTIF",
    verified: true,
  },
  {
    id: 2,
    nama: "BP Budi Pratama",
    namaLengkap: "Budi Pratama",
    email: "budi.p@provider.id",
    tanggalBergabung: "05 Nov 2023",
    tanggalBergabungRaw: new Date("2023-11-05"),
    status: "AKTIF",
    verified: true,
  },
  {
    id: 3,
    nama: "AH Amelia Hasan",
    namaLengkap: "Amelia Hasan",
    email: "amelia_h@domain.com",
    tanggalBergabung: "22 Des 2023",
    tanggalBergabungRaw: new Date("2023-12-22"),
    status: "SUSPEN",
    verified: true,
  },
  {
    id: 4,
    nama: "DW Deni Wijaya",
    namaLengkap: "Deni Wijaya",
    email: "deni.wijaya@webmail.com",
    tanggalBergabung: "10 Jan 2025",
    tanggalBergabungRaw: new Date("2025-01-10"),
    status: "AKTIF",
    verified: true,
  },
  {
    id: 5,
    nama: "RL Rini Lestari",
    namaLengkap: "Rini Lestari",
    email: "rini.les@email.com",
    tanggalBergabung: "15 Jan 2025",
    tanggalBergabungRaw: new Date("2025-01-15"),
    status: "AKTIF",
    verified: true,
  },
  {
    id: 6,
    nama: "NW Nova Wahyu",
    namaLengkap: "Nova Wahyu",
    email: "nova.wahyu@email.com",
    tanggalBergabung: "20 Jan 2025",
    tanggalBergabungRaw: new Date("2025-01-20"),
    status: "AKTIF",
    verified: false,
  },
  {
    id: 7,
    nama: "FA Farhan Ahmad",
    namaLengkap: "Farhan Ahmad",
    email: "farhan.ahmad@gmail.com",
    tanggalBergabung: "25 Jan 2025",
    tanggalBergabungRaw: new Date("2025-01-25"),
    status: "SUSPEN",
    verified: true,
  },
  {
    id: 8,
    nama: "SK Sari Kurniati",
    namaLengkap: "Sari Kurniati",
    email: "sari.k@email.com",
    tanggalBergabung: "01 Feb 2025",
    tanggalBergabungRaw: new Date("2025-02-01"),
    status: "AKTIF",
    verified: true,
  },
];

export const STATUS_OPTIONS = ["Semua Status", "AKTIF", "SUSPEN"];

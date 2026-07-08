# SRS - Bloomerie Toko Buket Online

## 1. Pendahuluan

### 1.1 Tujuan Dokumen
Dokumen ini berisi spesifikasi persyaratan perangkat lunak untuk aplikasi web **Bloomerie - Toko Buket Online**, yang mencakup semua fitur, fungsionalitas, dan kebutuhan pengguna.

### 1.2 Lingkup Produk
Bloomerie adalah aplikasi e-commerce specializing dalam penjualan buket bunga online. Aplikasi ini menyediakan platform untuk pengguna melihat katalog produk, melakukan pemesanan, dan mengelola akun mereka. Sementara itu, admin dapat mengelola inventori, pesanan, pelanggan, dan artikel blog.

### 1.3 Definisi & Akronim
| Istilah | Deskripsi |
|---------|----------|
| SRS | Software Requirements Specification |
| User | Pengguna umum yang memesan buket |
| Admin | Manajer toko yang mengelola toko |
| CMS | Content Management System |
| Framer | Platform CMS untuk blog eksternal |

---

## 2. Deskripsi Keseluruhan

### 2.1 Perspektif Produk
Bloomerie adalah aplikasi web Next.js dengan arsitektur terpisah antara frontend user dan admin panel.

### 2.2 Karakteristik Pengguna

| Tipe Pengguna | Deskripsi |
|---------------|-----------|
| **Guest** | Pengguna yang belum login, dapat melihat katalog dan blog |
| **User** | Pengguna yang sudah register/login, dapat memesan dan melihat riwayat |
| **Admin** | Manajer toko dengan akses penuh ke dashboard admin |

### 2.3 Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                      BROWSER                                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   /         │    │  /admin/*  │    │ /login      │     │
│  │  Beranda    │    │  Dashboard │    │ /register   │     │
│  │  Katalog    │    │  Admin     │    │ /profile    │     │
│  │  Blog       │    │  Panel     │    │ /keranjang  │     │
│  │  Keranjang  │    │            │    │             │     │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘     │
│         │                   │                   │            │
│         └───────────────────┼───────────────────┘            │
│                             │                               │
│                    ┌────────▼────────┐                      │
│                    │  AuthContext   │                      │
│                    │  (JWT/Cookie)  │                      │
│                    └────────┬────────┘                      │
│                             │                               │
│         ┌───────────────────┼───────────────────┐          │
│         │                   │                   │          │
│  ┌──────▼──────┐    ┌───────▼───────┐    ┌──────▼──────┐  │
│  │  localStorage │   │   Middleware   │    │ Framer CMS  │  │
│  │  (Client)   │    │  (Route Guard) │    │  (Blog)     │  │
│  └─────────────┘    └───────────────┘    └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Kebutuhan Fungsional

### 3.1 Kebutuhan User (Pengguna Umum)

#### 3.1.1 Autentikasi

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| AUTH-001 | Guest dapat melakukan register dengan nama, email, dan password | Wajib |
| AUTH-002 | User dapat login dengan email dan password | Wajib |
| AUTH-003 | User dapat logout dari akun mereka | Wajib |
| AUTH-004 | Guest yang belum login diarahkan ke halaman login saat mengakses /profile | Wajib |

#### 3.1.2 Katalog Produk

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| CAT-001 | User dapat melihat daftar semua produk buket | Wajib |
| CAT-002 | Produk ditampilkan dengan gambar, nama, harga, dan kategori | Wajib |
| CAT-003 | User dapat melihat detail produk | Wajib |
| CAT-004 | Produk memiliki opsi kustomisasi (warna, ukuran, kartu ucapan) | Opsional |

#### 3.1.3 Keranjang Belanja

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| CART-001 | User dapat menambahkan produk ke keranjang | Wajib |
| CART-002 | User dapat melihat isi keranjang | Wajib |
| CART-003 | User dapat mengubah jumlah produk di keranjang | Wajib |
| CART-004 | User dapat menghapus produk dari keranjang | Wajib |
| CART-005 | Keranjang ditampilkan di navbar dengan jumlah item | Wajib |

#### 3.1.4 Checkout & Pemesanan

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| CHECK-001 | User dapat checkout dari keranjang | Wajib |
| CHECK-002 | User dapat mengisi data pengiriman (nama, alamat, telepon) | Wajib |
| CHECK-003 | User dapat memilih metode pembayaran | Wajib |
| CHECK-004 | User menerima konfirmasi setelah下单 berhasil | Wajib |
| CHECK-005 | User dapat mengunggah bukti transfer | Wajib |

#### 3.1.5 Profil & Riwayat

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| PROFILE-001 | User dapat melihat data profil mereka | Wajib |
| PROFILE-002 | User dapat mengedit data profil (nama, email, telepon, alamat) | Wajib |
| PROFILE-003 | User dapat melihat riwayat transaksi | Wajib |
| PROFILE-004 | User dapat melihat status pesanan | Wajib |

#### 3.1.6 Blog

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| BLOG-001 | User dapat melihat daftar artikel blog | Wajib |
| BLOG-002 | Artikel memiliki kategori dan tanggal | Wajib |
| BLOG-003 | Klik artikel mengalihkan ke Framer CMS (https://homely-lifecycle-872486.framer.app/) | Wajib |

---

### 3.2 Kebutuhan Admin (Manajer Toko)

#### 3.2.1 Dashboard Admin

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| ADMIN-001 | Admin dapat melihat statistik penjualan | Wajib |
| ADMIN-002 | Admin dapat melihat pesanan terbaru | Wajib |
| ADMIN-003 | Admin dapat melihat ringkasan inventori | Wajib |

#### 3.2.2 Manajemen Inventori

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| INV-001 | Admin dapat melihat daftar produk | Wajib |
| INV-002 | Admin dapat menambah produk baru | Wajib |
| INV-003 | Admin dapat mengedit data produk | Wajib |
| INV-004 | Admin dapat menghapus produk | Wajib |
| INV-005 | Admin dapat mengatur stok produk | Wajib |

#### 3.2.3 Manajemen Pesanan

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| ORD-001 | Admin dapat melihat semua pesanan | Wajib |
| ORD-002 | Admin dapat melihat detail pesanan | Wajib |
| ORD-003 | Admin dapat mengubah status pesanan | Wajib |
| ORD-004 | Status pesanan: Menunggu Pembayaran, Diproses, Dikirim, Selesai | Wajib |

#### 3.2.4 Manajemen Pelanggan

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| CUST-001 | Admin dapat melihat daftar pelanggan | Wajib |
| CUST-002 | Admin dapat melihat detail pelanggan | Wajib |

#### 3.2.5 Manajemen Artikel Blog

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| ART-001 | Admin dapat melihat daftar artikel | Wajib |
| ART-002 | Admin dapat membuat artikel baru | Wajib |
| ART-003 | Admin dapat mengedit artikel | Wajib |
| ART-004 | Admin dapat menghapus artikel | Wajib |

#### 3.2.6 Proteksi Route Admin

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| ADMIN-PROT-001 | Hanya admin yang dapat mengakses /admin/* | Wajib |
| ADMIN-PROT-002 | User biasa yang mengakses /admin/* diarahkan ke homepage | Wajib |
| ADMIN-PROT-003 | Guest yang mengakses /admin/* diarahkan ke login | Wajib |

---

## 4. Kebutuhan Non-Fungsional

### 4.1 Performa
| Parameter | Target |
|-----------|--------|
| Waktu loading halaman | < 3 detik |
| Responsif untuk mobile | Ya |
| Browser support | Chrome, Firefox, Safari, Edge (modern) |

### 4.2 Keamanan
| Parameter | Implementasi |
|-----------|--------------|
| Proteksi route | Middleware Next.js |
| Session management | localStorage + Cookie |
| Password storage | Plain text (demo), bcrypt (production) |

### 4.3 Teknologi

| Komponen | Teknologi |
|---------|-----------|
| Frontend Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animasi | Framer Motion |
| State Management | React Context |
| Icons | Lucide React |
| Blog CMS | Framer (Eksternal) |
| Database | localStorage (demo) |

---

## 5. Struktur Navigasi

### 5.1 User Pages (Public)

```
/ (Beranda)
├── /katalog (Daftar Produk)
├── /katalog/[slug] (Detail Produk)
├── /blog (Daftar Artikel) → redirect ke Framer CMS
├── /keranjang
├── /checkout
├── /checkout/konfirmasi
├── /login
├── /register
├── /profile (Harus login)
└── /riwayat-transaksi (Harus login)
```

### 5.2 Admin Pages (Protected)

```
/admin
├── /admin/dashboard
├── /admin/inventori
├── /admin/pesanan
├── /admin/pelanggan
├── /admin/artikel
├── /admin/artikel/arsip
└── /admin/pengaturan
```

---

## 6. Data Model

### 6.1 User
```javascript
{
  id: number,
  email: string,
  password: string,
  nama: string,
  role: "user" | "admin",
  telepon: string,
  alamat: string,
  tanggalBergabung: string
}
```

### 6.2 Product
```javascript
{
  id: number,
  name: string,
  slug: string,
  price: number,
  category: string,
  image: string,
  description: string,
  stock: number
}
```

### 6.3 Order
```javascript
{
  id: string,
  userId: number,
  items: Array<{productId, quantity, price}>,
  totalAmount: number,
  status: "menunggu" | "diproses" | "dikirim" | "selesai",
  shippingAddress: string,
  paymentMethod: string,
  createdAt: string
}
```

### 6.4 Article
```javascript
{
  id: number,
  slug: string,
  title: string,
  excerpt: string,
  content: string,
  image: string,
  category: string,
  date: string
}
```

---

## 7. Akun Demo

| Role | Email | Password |
|------|-------|----------|
| User | user@bloomerie.com | user123 |
| Admin | admin@bloomerie.com | admin123 |

---

## 8. Batasan (Constraints)

1. **Blog Integration**: Artikel blog dikelola di Framer CMS eksternal, tidak ada CRUD dari aplikasi ini
2. **Payment**: Belum ada integrasi payment gateway - hanya upload bukti transfer
3. **Database**: Menggunakan localStorage untuk demo - tidak persist di server
4. **Email**: Tidak ada fitur kirim email notifikasi

---

## 9. Appendix

### 9.1 Link Eksternal
- Blog CMS: https://homely-lifecycle-872486.framer.app/

### 9.2 Color Palette
| Variable | Value |
|----------|-------|
| --color-primary | #6B4C9A (Purple) |
| --color-secondary | #9B7BB8 |
| --color-tertiary | #D32F2F (Red) |
| --color-ink | #1F2937 |
| --color-neutral | #F5F5F5 |

---

**Versi Dokumen**: 1.0  
**Tanggal**: 8 Juli 2026  
**Status**: Draft

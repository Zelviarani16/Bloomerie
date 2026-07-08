# LAPORAN PROYEK
## APLIKASI BLOOMERIE - TOKO BUKET ONLINE

---

**Disusun untuk memenuhi tugas proyek mata kuliah**  
**Rekayasa Perangkat Lunak**

**Disusun oleh:**  
Zelviarani  
Program Studi Informatika

**Tanggal:** Juli 2026

---

## DAFTAR ISI

## BAB 1 PENDAHULUAN
## BAB 2 DESAIN SISTEM

---

## BAB 1 PENDAHULUAN

### 1.1 Latar Belakang

Perkembangan teknologi e-commerce di Indonesia terus mengalami peningkatan yang signifikan, terutama dalam sektor flora dan tanaman hias. Masyarakat kini semakin terbiasa dengan pembelian online yang menawarkan kemudahan dan kenyamanan dalam bertransaksi. Menginjak这个机会, Bloomerie hadir sebagai platform e-commerce specializing dalam penjualan buket bunga online yang memberikan pengalaman belanja yang menyenangkan dan mudah bagi pengguna.

Bloomerie dirancang untuk memenuhi kebutuhan pengguna yang ingin memesan buket bunga untuk berbagai keperluan seperti hadiah ulang tahun, anniversary, wisuda, maupun momen spesial lainnya. Dengan fitur-fitur yang lengkap seperti katalog produk, keranjang belanja, checkout, dan sistem autentikasi, aplikasi ini diharapkan dapat memberikan pengalaman belanja yang intuitif dan menyenangkan.

### 1.2 Rumusan Masalah

Berdasarkan latar belakang yang telah diuraikan, rumusan masalah dalam proyek ini adalah sebagai berikut:

1. Bagaimana merancang dan membangun aplikasi e-commerce untuk penjualan buket bunga online?
2. Bagaimana mengimplementasikan sistem autentikasi untuk pengguna dan admin?
3. Bagaimana merancang tampilan antarmuka yang user-friendly dan responsif?
4. Bagaimana memastikan keamanan route pada panel admin?

### 1.3 Tujuan Proyek

Tujuan dari proyek ini adalah:

1. Membangun aplikasi e-commerce Bloomerie menggunakan Next.js
2. Mengimplementasikan sistem autentikasi dan otorisasi untuk pengguna dan admin
3. Merancang antarmuka yang intuitif dan responsif menggunakan Tailwind CSS
4. Mengimplementasikan proteksi route untuk panel admin

### 1.4 Lingkup Proyek

Proyek ini mencakup pengembangan aplikasi web dengan fitur-fitur berikut:

**Untuk Pengguna (User):**
- Landing page dengan hero section dan preview produk
- Katalog produk dengan filter kategori
- Detail produk dengan informasi lengkap
- Keranjang belanja
- Proses checkout dan konfirmasi pembayaran
- Autentikasi (Register & Login)
- Profil pengguna dengan edit data
- Riwayat transaksi
- Blog dengan integrasi Framer CMS

**Untuk Admin:**
- Dashboard dengan statistik
- Manajemen inventori produk
- Manajemen pesanan
- Manajemen pelanggan
- Manajemen artikel

### 1.5 Manfaat Proyek

Manfaat yang dapat diperoleh dari proyek ini adalah:

1. **Bagi pengguna:** Memudahkan dalam memilih dan memesan buket bunga secara online
2. **Bagi admin:** Memudahkan dalam mengelola toko, produk, dan pesanan
3. **Bagi developer:** Menjadi referensi dalam pengembangan aplikasi e-commerce menggunakan Next.js

### 1.6 sistematika Penulisan

Laporan ini disusun dengan sistematika sebagai berikut:

- **BAB 1:** Pendahuluan berisi latar belakang, rumusan masalah, tujuan, lingkup, dan manfaat proyek
- **BAB 2:** Desain Sistem mencakup wireframe, implementasi front-end, dan pengujian sistem

---

## BAB 2 DESAIN SISTEM

### 2.1 Wireframe

Wireframe disusun sebagai rancangan awal tata letak (layout) setiap halaman sebelum masuk ke tahap desain antarmuka bertampilan penuh (high-fidelity). Wireframe berfungsi untuk menentukan struktur, hierarki informasi, dan penempatan elemen pada tiap halaman tanpa memperhatikan aspek visual seperti warna dan tipografi.

[Catatan: bagian ini akan dilengkapi dengan gambar wireframe (kerangka hitam-putih) yang menyusul, mencakup keseluruhan alur halaman sesuai daftar pada Sub-bab 2.2.]

### 2.2 Front End

Berikut merupakan hasil implementasi desain antarmuka (front-end) aplikasi Bloomerie yang telah dikembangkan menggunakan Next.js untuk sisi pengguna publik dan panel admin, disesuaikan dengan hasil rancangan pada tahap wireframe.

#### 2.2.1 Landing Page (Halaman Beranda)

Landing page merupakan halaman pertama yang ditampilkan kepada pengguna saat mengakses aplikasi Bloomerie. Halaman ini menampilkan hero section dengan citra visual bertema bunga yang mencerminkan identitas brand, dilengkapi dengan navigasi utama menuju halaman Katalog, Blog, serta ajakan bertindak (call-to-action) untuk mengarahkan pengguna menjelajahi produk. Pada bagian ini juga terdapat preview produk, blog preview, dan footer yang memuat informasi kontak serta tautan lainnya.

Implementasi halaman ini menggunakan komponen React dengan Tailwind CSS untuk styling dan Framer Motion untuk animasi transisi. Navbar bersifat sticky dengan logo Bloomerie di sebelah kiri, menu navigasi di tengah (Beranda, Katalog, Blog), dan ikon akun serta tombol keranjang di sebelah kanan. Keranjang menampilkan badge jumlah item yang diambil dari CartContext.

**File:** `src/app/page.jsx`, `src/components/home/HeroSection.jsx`, `src/components/home/ProductPreview.jsx`, `src/components/home/BlogPreview.jsx`

```
Gambar 2.1 Halaman Landing Page
[Landing page screenshot]
```

#### 2.2.2 Halaman Katalog Produk

Halaman Katalog Produk menampilkan seluruh produk bunga yang dijual oleh Bloomerie dalam bentuk grid, dilengkapi dengan gambar produk, nama, harga, serta fitur filter berdasarkan kategori untuk membantu pengguna menemukan produk yang diinginkan dengan cepat.

Pengguna dapat melihat detail produk dengan mengklik kartu produk yang akan mengarahkan ke halaman detail produk. Setiap kartu produk menampilkan gambar, nama, harga dalam format Rupiah, dan tombol "Tambah ke Keranjang".

**File:** `src/app/katalog/page.jsx`, `src/components/katalog/ProductGrid.jsx`, `src/components/katalog/CategoryFilter.jsx`

```
Gambar 2.2 Halaman Katalog Produk
[Katalog screenshot]
```

#### 2.2.3 Halaman Detail Produk

Halaman Detail Produk menampilkan informasi lengkap mengenai satu produk yang dipilih, meliputi galeri gambar, nama produk, deskripsi, harga, pilihan varian (warna dan ukuran), serta tombol untuk menambahkan produk ke keranjang belanja.

Pengguna dapat memilih jumlah produk yang diinginkan sebelum menambahkan ke keranjang. Tombol "Masukkan Keranjang" akan menambahkan produk beserta variant yang dipilih ke CartContext.

**File:** `src/app/katalog/[slug]/page.jsx`, `src/components/katalog/ProductDetail.jsx`

```
Gambar 2.3 Halaman Detail Produk
[Detail produk screenshot]
```

#### 2.2.4 Halaman Blog / Artikel

Halaman Blog/Artikel menampilkan daftar artikel yang dipublikasikan oleh Bloomerie dalam bentuk grid, lengkap dengan thumbnail gambar, kategori, judul, cuplikan (excerpt), dan tanggal publikasi pada setiap kartu artikel. Halaman ini bertujuan memberikan edukasi dan konten bernilai tambah bagi pengguna terkait dunia botani dan perawatan bunga.

Setiap kartu artikel memiliki tiga area yang dapat diklik (gambar, judul, dan tombol "Baca Selengkapnya") yang semuanya mengarah ke CMS Framer eksternal (https://homely-lifecycle-872486.framer.app/) untuk menampilkan konten artikel lengkap.

**File:** `src/app/blog/page.jsx`, `src/components/blog/BlogClient.jsx`, `src/components/blog/FeaturedSection.jsx`, `src/components/blog/ArticleGrid.jsx`, `src/components/blog/ArticleCard.jsx`, `src/components/blog/CategoryFilter.jsx`

```
Gambar 2.4 Halaman Blog / Artikel
[Blog screenshot]
```

#### 2.2.5 Halaman Register

Halaman Register digunakan oleh pengguna baru untuk membuat akun pada aplikasi Bloomerie. Formulir pendaftaran memuat input nama lengkap, alamat email, kata sandi, dan konfirmasi kata sandi, beserta validasi input untuk memastikan data yang dimasukkan pengguna valid sebelum akun berhasil dibuat.

Setelah registrasi berhasil, pengguna akan diarahkan ke halaman login untuk melakukan login pertama kali. Sistem menyimpan data pengguna yang baru terdaftar ke localStorage.

**File:** `src/app/register/page.jsx`, `src/components/auth/RegisterClient.jsx`

```
Gambar 2.5 Halaman Register
[Register screenshot]
```

#### 2.2.6 Halaman Login

Halaman Login memungkinkan pengguna yang telah memiliki akun untuk masuk ke dalam sistem menggunakan email dan kata sandi yang telah terdaftar. Halaman ini juga menyediakan tautan menuju halaman Register bagi pengguna baru dan fitur lupa kata sandi bagi pengguna yang tidak dapat mengingat kredensialnya.

Setelah login berhasil, sistem akan mengarahkan pengguna berdasarkan role:
- **User biasa** → diarahkan ke halaman Beranda
- **Admin** → diarahkan ke Dashboard Admin

**File:** `src/app/login/page.jsx`

```
Gambar 2.6 Halaman Login
[Login screenshot]
```

#### 2.2.7 Halaman Keranjang

Halaman Keranjang menampilkan daftar produk yang telah ditambahkan oleh pengguna, lengkap dengan gambar produk, nama, harga per item, quantity selector, subtotal harga, serta opsi untuk mengubah kuantitas atau menghapus produk sebelum melanjutkan ke proses pembayaran.

Pengguna dapat melanjutkan ke checkout dengan mengklik tombol "Lanjut ke Checkout" yang tersedia di bagian bawah halaman.

**File:** `src/app/keranjang/page.jsx`, `src/components/keranjang/CartClient.jsx`

```
Gambar 2.7 Halaman Keranjang
[Keranjang screenshot]
```

#### 2.2.8 Halaman Checkout

Halaman Checkout merupakan tahap akhir proses checkout, menampilkan ringkasan pesanan, formulir alamat pengiriman (nama lengkap, alamat lengkap, nomor telepon), pilihan metode pembayaran, serta total biaya yang harus dibayarkan pengguna sebelum transaksi dikonfirmasi.

Setelah pengguna mengisi formulir dan mengkonfirmasi checkout, sistem akan menyimpan data pesanan dan mengarahkan pengguna ke halaman konfirmasi.

**File:** `src/app/checkout/page.jsx`, `src/components/checkout/CheckoutClient.jsx`

```
Gambar 2.8 Halaman Checkout
[Checkout screenshot]
```

#### 2.2.9 Halaman Konfirmasi Pembayaran

Halaman Konfirmasi Pembayaran ditampilkan setelah pengguna berhasil checkout. Pada halaman ini, pengguna diminta untuk mengunggah bukti transfer sebagai konfirmasi pembayaran. Sistem menampilkan nomor rekening tujuan dan instruksi pembayaran.

**File:** `src/app/checkout/konfirmasi/page.jsx`

```
Gambar 2.9 Halaman Konfirmasi Pembayaran
[Konfirmasi screenshot]
```

#### 2.2.10 Halaman Profile

Halaman Profile menampilkan informasi akun pengguna yang sedang login, meliputi data diri (nama, email, telepon, alamat, tanggal bergabung). Melalui halaman ini pengguna dapat memperbarui informasi pribadinya dengan mengklik tombol "Edit Profil". Pengguna juga dapat mengakses menu riwayat transaksi dan logout melalui halaman ini.

Halaman ini diproteksi menggunakan middleware - pengguna yang belum login akan otomatis diarahkan ke halaman login.

**File:** `src/app/profile/page.jsx`, `src/components/profile/ProfileClient.jsx`

```
Gambar 2.10 Halaman Profile
[Profile screenshot]
```

#### 2.2.11 Halaman Riwayat Transaksi

Halaman History/Riwayat Transaksi menampilkan daftar seluruh transaksi yang pernah dilakukan oleh pengguna, meliputi tanggal transaksi, status pesanan (Menunggu Pembayaran, Diproses, Dikirim, Selesai), dan total pembayaran, sehingga pengguna dapat memantau riwayat pembeliannya.

Terdapat tab filter berdasarkan status pesanan untuk memudahkan pengguna dalam mencari transaksi tertentu.

**File:** `src/app/riwayat-transaksi/page.jsx`, `src/components/riwayat/RiwayatClient.jsx`, `src/components/riwayat/OrderTabs.jsx`, `src/components/riwayat/OrderCard.jsx`

```
Gambar 2.11 Halaman Riwayat Transaksi
[Riwayat screenshot]
```

#### 2.2.12 Dashboard Admin

Halaman Dashboard Admin merupakan halaman utama bagi admin setelah login, menampilkan ringkasan statistik operasional toko seperti jumlah pesanan, produk, dan pelanggan, sebagai gambaran umum kondisi bisnis secara cepat.

Dashboard juga menampilkan grafik transaksi dan daftar pesanan terbaru yang perlu diproses.

**File:** `src/app/admin/dashboard/page.jsx`, `src/data/admin-dashboard.js`

```
Gambar 2.12 Halaman Dashboard Admin
[Dashboard admin screenshot]
```

#### 2.2.13 Halaman Kelola Inventori (Produk)

Halaman Kelola Inventori memungkinkan admin mengelola data produk yang dijual, meliputi penambahan produk baru, pengubahan detail produk seperti harga, deskripsi, gambar, dan stok, serta penghapusan produk dari katalog.

Halaman ini menampilkan tabel daftar produk dengan fitur search dan pagination.

**File:** `src/app/admin/inventori/page.jsx`, `src/data/admin-inventory.js`

```
Gambar 2.13 Halaman Kelola Inventori
[Inventori screenshot]
```

#### 2.2.14 Halaman Kelola Pesanan

Halaman Kelola Pesanan digunakan admin untuk memantau dan mengelola seluruh transaksi yang masuk, termasuk memperbarui status pesanan (Menunggu Pembayaran, Diproses, Dikirim, Selesai) serta meninjau detail setiap transaksi pelanggan.

**File:** `src/app/admin/pesanan/page.jsx`, `src/data/admin-transactions.js`

```
Gambar 2.14 Halaman Kelola Pesanan
[Pesanan screenshot]
```

#### 2.2.15 Halaman Kelola Pelanggan

Halaman Kelola Pelanggan menampilkan daftar seluruh pengguna yang terdaftar pada sistem, memberikan admin kemampuan untuk memantau, mencari, serta mengelola akun-akun pengguna sesuai kebutuhan operasional.

**File:** `src/app/admin/pelanggan/page.jsx`, `src/data/admin-pelanggan.js`

```
Gambar 2.15 Halaman Kelola Pelanggan
[Pelanggan screenshot]
```

#### 2.2.16 Halaman Kelola Artikel

Halaman Kelola Artikel digunakan oleh admin untuk melakukan operasi CRUD (Create, Read, Update, Delete) terhadap konten artikel, termasuk menambah artikel baru, mengubah isi artikel yang sudah ada, maupun menghapus artikel yang tidak lagi relevan.

**File:** `src/app/admin/artikel/page.jsx`, `src/data/admin-artikel.js`

```
Gambar 2.16 Halaman Kelola Artikel
[Artikel admin screenshot]
```

#### 2.2.17 Halaman Arsip Artikel

Halaman Arsip Artikel menampilkan seluruh artikel yang pernah dipublikasikan dalam bentuk daftar/tabel yang dapat difilter dan dicari berdasarkan kategori maupun kata kunci, sehingga memudahkan penelusuran artikel-artikel sebelumnya secara terstruktur.

**File:** `src/app/admin/artikel/arsip/page.jsx`

```
Gambar 2.17 Halaman Arsip Artikel
[Arsip screenshot]
```

### 2.3 Arsitektur Sistem

#### 2.3.1 Diagram Arsitektur

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              BROWSER                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     NEXT.JS APPLICATION                           │  │
│  │                                                                   │  │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │  │
│  │  │   /         │    │  /admin/*  │    │ /login      │          │  │
│  │  │  Beranda    │    │  Dashboard │    │ /register   │          │  │
│  │  │  Katalog    │    │  Admin     │    │ /profile    │          │  │
│  │  │  Blog       │    │  Panel     │    │ /keranjang  │          │  │
│  │  │  Keranjang  │    │            │    │ /checkout   │          │  │
│  │  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘          │  │
│  │         │                   │                   │                   │  │
│  │         └───────────────────┼───────────────────┘                   │  │
│  │                             │                                        │  │
│  │                    ┌────────▼────────┐                               │  │
│  │                    │  AuthContext   │                               │  │
│  │                    │  CartContext   │                               │  │
│  │                    └────────┬────────┘                               │  │
│  │                             │                                        │  │
│  │         ┌───────────────────┼───────────────────┐                  │  │
│  │         │                   │                   │                  │  │
│  │  ┌──────▼──────┐    ┌───────▼───────┐    ┌──────▼──────┐          │  │
│  │  │localStorage │   │   Middleware   │    │ Framer CMS  │          │  │
│  │  │  (Client)   │   │ (Route Guard) │    │  (Blog)     │          │  │
│  │  └─────────────┘   └───────────────┘    └─────────────┘          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 2.3.2 Teknologi yang Digunakan

| Komponen | Teknologi | Keterangan |
|---------|----------|------------|
| Frontend Framework | Next.js 14 | App Router |
| Styling | Tailwind CSS | Utility-first CSS |
| Animasi | Framer Motion | React animation library |
| State Management | React Context | AuthContext, CartContext |
| Icons | Lucide React | SVG icons |
| State Persistence | localStorage | Client-side storage |
| Blog CMS | Framer | External CMS untuk blog |
| Middleware | Next.js Middleware | Route protection |

### 2.4 Sistem Autentikasi dan Otorisasi

#### 2.4.1 Alur Autentikasi

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Guest   │───►│ Register │───►│  Login   │───►│  User/   │
│          │    │  Page    │    │  Page    │    │  Admin   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     │                                         │
     │            ┌─────────────────────────────┘
     │            │
     │            ▼
     │     ┌──────────────┐
     │     │ Middleware   │
     │     │ Check Auth   │
     │     └──────┬───────┘
     │            │
     │     ┌─────┴─────┐
     │     ▼           ▼
     │  /admin/*    /profile
     │  (Admin?)    (Logged?)
     │     │           │
     │     ▼           ▼
     │  Redirect    Redirect
     │  to /login   to /login
```

#### 2.4.2 Proteksi Route dengan Middleware

Aplikasi Bloomerie menggunakan Next.js Middleware untuk melindungi route tertentu:

**Middleware Implementation:** `src/middleware.js`

```javascript
// Proteksi route:
// - /admin/* → hanya admin yang boleh akses
// - /profile → harus login
```

**Aturan Proteksi:**

| Route | Kondisi | Aksi |
|-------|---------|------|
| `/admin/*` | Belum login | Redirect ke `/login` |
| `/admin/*` | Login tapi bukan admin | Redirect ke `/` |
| `/admin/*` | Login sebagai admin | Izinkan akses |
| `/profile` | Belum login | Redirect ke `/login` |
| `/profile` | Sudah login | Izinkan akses |

### 2.5 Data Model

#### 2.5.1 User
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

#### 2.5.2 Product
```javascript
{
  id: number,
  name: string,
  slug: string,
  price: number,
  category: string,
  image: string,
  description: string,
  variants: Array<{name, options}>,
  stock: number
}
```

#### 2.5.3 Cart Item
```javascript
{
  productId: number,
  name: string,
  price: number,
  quantity: number,
  variants: object,
  image: string
}
```

#### 2.5.4 Order
```javascript
{
  id: string,
  userId: number,
  items: Array<CartItem>,
  totalAmount: number,
  status: "menunggu" | "diproses" | "dikirim" | "selesai",
  shippingAddress: {
    nama: string,
    telepon: string,
    alamat: string
  },
  paymentMethod: string,
  createdAt: string
}
```

#### 2.5.5 Article
```javascript
{
  id: number,
  slug: string,
  title: string,
  excerpt: string,
  content: string,
  image: string,
  category: string,
  date: string,
  isFeatured: boolean
}
```

### 2.6 Pengujian Sistem

Pengujian sistem pada aplikasi Bloomerie difokuskan pada pengujian usability (kebergunaan) untuk mengukur sejauh mana aplikasi mudah dipahami dan digunakan oleh pengguna. Metode yang digunakan adalah System Usability Scale (SUS), yaitu instrumen pengukuran usability yang telah tervalidasi secara luas dalam penelitian human-computer interaction.

#### 2.6.1 Instrumen Pengujian

Kuesioner SUS terdiri atas 10 pernyataan baku yang dijawab menggunakan skala Likert 1-5, dengan ketentuan: 1 = Sangat Tidak Setuju (STS), 2 = Tidak Setuju (TS), 3 = Netral (N), 4 = Setuju (S), dan 5 = Sangat Setuju (SS).

| No | Pernyataan | STS (1) | TS (2) | N (3) | S (4) | SS (5) |
|----|------------|---------|--------|-------|-------|--------|
| 1 | Saya berpikir akan menggunakan aplikasi/sistem ini lagi | | | | | |
| 2 | Saya merasa sistem ini rumit untuk digunakan | | | | | |
| 3 | Saya merasa sistem ini mudah digunakan | | | | | |
| 4 | Saya membutuhkan bantuan orang lain atau teknisi dalam menggunakan sistem ini | | | | | |
| 5 | Saya merasa fitur-fitur pada sistem ini berjalan dengan semestinya | | | | | |
| 6 | Saya merasa ada banyak hal yang tidak konsisten pada sistem ini | | | | | |
| 7 | Saya merasa orang lain akan memahami cara menggunakan sistem ini dengan cepat | | | | | |
| 8 | Saya merasa sistem ini membingungkan | | | | | |
| 9 | Saya merasa tidak ada hambatan dalam menggunakan sistem ini | | | | | |
| 10 | Saya perlu membiasakan diri terlebih dahulu sebelum menggunakan sistem ini | | | | | |

#### 2.6.2 Cara Perhitungan Skor SUS

1. Untuk pernyataan bernomor ganjil (positif): skor kontribusi = (nilai jawaban − 1)
2. Untuk pernyataan bernomor genap (negatif): skor kontribusi = (5 − nilai jawaban)
3. Skor SUS = [Σ skor kontribusi] × 2,5 (rentang 0-100)

#### 2.6.3 Interpretasi Skor SUS

| Skor SUS | Grade | Predikat |
|-----------|-------|----------|
| > 80.3 | A | Excellent |
| 68 - 80.3 | B | Good |
| 68 | C | Average |
| 51 - 68 | D | Poor |
| < 51 | F | Not Acceptable |

[Catatan: hasil rekapitulasi skor dari responden Google Form beserta perhitungan rata-rata skor SUS akan dilampirkan pada bagian ini setelah data kuesioner terkumpul.]

---

## DAFTAR AKUN DEMO

| Role | Email | Password | Akses |
|------|-------|----------|-------|
| User | user@bloomerie.com | user123 | Halaman user (Beranda, Katalog, Blog, Keranjang, Checkout, Profile) |
| Admin | admin@bloomerie.com | admin123 | /admin/* (Dashboard, Inventori, Pesanan, Pelanggan, Artikel) |

---

## DAFTAR LINK EKSTERNAL

| Layanan | URL |
|---------|-----|
| Blog CMS | https://homely-lifecycle-872486.framer.app/ |

---

**Versi Dokumen:** 1.0  
**Tanggal:** 8 Juli 2026  
**Status:** Draft - Menunggu review

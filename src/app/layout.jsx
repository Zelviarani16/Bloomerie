/*
  layout.jsx — Root Layout
  Ini wrapping SEMUA halaman. Font Public Sans di-load sekali di sini
  pakai next/font/google (lebih cepat daripada import dari CDN Google Fonts,
  karena di-bundle saat build, bukan request external setiap buka halaman).
*/

import { Public_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata = {
  title: "Bloomerie — Toko Buket Online",
  description: "Keindahan alam dalam setiap kelopak. Buket bunga segar untuk setiap momen berharga Anda.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={publicSans.variable}>
      <body>
        {/*
          CartProvider membungkus Navbar + children + Footer supaya
          SEMUA komponen di dalamnya bisa akses useCart() — termasuk
          Navbar (untuk badge count) dan halaman manapun yang dirender
          lewat {children}.
        */}
        <CartProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}

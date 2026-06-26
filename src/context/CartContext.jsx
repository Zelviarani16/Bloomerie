"use client";

/*
  CartContext.jsx
  State keranjang belanja GLOBAL — dipakai di banyak tempat:
  - Navbar (badge jumlah item)
  - ProductInfo (tombol "Tambah ke Keranjang")
  - Halaman Keranjang (tampilkan, ubah quantity, hapus item)

  Kenapa perlu Context, bukan cuma useState biasa?
  Karena useState di satu komponen TIDAK BISA dibaca komponen lain
  yang levelnya beda (misal Navbar dan ProductInfo sama-sama butuh
  tau isi keranjang, tapi mereka bukan parent-child). Context adalah
  cara React untuk "menyiarkan" satu state ke banyak komponen tanpa
  perlu lewat props satu-satu (props drilling).

  Analogi Laravel: ini mirip seperti Session — data yang bisa diakses
  dari controller manapun selama masih dalam 1 "sesi" yang sama.
*/

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

// Key untuk localStorage — supaya keranjang tidak hilang saat refresh halaman
const STORAGE_KEY = "bloomerie_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load dari localStorage SEKALI saat pertama mount.
  // Ini di useEffect (bukan langsung di useState) supaya hanya jalan
  // di browser, tidak di server — localStorage tidak ada di server,
  // kalau dipanggil langsung saat render akan error.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {
      console.error("Gagal load cart dari localStorage:", e);
    }
    setIsLoaded(true);
  }, []);

  // Simpan ke localStorage setiap kali items berubah (tapi skip di
  // render pertama sebelum isLoaded, supaya tidak menimpa data lama
  // dengan array kosong sebelum loading selesai)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // addItem — tambah produk ke keranjang. Kalau produk dengan
  // slug+size yang sama sudah ada, quantity-nya ditambah, bukan
  // bikin baris baru.
  function addItem(newItem) {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.slug === newItem.slug && item.sizeLabel === newItem.sizeLabel
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }

      return [...prev, newItem];
    });
  }

  function updateQuantity(cartItemId, newQuantity) {
    if (newQuantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  }

  function removeItem(cartItemId) {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }

  function clearCart() {
    setItems([]);
  }

  // totalItems — dipakai untuk badge angka di Navbar
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // subtotal — total harga semua item, belum termasuk ongkir/pajak
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, totalItems, subtotal, isLoaded }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook supaya pemakaian di komponen lain tinggal: const { items } = useCart()
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus dipakai di dalam <CartProvider>");
  }
  return context;
}
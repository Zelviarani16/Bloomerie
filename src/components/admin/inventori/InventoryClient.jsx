"use client";

/*
  InventoryClient.jsx
  Halaman Kelola Produk - CRUD operations
*/

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { formatRupiah } from "@/data/products";
import { getProducts, addProduct, updateProduct, deleteProduct, getProductStats } from "@/data/store";
import InventoryStats from "./InventoryStats";
import InventoryToolbar from "./InventoryToolbar";
import Pagination from "@/components/katalog/Pagination";

const ITEMS_PER_PAGE = 10;

export default function InventoryClient() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalProduk: 0, stokRendah: 0, kategori: 0, produkAKTIF: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "AKTIF",
    image: "/images/products/placeholder.jpg",
    description: "",
  });

  // Load data
  const loadData = () => {
    const data = getProducts();
    setProducts(data);
    setStats(getProductStats());
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.trim().toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(query) || p.id.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleSearchChange(value) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString(),
        status: product.status,
        image: product.image,
        description: product.description || "",
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        status: "AKTIF",
        image: "/images/products/placeholder.jpg",
        description: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      alert("Semua field wajib diisi!");
      return;
    }

    const productData = {
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock),
      status: formData.status,
      image: formData.image,
      description: formData.description,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    loadData();
    handleCloseModal();
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    loadData();
    setDeleteConfirm(null);
  };

  const CATEGORIES = ["Bouquet", "Vas", "Musiman", "Hampers", "Standing Flower"];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-1.5" style={{ color: "var(--color-ink)" }}>
            Kelola Produk
          </h1>
          <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Pantau dan kelola inventaris bunga Bloomerie Anda.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded text-white whitespace-nowrap"
          style={{ background: "var(--color-primary)" }}
        >
          + Tambah Produk Baru
        </button>
      </div>

      <InventoryStats stats={stats} />
      <InventoryToolbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "var(--color-neutral-dark)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }}>
                {["ID", "Nama Produk", "Kategori", "Harga", "Stok", "Status", ""].map((head) => (
                  <th key={head} className="text-left text-xs font-semibold tracking-wide uppercase py-3.5 px-4 whitespace-nowrap" style={{ color: "var(--color-secondary)" }}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "var(--color-neutral-dark)" }}
                >
                  <td className="py-4 px-4 text-sm" style={{ color: "var(--color-secondary)" }}>#{product.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-neutral-100 flex-shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap" style={{ color: "var(--color-ink)" }}>{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap" style={{ background: "var(--color-neutral)", color: "var(--color-ink-soft)" }}>{product.category}</span>
                  </td>
                  <td className="py-4 px-4 text-sm whitespace-nowrap" style={{ color: "var(--color-ink)" }}>{formatRupiah(product.price)}</td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold" style={{ color: product.stock <= 5 && product.stock > 0 ? "var(--color-primary)" : "var(--color-ink)" }}>{product.stock}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: product.status === "AKTIF" ? "#059669" : "#9CA3AF" }} />
                      <span className="text-sm" style={{ color: product.status === "AKTIF" ? "#065F46" : "#4B5563" }}>{product.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenModal(product)} className="p-2 hover:bg-gray-100 rounded transition-colors" style={{ color: "var(--color-secondary)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button onClick={() => setDeleteConfirm(product)} className="p-2 hover:bg-red-50 rounded transition-colors" style={{ color: "#DC2626" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>Tidak ada produk yang ditemukan.</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
          Menampilkan {paginatedProducts.length} dari {filteredProducts.length} produk
        </p>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* Modal Add/Edit */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-ink)" }}>
                {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1" style={{ color: "var(--color-ink)" }}>Nama Produk</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded border" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }} required />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1" style={{ color: "var(--color-ink)" }}>Kategori</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded border" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }} required>
                    <option value="">Pilih Kategori</option>
                    {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1" style={{ color: "var(--color-ink)" }}>Harga (Rp)</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded border" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }} required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1" style={{ color: "var(--color-ink)" }}>Stok</label>
                    <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded border" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }} required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1" style={{ color: "var(--color-ink)" }}>Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded border" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }}>
                    <option value="AKTIF">AKTIF</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1" style={{ color: "var(--color-ink)" }}>URL Gambar</label>
                  <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded border" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }} />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={handleCloseModal} className="flex-1 py-2.5 text-sm font-semibold rounded border" style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}>Batal</button>
                  <button type="submit" className="flex-1 py-2.5 text-sm font-semibold rounded text-white" style={{ background: "var(--color-primary)" }}>{editingProduct ? "Simpan" : "Tambah"}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold mb-2" style={{ color: "var(--color-ink)" }}>Hapus Produk?</h2>
              <p className="text-sm mb-4" style={{ color: "var(--color-secondary)" }}>Produk "{deleteConfirm.name}" akan dihapus permanen.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 text-sm font-semibold rounded border" style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}>Batal</button>
                <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 py-2.5 text-sm font-semibold rounded text-white" style={{ background: "#DC2626" }}>Hapus</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

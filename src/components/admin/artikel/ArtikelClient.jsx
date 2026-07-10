"use client";

/*
  ArtikelClient.jsx
  Halaman Kelola Artikel - CRUD operations
*/

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getArticles, addArticle, updateArticle, deleteArticle } from "@/data/store";

const CATEGORIES = ["Tips Perawatan", "Inspirasi Buket", "Gaya Hidup", "Event & Pernikahan"];

export default function ArtikelClient() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    image: "",
    content: "",
  });

  const loadData = () => {
    setArticles(getArticles());
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredArticles = useMemo(() => {
    let result = articles;

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query)
      );
    }

    if (filterCategory !== "all") {
      result = result.filter((a) => a.category === filterCategory);
    }

    return result;
  }, [articles, searchQuery, filterCategory]);

  const handleOpenModal = (article = null) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        image: article.image,
        content: article.content || "",
      });
    } else {
      setEditingArticle(null);
      setFormData({
        title: "",
        excerpt: "",
        category: "",
        image: "",
        content: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingArticle(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      alert("Judul dan kategori wajib diisi!");
      return;
    }

    const articleData = {
      title: formData.title,
      excerpt: formData.excerpt,
      category: formData.category,
      image: formData.image || "/images/blog/placeholder.jpg",
      content: formData.content,
      slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
      featured: false,
    };

    if (editingArticle) {
      updateArticle(editingArticle.id, articleData);
    } else {
      addArticle(articleData);
    }

    loadData();
    handleCloseModal();
  };

  const handleDelete = (id) => {
    deleteArticle(id);
    loadData();
    setDeleteConfirm(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-1.5" style={{ color: "var(--color-ink)" }}>
            Kelola Artikel
          </h1>
          <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Buat, edit, dan kelola artikel blog Bloomerie.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded text-white whitespace-nowrap"
          style={{ background: "var(--color-primary)" }}
        >
          + Tambah Artikel
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
        <div className="relative flex-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari artikel..."
            className="w-full pl-11 pr-4 py-3 text-sm rounded border outline-none"
            style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 text-sm rounded border outline-none"
          style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)", color: "var(--color-ink)" }}
        >
          <option value="all">Semua Kategori</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "var(--color-neutral-dark)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }}>
                {["Gambar", "Judul", "Kategori", "Tanggal", ""].map((head) => (
                  <th key={head} className="text-left text-xs font-semibold tracking-wide uppercase py-3.5 px-4 whitespace-nowrap" style={{ color: "var(--color-secondary)" }}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "var(--color-neutral-dark)" }}
                >
                  <td className="py-4 px-4">
                    <div className="relative w-16 h-12 rounded overflow-hidden bg-neutral-100">
                      <Image src={article.image} alt={article.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium max-w-xs line-clamp-2" style={{ color: "var(--color-ink)" }}>{article.title}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap" style={{ background: "var(--color-neutral)", color: "var(--color-ink-soft)" }}>
                      {article.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm whitespace-nowrap" style={{ color: "var(--color-secondary)" }}>
                    {article.date}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenModal(article)} className="p-2 hover:bg-gray-100 rounded transition-colors" style={{ color: "var(--color-secondary)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button onClick={() => setDeleteConfirm(article)} className="p-2 hover:bg-red-50 rounded transition-colors" style={{ color: "#DC2626" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredArticles.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>Tidak ada artikel yang ditemukan.</p>
          </div>
        )}
      </div>

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
                {editingArticle ? "Edit Artikel" : "Tambah Artikel Baru"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1" style={{ color: "var(--color-ink)" }}>Judul</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded border outline-none" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }} required />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1" style={{ color: "var(--color-ink)" }}>Kategori</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded border outline-none" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }} required>
                    <option value="">Pilih Kategori</option>
                    {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1" style={{ color: "var(--color-ink)" }}>Excerpt / Cuplikan</label>
                  <textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={3} className="w-full px-4 py-2.5 text-sm rounded border outline-none resize-none" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }} />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1" style={{ color: "var(--color-ink)" }}>URL Gambar</label>
                  <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded border outline-none" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }} />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={handleCloseModal} className="flex-1 py-2.5 text-sm font-semibold rounded border" style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink)" }}>Batal</button>
                  <button type="submit" className="flex-1 py-2.5 text-sm font-semibold rounded text-white" style={{ background: "var(--color-primary)" }}>{editingArticle ? "Simpan" : "Tambah"}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
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
              <h2 className="text-lg font-bold mb-2" style={{ color: "var(--color-ink)" }}>Hapus Artikel?</h2>
              <p className="text-sm mb-4" style={{ color: "var(--color-secondary)" }}>Artikel "{deleteConfirm.title}" akan dihapus permanen.</p>
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

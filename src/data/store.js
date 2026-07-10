/*
  data/store.js
  Data store untuk admin - CRUD operations dengan localStorage
*/

import { inventoryProducts as defaultProducts, inventoryStats as defaultStats } from "./admin-inventory";
import { transactions as defaultTransactions, transactionStats as defaultTransactionStats } from "./admin-transactions";
import { articles as defaultArticles } from "./articles";

// Products Store
export const getProducts = () => {
  if (typeof window === "undefined") return defaultProducts;
  const saved = localStorage.getItem("bloomerie_products");
  return saved ? JSON.parse(saved) : defaultProducts;
};

export const saveProducts = (products) => {
  localStorage.setItem("bloomerie_products", JSON.stringify(products));
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: `BLM-${String(products.length + 1).padStart(3, "0")}`,
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (id, updates) => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
    return products[index];
  }
  return null;
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  saveProducts(filtered);
  return true;
};

export const getProductStats = () => {
  const products = getProducts();
  const active = products.filter((p) => p.status === "AKTIF").length;
  const lowStock = products.filter((p) => p.stock <= 5 && p.stock > 0).length;
  const categories = [...new Set(products.map((p) => p.category))].length;
  return {
    totalProduk: products.length,
    stokRendah: lowStock,
    kategori: categories,
    produkAKTIF: active,
  };
};

// Transactions Store
export const getTransactions = () => {
  if (typeof window === "undefined") return defaultTransactions;
  const saved = localStorage.getItem("bloomerie_transactions");
  return saved ? JSON.parse(saved) : defaultTransactions;
};

export const saveTransactions = (transactions) => {
  localStorage.setItem("bloomerie_transactions", JSON.stringify(transactions));
};

export const updateTransactionStatus = (orderNumber, newStatus) => {
  const transactions = getTransactions();
  const index = transactions.findIndex((t) => t.orderNumber === orderNumber);
  if (index !== -1) {
    transactions[index].status = newStatus;
    saveTransactions(transactions);
    return transactions[index];
  }
  return null;
};

export const getTransactionStats = () => {
  const transactions = getTransactions();
  const pending = transactions.filter((t) => t.status === "pending").length;
  const diproses = transactions.filter((t) => t.status === "diproses").length;
  const dikirim = transactions.filter((t) => t.status === "dikirim").length;
  return {
    totalPesanan: transactions.length,
    totalPesananGrowth: 12,
    pending,
    diproses,
    dikirim,
  };
};

// Articles Store
export const getArticles = () => {
  if (typeof window === "undefined") return defaultArticles;
  const saved = localStorage.getItem("bloomerie_articles");
  return saved ? JSON.parse(saved) : defaultArticles;
};

export const saveArticles = (articles) => {
  localStorage.setItem("bloomerie_articles", JSON.stringify(articles));
};

export const addArticle = (article) => {
  const articles = getArticles();
  const newArticle = {
    ...article,
    id: Date.now(),
    date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
  };
  articles.unshift(newArticle);
  saveArticles(articles);
  return newArticle;
};

export const updateArticle = (id, updates) => {
  const articles = getArticles();
  const index = articles.findIndex((a) => a.id === id);
  if (index !== -1) {
    articles[index] = { ...articles[index], ...updates };
    saveArticles(articles);
    return articles[index];
  }
  return null;
};

export const deleteArticle = (id) => {
  const articles = getArticles();
  const filtered = articles.filter((a) => a.id !== id);
  saveArticles(filtered);
  return true;
};

// Order dari CartContext - untuk demo checkout
export const getOrders = () => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("bloomerie_orders");
  return saved ? JSON.parse(saved) : [];
};

export const addOrder = (order) => {
  const orders = getOrders();
  const newOrder = {
    ...order,
    id: `BLM-${Date.now().toString().slice(-5)}`,
    orderNumber: `BLM-${Date.now().toString().slice(-5)}`,
    date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  localStorage.setItem("bloomerie_orders", JSON.stringify(orders));

  // Sync to transactions
  const transactions = getTransactions();
  transactions.unshift({
    orderNumber: newOrder.orderNumber,
    date: newOrder.date,
    customerName: order.shippingAddress?.nama || "Guest",
    customerEmail: order.userEmail || "-",
    status: "pending",
    proofImage: null,
    proofVerified: false,
  });
  saveTransactions(transactions);

  return newOrder;
};

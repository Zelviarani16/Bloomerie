"use client";

/*
  AuthContext.jsx
  Context untuk manage state authentication user/admin
*/

import { createContext, useContext, useState, useEffect } from "react";

// Data user dan admin dummy
const DEFAULT_USERS = [
  {
    id: 1,
    email: "user@bloomerie.com",
    password: "user123",
    nama: "Sarah Amalia",
    role: "user",
    avatar: null,
    telepon: "081234567890",
    alamat: "Jl. Sudirman No. 123, Jakarta",
    tanggalBergabung: "12 Okt 2023",
  },
  {
    id: 2,
    email: "admin@bloomerie.com",
    password: "admin123",
    nama: "Admin Bloomerie",
    role: "admin",
    avatar: null,
    telepon: "081234567891",
    alamat: "Jl. Gatot Subroto No. 45, Jakarta",
    tanggalBergabung: "01 Jan 2023",
  },
];

// Load registered users dari localStorage
const getRegisteredUsers = () => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("bloomerie_registered_users");
  return saved ? JSON.parse(saved) : [];
};

const saveRegisteredUsers = (users) => {
  localStorage.setItem("bloomerie_registered_users", JSON.stringify(users));
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user dari localStorage saat init
  useEffect(() => {
    const savedUser = localStorage.getItem("bloomerie_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    // Cek di default users
    let foundUser = DEFAULT_USERS.find(
      (u) => u.email === email && u.password === password
    );

    // Cek di registered users
    if (!foundUser) {
      const registeredUsers = getRegisteredUsers();
      foundUser = registeredUsers.find(
        (u) => u.email === email && u.password === password
      );
    }

    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password; // Hapus password dari object
      setUser(userData);
      localStorage.setItem("bloomerie_user", JSON.stringify(userData));

      // Set cookie untuk middleware (expires dalam 7 hari)
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `bloomerie_user=${JSON.stringify(userData)};path=/;expires=${expires};SameSite=Lax`;

      return { success: true, user: userData };
    }

    return { success: false, error: "Email atau password salah" };
  };

  // Register function - buat user baru
  const register = (nama, email, password) => {
    // Cek apakah email sudah ada
    const existsInDefault = DEFAULT_USERS.find((u) => u.email === email);
    const existsInRegistered = getRegisteredUsers().find((u) => u.email === email);

    if (existsInDefault || existsInRegistered) {
      return { success: false, error: "Email sudah terdaftar" };
    }

    // Buat user baru
    const newUser = {
      id: Date.now(),
      email,
      password,
      nama,
      role: "user",
      avatar: null,
      telepon: "",
      alamat: "",
      tanggalBergabung: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    };

    // Simpan ke localStorage
    const registeredUsers = getRegisteredUsers();
    registeredUsers.push(newUser);
    saveRegisteredUsers(registeredUsers);

    // Auto login
    const userData = { ...newUser };
    delete userData.password;
    setUser(userData);
    localStorage.setItem("bloomerie_user", JSON.stringify(userData));

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `bloomerie_user=${JSON.stringify(userData)};path=/;expires=${expires};SameSite=Lax`;

    return { success: true, user: userData };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("bloomerie_user");
    // Hapus cookie
    document.cookie = "bloomerie_user=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  // Update profile
  const updateProfile = (data) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("bloomerie_user", JSON.stringify(updatedUser));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateProfile, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook untuk pakai auth di component manapun
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

/*
  app/page.jsx — Halaman Beranda (/)

  Navbar dan Footer TIDAK ditulis di sini — sudah otomatis terpasang
  lewat layout.jsx (root layout), jadi semua halaman baru otomatis
  punya Navbar+Footer tanpa perlu import manual lagi.

  Homepage SELESAI — semua 4 section sudah terpasang:
  HeroSection, FeaturedProducts, BlogPreview, NewsletterCTA
*/

import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BlogPreview from "@/components/home/BlogPreview";
import NewsletterCTA from "@/components/home/NewsletterCTA";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <BlogPreview />
      <NewsletterCTA />
    </main>
  );
}
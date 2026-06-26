/*
  app/produk/[slug]/page.jsx — Halaman Detail Produk (/produk/nama-produk)

  [slug] dalam nama folder artinya route dinamis — Next.js otomatis
  menangkap bagian URL setelah /produk/ sebagai parameter "slug".
  Contoh: /produk/morning-dew -> params.slug = "morning-dew"

  notFound() dipanggil kalau slug tidak ada di data — Next.js akan
  otomatis render halaman 404 bawaan.
*/

import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProductGallery from "@/components/produk/ProductGallery";
import ProductInfo from "@/components/produk/ProductInfo";
import ProductDetailSection from "@/components/produk/ProductDetailSection";
import RelatedProducts from "@/components/produk/RelatedProducts";

// generateMetadata — judul tab browser otomatis sesuai nama produk
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Produk Tidak Ditemukan — Bloomerie" };

  return {
    title: `${product.name} — Bloomerie`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(slug, 4);

  return (
    <div>
      <div className="container-bloomerie pt-8">
        <Breadcrumb
          items={[
            { label: "Katalog", href: "/katalog" },
            { label: product.category, href: "/katalog" },
            { label: product.name },
          ]}
        />
      </div>

      {/* ── Gallery kiri + Info kanan ── */}
      <div className="container-bloomerie grid lg:grid-cols-2 gap-10 lg:gap-16 pb-12">
        <ProductGallery images={product.gallery} productName={product.name} />
        <ProductInfo product={product} />
      </div>

      {/* ── Detail Produk & Perawatan ── */}
      <ProductDetailSection careNotes={product.careNotes} careTip={product.careTip} />

      {/* ── Mungkin Anda Juga Suka ── */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
/*
  app/blog/page.jsx
  Halaman Blog untuk User

  Sesuai Figma:
  - Header: "Blog" + subtitle
  - Featured section (sorotan utama)
  - Category filter buttons
  - Article grid cards
*/

import BlogClient from "@/components/blog/BlogClient";

export const metadata = {
  title: "Blog | Bloomerie",
  description: "Temukan inspirasi, tips, dan cerita menarik seputar dunia floral",
};

export default function BlogPage() {
  return <BlogClient />;
}

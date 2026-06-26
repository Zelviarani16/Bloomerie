/*
  app/checkout/page.jsx — Halaman Checkout (/checkout)
*/

import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata = {
  title: "Checkout | Bloomerie",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
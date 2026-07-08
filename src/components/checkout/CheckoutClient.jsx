"use client";

/*
  CheckoutClient.jsx
  "Otak" halaman Checkout — mengelola state form pengiriman, metode
  pengiriman, metode pembayaran, dan proses submit.

  Kalau keranjang kosong, redirect balik ke /keranjang — checkout
  tidak masuk akal diakses tanpa ada barang yang dibeli.
*/

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ShippingForm from "@/components/checkout/ShippingForm";
import ShippingMethod, { SHIPPING_OPTIONS } from "@/components/checkout/ShippingMethod";
import PaymentMethod, { PAYMENT_OPTIONS } from "@/components/checkout/PaymentMethod";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

export default function CheckoutClient() {
  const router = useRouter();
  const { items, isLoaded, clearCart } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [shippingMethodId, setShippingMethodId] = useState(SHIPPING_OPTIONS[0].id);
  const [paymentMethodId, setPaymentMethodId] = useState(PAYMENT_OPTIONS[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoaded && items.length === 0 && !isSubmitting) {
      router.replace("/keranjang");
    }
  }, [isLoaded, items, router, isSubmitting]);

  const selectedShipping = SHIPPING_OPTIONS.find((s) => s.id === shippingMethodId);

  function handleSubmit() {
    const requiredFields = ["firstName", "lastName", "phone", "address", "city", "postalCode"];
    const isValid = requiredFields.every((field) => shippingInfo[field]?.trim());

    if (!isValid) {
      alert("Mohon lengkapi semua informasi pengiriman.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      clearCart();
      router.push("/checkout/konfirmasi");
    }, 1200);
  }

  if (!isLoaded || items.length === 0) {
    return <div className="container-bloomerie py-16" />;
  }

  return (
    <div className="container-bloomerie py-8">
      <Breadcrumb
        items={[
          { label: "Keranjang", href: "/keranjang" },
          { label: "Checkout", href: "/checkout" },
          { label: "Konfirmasi" },
        ]}
      />

      <h1 className="text-2xl lg:text-3xl font-bold mb-8" style={{ color: "var(--color-ink)" }}>
        Checkout
      </h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="flex flex-col gap-6">
          <ShippingForm values={shippingInfo} onChange={setShippingInfo} />
          <ShippingMethod selected={shippingMethodId} onChange={setShippingMethodId} />
          <PaymentMethod selected={paymentMethodId} onChange={setPaymentMethodId} />
        </div>

        <div>
          <CheckoutSummary
            items={items}
            shippingCost={selectedShipping.price}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
// components/CheckoutForm.tsx
"use client";
import React, { useState } from "react";
import { useCart } from "./CartProvider";
import { z } from "zod";
import { useRouter } from "next/navigation";

// Minimal form schema validation using zod
const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Enter phone"),
  address: z.string().min(5, "Enter address"),
  city: z.string().min(2, "Enter city"),
  zip: z.string().min(2, "Enter ZIP/postal"),
});

export default function CheckoutForm() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (k: string, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    // validate
    const parse = schema.safeParse(form);
    if (!parse.success) {
      const zErrs: Record<string, string> = {};
      parse.error.errors.forEach((err) => {
        if (err.path[0]) zErrs[err.path[0] as string] = err.message;
      });
      setErrors(zErrs);
      return;
    }
    if (items.length === 0) {
      setServerError("Your cart is empty.");
      return;
    }

    setLoading(true);
    // In the handleSubmit function, update the API call part:
    try {
      // Prepare order payload
      const payload = {
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
        shipping: {
          address: form.address,
          city: form.city,
          zip: form.zip,
        },
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        totals: {
          subtotal,
          shipping: 50,
          taxes: Math.round(subtotal * 0.07),
          grandTotal: subtotal + 50 + Math.round(subtotal * 0.07),
        },
      };

      // Call the checkout API
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "Failed to place order");
      }

      // Clear cart, redirect to confirmation page
      clear();
      router.push(`/confirmation/${json.orderId}`);
    } catch (err: any) {
      setServerError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-6 rounded">
      <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>

      <label className="block mb-2">
        <span className="text-sm">Full name</span>
        <input
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="mt-1 block w-full border p-2 rounded"
        />
        {errors.name && (
          <div className="text-red-600 text-sm mt-1">{errors.name}</div>
        )}
      </label>

      <label className="block mb-2">
        <span className="text-sm">Email</span>
        <input
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="mt-1 block w-full border p-2 rounded"
        />
        {errors.email && (
          <div className="text-red-600 text-sm mt-1">{errors.email}</div>
        )}
      </label>

      <label className="block mb-2">
        <span className="text-sm">Phone</span>
        <input
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="mt-1 block w-full border p-2 rounded"
        />
        {errors.phone && (
          <div className="text-red-600 text-sm mt-1">{errors.phone}</div>
        )}
      </label>

      <label className="block mb-2">
        <span className="text-sm">Address</span>
        <input
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className="mt-1 block w-full border p-2 rounded"
        />
        {errors.address && (
          <div className="text-red-600 text-sm mt-1">{errors.address}</div>
        )}
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block mb-2">
          <span className="text-sm">City</span>
          <input
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
          />
          {errors.city && (
            <div className="text-red-600 text-sm mt-1">{errors.city}</div>
          )}
        </label>
        <label className="block mb-2">
          <span className="text-sm">ZIP</span>
          <input
            value={form.zip}
            onChange={(e) => handleChange("zip", e.target.value)}
            className="mt-1 block w-full border p-2 rounded"
          />
          {errors.zip && (
            <div className="text-red-600 text-sm mt-1">{errors.zip}</div>
          )}
        </label>
      </div>

      {serverError && <div className="text-red-600 mt-3">{serverError}</div>}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-black text-white py-3 px-4 rounded w-full"
      >
        {loading ? "Placing order..." : "Place order"}
      </button>
    </form>
  );
}

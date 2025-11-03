"use client";
import React, { useState } from "react";
import { useCart } from "./CartProvider";
import { z } from "zod";
import { useRouter } from "next/navigation";

const checkoutSchema = z
  .object({
    // Billing Details
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),

    // Shipping Info
    address: z.string().min(5, "Address must be at least 5 characters"),
    zip: z.string().min(3, "ZIP code must be at least 3 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),

    // Payment Details
    paymentMethod: z.enum(["emoney", "cash"]),
    emoneyNumber: z.string().optional(),
    emoneyPin: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "emoney") {
        return data.emoneyNumber && data.emoneyPin;
      }
      return true;
    },
    {
      message: "e-Money number and PIN are required when using e-Money",
      path: ["emoneyNumber"],
    }
  );

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const { items, subtotal, clear, setShowConfirmation, setConfirmationData } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    paymentMethod: "emoney",
    emoneyNumber: "",
    emoneyPin: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    // Validate form
    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (items.length === 0) {
      setServerError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
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
          country: form.country,
        },
        payment: {
          method: form.paymentMethod,
          ...(form.paymentMethod === "emoney" && {
            emoneyNumber: form.emoneyNumber,
            emoneyPin: form.emoneyPin,
          }),
        },
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        totals: {
          subtotal,
          shipping: 50,
          taxes: Math.round(subtotal * 0.07),
          grandTotal: subtotal + 50 + Math.round(subtotal * 0.07),
        },
      };

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
      
      router.push(`/confirmation/${json.orderId}`);
    } catch (err: any) {
      setServerError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    clear();
  };

  const shipping = 50;
  const tax = Math.round(subtotal * 0.07);
  const grandTotal = subtotal + shipping + tax;

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded bg-white">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {/* Billing Details */}
        <section className="mb-8">
          <h6 className="text-lg font-semibold mb-4 text-[#d87d4a]">
            Billing Details
          </h6>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 col-span-2 md:col-span-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Alexei Ward"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`mt-1 block w-full border p-2 rounded ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && (
                <div className="text-red-600 text-sm mt-1">{errors.name}</div>
              )}{" "}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 col-span-2 md:col-span-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="alexei@mail.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`mt-1 block w-full border p-2 rounded ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <div className="text-red-600 text-sm mt-1">{errors.email}</div>
              )}{" "}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-2 col-span-2 md:col-span-1"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+1 202-555-0136"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={`mt-1 block w-full border p-2 rounded ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && (
                <div className="text-red-600 text-sm mt-1">{errors.phone}</div>
              )}{" "}
            </div>
          </div>
        </section>

        {/* Shipping Info */}
        <section className="mb-8">
          <h6 className="text-lg font-semibold mb-4 text-[#d87d4a]">
            Shipping Info
          </h6>
          <div className="grid md:grid-cols-1 gap-4">
            <div>
              <label htmlFor="address" className="block mb-2 col-span-2">
                Your Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="1137 Williams Avenue"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className={`mt-1 block w-full border p-2 rounded ${errors.address ? "border-red-500" : ""}`}
              />
              {errors.address && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.address}
                </div>
              )}{" "}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="zip" className="block mb-2">
                  ZIP Code
                </label>
                <input
                  id="zip"
                  type="text"
                  placeholder="10001"
                  value={form.zip}
                  onChange={(e) => handleChange("zip", e.target.value)}
                  className={`mt-1 block w-full border p-2 rounded ${errors.zip ? "border-red-500" : ""}`}
                />
                {errors.zip && (
                  <div className="text-red-600 text-sm mt-1">{errors.zip}</div>
                )}{" "}
              </div>

              <div>
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  placeholder="New York"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className={`mt-1 w-full border p-2 rounded ${errors.zip ? "border-red-500" : ""}`}
                />
                {errors.city && (
                  <div className="text-red-600 text-sm mt-1">{errors.zip}</div>
                )}{" "}
              </div>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block mb-2 col-span-2 md:col-span-1"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                placeholder="United States"
                value={form.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className={`mt-1 block w-full border p-2 rounded ${errors.country ? "border-red-500" : ""}`}
              />
              {errors.country && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.country}
                </div>
              )}{" "}
            </div>
          </div>
        </section>

        {/* Payment Details */}
        <section className="mb-8">
          <h6 className="text-lg font-semibold mb-4 text-[#d87d4a]">
            Payment Details
          </h6>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="font-bold">Payment Method</div>
            <div>
              <label className="block mb-2">Payment Method</label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border rounded cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="emoney"
                    checked={form.paymentMethod === "emoney"}
                    onChange={(e) =>
                      handleChange("paymentMethod", e.target.value)
                    }
                    className="mr-3"
                  />
                  e-Money
                </label>

                <label className="flex items-center p-3 border rounded cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={form.paymentMethod === "cash"}
                    onChange={(e) =>
                      handleChange("paymentMethod", e.target.value)
                    }
                    className="mr-3"
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>

          <div className="py-4">
            {form.paymentMethod === "emoney" && (
              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="emoneyNumber"
                    className="block mb-2 col-span-2 md:col-span-1"
                  >
                    e-Money Number
                  </label>
                  <input
                    id="emoneyNumber"
                    type="text"
                    placeholder="238521993"
                    value={form.emoneyNumber}
                    onChange={(e) =>
                      handleChange("emoneyNumber", e.target.value)
                    }
                    className={`mt-1 block w-full border p-2 rounded ${errors.emoneyNumber ? "border-red-500" : ""}`}
                  />
                  {errors.emoneyNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.emoneyNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="emoneyPin"
                    className="block mb-2 col-span-2 md:col-span-1"
                  >
                    e-Money PIN
                  </label>
                  <input
                    id="emoneyPin"
                    type="password"
                    placeholder="6891"
                    value={form.emoneyPin}
                    onChange={(e) => handleChange("emoneyPin", e.target.value)}
                    className={`mt-1 block w-full border p-2 rounded ${errors.emoneyPin ? "border-red-500" : ""}`}
                  />
                  {errors.emoneyPin && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.emoneyPin}
                    </p>
                  )}
                </div>
              </div>
            )}

            {form.paymentMethod === "cash" && (
              <div className="flex items-center gap-4 p-4">
                <div className="text-4xl">
                  <img src="/cash.svg" alt="" className="w-[48px] h-[48px]" srcset="" />
                </div>
                <p className="text-gray-600">
                  The 'Cash on Delivery' option enables you to pay in cash when
                  our delivery courier arrives at your residence. Just make sure
                  your address is correct so that your order will not be
                  cancelled.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#d87d4a] hover:bg-[#fbaf85] text-white py-4 px-6 rounded font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? "Processing..."
          : `Continue & Pay `}
      </button>
    </form>
  );
}

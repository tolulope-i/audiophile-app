"use client";
import React, { useState, useCallback } from "react";
import { useCart } from "./CartProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  paymentMethod: "emoney" | "cash";
  emoneyNumber: string;
  emoneyPin: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

interface CheckoutResponse {
  success: boolean;
  orderId?: string;
  message?: string;
}

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
}: {
  id: keyof FormData;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) => (
  <div className={id === "address" ? "col-span-2" : ""}>
    <label htmlFor={id} className="block text-sm font-semibold mb-1">
      {label}
    </label>

    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
        error
          ? "border-red-500 focus:ring-red-200"
          : "border-gray-300 focus:border-[#d87d4a] focus:ring-[#fbaf85]"
      }`}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    />

    {error && (
      <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
);

export default function CheckoutForm() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validateField = useCallback(
    (name: keyof FormData, value: string, paymentMethod?: string): string => {
      const currentPaymentMethod = paymentMethod || form.paymentMethod;

      switch (name) {
        case "name":
          if (!value.trim()) return "Name is required";
          if (value.trim().length < 2)
            return "Name must be at least 2 characters";
          return "";

        case "email":
          if (!value.trim()) return "Email is required";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Invalid email address";
          return "";

        case "phone":
          if (!value.trim()) return "Phone number is required";
          if (!/^\+?[\d\s-()]{10,}$/.test(value.replace(/\s/g, "")))
            return "Invalid phone number";
          return "";

        case "address":
          if (!value.trim()) return "Address is required";
          if (value.trim().length < 5)
            return "Address must be at least 5 characters";
          return "";

        case "zip":
          if (!value.trim()) return "ZIP code is required";
          if (value.trim().length < 3)
            return "ZIP code must be at least 3 characters";
          return "";

        case "city":
          if (!value.trim()) return "City is required";
          if (value.trim().length < 2)
            return "City must be at least 2 characters";
          return "";

        case "country":
          if (!value.trim()) return "Country is required";
          if (value.trim().length < 2)
            return "Country must be at least 2 characters";
          return "";

        case "emoneyNumber":
          if (currentPaymentMethod === "emoney" && !value.trim())
            return "e-Money number is required";
          if (currentPaymentMethod === "emoney" && !/^\d+$/.test(value))
            return "e-Money number must contain only digits";
          return "";

        case "emoneyPin":
          if (currentPaymentMethod === "emoney" && !value.trim())
            return "e-Money PIN is required";
          if (currentPaymentMethod === "emoney" && !/^\d{4}$/.test(value))
            return "PIN must be 4 digits";
          return "";

        default:
          return "";
      }
    },
    [form.paymentMethod]
  );

  const handleChange = useCallback(
    (field: keyof FormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));

      const error = validateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    },
    [validateField]
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(form) as Array<keyof FormData>).forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
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
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        },
        shipping: {
          address: form.address.trim(),
          city: form.city.trim(),
          zip: form.zip.trim(),
          country: form.country.trim(),
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
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json: CheckoutResponse = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json?.message || "Failed to place order");
      }

      router.push(`/confirmation/${json.orderId}`);
      clear();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const shipping = 50;
  const tax = Math.round(subtotal * 0.07 * 100) / 100;
  const grandTotal = subtotal + shipping + tax;

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="bg-white rounded-lg p-6 lg:p-8">
        <h2 className="text-2xl lg:text-3xl font-bold mb-6">Checkout</h2>

        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-[#d87d4a]">
            Billing Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              id="name"
              label="Name"
              placeholder="Alexei Ward"
              value={form.name}
              error={errors.name}
              onChange={(value) => handleChange("name", value)}
            />
            <InputField
              id="email"
              label="Email Address"
              type="email"
              placeholder="alexei@mail.com"
              value={form.email}
              error={errors.email}
              onChange={(value) => handleChange("email", value)}
            />
            <InputField
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="+1 202-555-0136"
              value={form.phone}
              error={errors.phone}
              onChange={(value) => handleChange("phone", value)}
            />
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-[#d87d4a]">
            Shipping Info
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <InputField
              id="address"
              label="Your Address"
              placeholder="1137 Williams Avenue"
              value={form.address}
              error={errors.address}
              onChange={(value) => handleChange("address", value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="zip"
                label="ZIP Code"
                placeholder="10001"
                value={form.zip}
                error={errors.zip}
                onChange={(value) => handleChange("zip", value)}
              />
              <InputField
                id="city"
                label="City"
                placeholder="New York"
                value={form.city}
                error={errors.city}
                onChange={(value) => handleChange("city", value)}
              />
            </div>
            <InputField
              id="country"
              label="Country"
              placeholder="United States"
              value={form.country}
              error={errors.country}
              onChange={(value) => handleChange("country", value)}
            />
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-[#d87d4a]">
            Payment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-3">
                Payment Method
              </label>
            </div>
            <div className="space-y-3">
              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  form.paymentMethod === "emoney"
                    ? "border-[#d87d4a] bg-orange-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="emoney"
                  checked={form.paymentMethod === "emoney"}
                  onChange={(e) =>
                    handleChange("paymentMethod", e.target.value)
                  }
                  className="mr-3 w-4 h-4 text-[#d87d4a] focus:ring-[#d87d4a]"
                />
                e-Money
              </label>

              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  form.paymentMethod === "cash"
                    ? "border-[#d87d4a] bg-orange-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={form.paymentMethod === "cash"}
                  onChange={(e) =>
                    handleChange("paymentMethod", e.target.value)
                  }
                  className="mr-3 w-4 h-4 text-[#d87d4a] focus:ring-[#d87d4a]"
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          {form.paymentMethod === "emoney" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <InputField
                id="emoneyNumber"
                label="e-Money Number"
                type="text"
                placeholder="238521993"
                value={form.emoneyNumber}
                error={errors.emoneyNumber}
                onChange={(value) => handleChange("emoneyNumber", value)}
              />
              <InputField
                id="emoneyPin"
                label="e-Money PIN"
                type="password"
                placeholder="6891"
                value={form.emoneyPin}
                error={errors.emoneyPin}
                onChange={(value) => handleChange("emoneyPin", value)}
              />
            </div>
          )}

          {form.paymentMethod === "cash" && (
            <div className="flex items-start gap-4 p-4 mt-4 bg-gray-50 rounded-lg">
              <div className="text-4xl shrink-0">
                <Image
                  src="/cash.svg"
                  alt="Cash on Delivery"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                The Cash on Delivery option enables you to pay in cash when our
                delivery courier arrives at your residence. Just make sure your
                address is correct so that your order will not be cancelled.
              </p>
            </div>
          )}
        </section>
      </div>

      {serverError && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Error</span>
          </div>
          <p className="mt-1">{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || items.length === 0}
        className="w-full bg-[#d87d4a] hover:bg-[#fbaf85] disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#fbaf85] disabled:cursor-not-allowed"
        aria-label={
          loading
            ? "Processing your order"
            : `Continue and pay $${grandTotal.toLocaleString()}`
        }
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing Your Order...
          </div>
        ) : (
          `Continue & Pay $${grandTotal.toLocaleString()}`
        )}
      </button>
    </form>
  );
}

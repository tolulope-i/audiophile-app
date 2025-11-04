import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    shipping: v.object({
      address: v.string(),
      city: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
    items: v.array(v.object({
      id: v.string(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.optional(v.string()),
    })),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      taxes: v.number(),
      grandTotal: v.number(),
    }),
    status: v.string(),
    createdAt: v.string(),
    orderId: v.string(), // Add orderId field
  }),

  carts: defineTable({
    items: v.array(v.object({
      id: v.string(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.optional(v.string()),
    })),
    sessionId: v.string(),
    updatedAt: v.string(),
  }).index("by_session", ["sessionId"]),

  products: defineTable({
    id: v.string(),
    slug: v.string(),
    name: v.string(),
    category: v.string(),
    price: v.number(),
    description: v.string(),
    features: v.string(),
    gallery: v.array(v.string()),
    image: v.string(),
    includes: v.array(v.object({
      item: v.string(),
      quantity: v.number(),
    })),
    new: v.boolean(),
  }),
});
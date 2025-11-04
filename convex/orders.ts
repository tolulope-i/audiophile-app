import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const addOrder = mutation({
  args: {
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
    orderId: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date();
    const doc = {
      ...args,
      status: 'pending',
      createdAt: now.toISOString(),
    };

    try {
      const id = await ctx.db.insert('orders', doc);
      return { success: true, id, orderId: args.orderId };
    } catch (error) {
      console.error('Failed to save order:', error);
      return { success: false, error: 'Failed to save order' };
    }
  },
});

export const getOrder = query({
  args: { id: v.id("orders") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});
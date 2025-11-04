import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const saveCart = mutation({
  args: {
    sessionId: v.string(),
    items: v.array(v.object({
      id: v.string(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.optional(v.string()),
    })),
  },
  handler: async (ctx, { sessionId, items }) => {
    // Check if cart exists for this session
    const existing = await ctx.db
      .query('carts')
      .withIndex('by_session', (q) => q.eq('sessionId', sessionId))
      .first();

    if (existing) {
      // Update existing cart
      await ctx.db.patch(existing._id, {
        items,
        updatedAt: new Date().toISOString(),
      });
      return existing._id;
    } else {
      // Create new cart
      const cartId = await ctx.db.insert('carts', {
        sessionId,
        items,
        updatedAt: new Date().toISOString(),
      });
      return cartId;
    }
  },
});

export const getCart = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const cart = await ctx.db
      .query('carts')
      .withIndex('by_session', (q) => q.eq('sessionId', sessionId))
      .first();
    
    return cart ? cart.items : [];
  },
});
// convex/functions/addOrder.ts
import { mutation } from 'convex/server';

export default mutation(async ({ db }, order) => {
  const now = new Date();
  const doc = {
    ...order,
    status: 'pending',
    createdAt: now.toISOString(),
  };

  const id = await db.insert('orders', doc);
  // Optionally trigger an email send via other system or a queued job
  return id;
});

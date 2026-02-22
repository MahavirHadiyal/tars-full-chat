import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Create user
export const createUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!existing) {
      await ctx.db.insert("users", {
        ...args,
        online: true,
      });
    }
  },
});

// Get all users
export const getUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});
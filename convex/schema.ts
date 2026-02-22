import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    image: v.string(),
    online: v.optional(v.boolean()),
  }).index("by_clerkId", ["clerkId"]),

  messages: defineTable({
    text: v.string(),
    senderId: v.string(),
    receiverId: v.string(),
    createdAt: v.number(),
  }),

  typing: defineTable({
    userId: v.string(),
    receiverId: v.string(),
    isTyping: v.boolean(),
  }),
});
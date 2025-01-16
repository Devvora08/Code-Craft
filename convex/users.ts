import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUser = mutation({
    args: {
        userId: v.string(),
        email: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db.query("users")
            .filter(q => q.eq(q.field("userId"), args.userId))
            .first()

        if (!existingUser) {
            await ctx.db.insert("users", {
                userId: args.userId,
                email: args.email,
                name: args.name,
                isPro: true,
            })
        }
    }
})

export const getUser = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        if (!args.userId) return null

        const user = await ctx.db.query("users").withIndex("by_user_id").filter((q) => q.eq(q.field("userId"), args.userId)).first()

        if (!user) return null

        return user;
    }
})

// export const upgradeToPro = mutation({
//     args: {
//       email: v.string(),
//       lemonSqueezyCustomerId: v.string(),
//       lemonSqueezyOrderId: v.string(),
//       amount: v.number(),
//     },
//     handler: async (ctx, args) => {
//       const user = await ctx.db
//         .query("users")
//         .filter((q) => q.eq(q.field("email"), args.email))
//         .first();
  
//       if (!user) throw new Error("User not found");
  
//       await ctx.db.patch(user._id, {
//         isPro: true,
//         proSince: Date.now(),
//         lemonSqueezyCustomerId: args.lemonSqueezyCustomerId,
//         lemonSqueezyOrderId: args.lemonSqueezyOrderId,
//       });
  
//       return { success: true };
//     },
//   });


// Define the mutation to upgrade the user to pro
export const upgradeToPro = mutation({
  args: {
    userId: v.string(), // userId as string type
  },
  handler: async (ctx, args) => {
    // Fetch the user from the database by ID
    const user = await ctx.db.query("users").filter((q) => q.eq(q.field("_id"), args.userId)).first();

    if (!user) throw new Error("User not found");

    // Update the user's 'isPro' status
    await ctx.db.patch(user._id, {
      isPro: true,
      proSince: Date.now(),
    });

    return { success: true }; // Return a success response
  },
});

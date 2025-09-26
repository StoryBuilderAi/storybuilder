import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { users, sessions } from "../db/schemas";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  callbacks: {
    onUserCreate: async ({ user }) => {
      console.log(`New user created: ${user.email}`);
      return user;
    },
    onSessionCreate: async ({ session, user }) => {
      console.log(`New session created for user: ${user.email}`);
      return session;
    },
  },
});

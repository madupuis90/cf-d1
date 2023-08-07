// src/lib/server/lucia.ts
import { lucia, type Configuration, type Auth as LAuth, type User, type UserSchema } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { d1 } from "@lucia-auth/adapter-sqlite";
import type { D1Database } from '@cloudflare/workers-types';

const initializeLucia = (db: D1Database) => {
  return lucia({
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    adapter: d1(db, {
      user: "user",
      key: "user_key",
      session: "user_session"
    }),
    getUserAttributes(databaseUser: UserSchema) {
      return {
        userId: databaseUser.id,
        email: databaseUser.email,
      };
    },
  });
};

let _auth: ReturnType<typeof initializeLucia>;
export const useAuth = (db: D1Database) => {
  if (!_auth) {
    _auth = initializeLucia(db);
  }
  return _auth;
}
export type Auth = ReturnType<typeof initializeLucia>;
// See https://kit.svelte.dev/docs/types#app

import type { D1Database } from '@cloudflare/workers-types';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      auth: import("lucia").AuthRequest;
    }
    // interface PageData {}
    interface Platform {
      env: {
        DB: D1Database;
      };
      context: {
        waitUntil(promise: Promise<any>): void;
      };
      caches: CacheStorage & { default: Cache };
    }
  };
  namespace Lucia {
    type Auth = import("$lib/server/lucia").Auth;
    type DatabaseUserAttributes = {
      email: string;
    };
    type DatabaseSessionAttributes = {};
  };
}

export { };
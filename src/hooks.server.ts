import { useAuth } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const DB = event.platform?.env.DB;
  // we can pass `event` because we used the SvelteKit middleware
  event.locals.auth = useAuth(DB!).handleRequest(event);
  return await resolve(event);
};
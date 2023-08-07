import { redirect, type Actions, fail } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { useAuth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) throw redirect(302, "/login");
  return {
    userId: session.user.userId,
    email: session.user.email
  };
};

export const actions: Actions = {
  logout: async ({ locals, platform }) => {
    const DB = platform!.env.DB;
    const session = await locals.auth.validate();
    if (!session) return fail(401);
    await useAuth(DB).invalidateSession(session.sessionId); // invalidate session
    locals.auth.setSession(null); // remove cookie
    throw redirect(302, "/login"); // redirect to login page
  }
};
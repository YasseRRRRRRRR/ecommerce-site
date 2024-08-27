import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function createClient() {
  const { getIdToken } = getKindeServerSession();
  const idToken = await getIdToken();
  const cookieStore = cookies();
  const token = jwt.sign(idToken, process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET!);
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

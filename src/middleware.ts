import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
// import { updateSession } from "@/utils/supabase/middleware";
import { CookieOptions, createServerClient } from "@supabase/ssr";

const handleI18nRouting = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fi", "sv"],
  // Used when no locale matches
  defaultLocale: "en",
});

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  await supabase.auth.getUser();
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fi|en|sv)/:path*"],
};

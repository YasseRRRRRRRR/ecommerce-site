import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
// import { updateSession } from "@/utils/supabase/middleware";
import { CookieOptions, createServerClient } from "@supabase/ssr";

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ["en", "fi", "sv"],
//   // Used when no locale matches
//   defaultLocale: "en",
// });

const handleI18nRouting = createMiddleware({
  locales: ["en", "fi", "sv"],
  defaultLocale: "en",
});

async function updateSessionWithI18n(request: NextRequest) {
  let supabaseResponse = handleI18nRouting(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          // Update supabaseResponse cookies accordingly
          const updatedSupabaseResponse = handleI18nRouting(request);
          cookiesToSet.forEach(({ name, value, options }) =>
            updatedSupabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !request.nextUrl.pathname.startsWith("/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export async function middleware(request: NextRequest) {
  return await updateSessionWithI18n(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/data|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

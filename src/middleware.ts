import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const i18nMiddleware = createMiddleware({
  locales: ["en", "fi", "sv"],
  defaultLocale: "en",
});

export async function middleware(request: NextRequest) {
  const response = i18nMiddleware(request);

  // A `response` can now be passed here
  return await updateSession(request, response);
}

export const config = {
  matcher: ["/", "/(fi|en|sv)/:path*"],
};

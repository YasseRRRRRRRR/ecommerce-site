import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fi", "sv"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(fi|en|sv)/:path*"],
};

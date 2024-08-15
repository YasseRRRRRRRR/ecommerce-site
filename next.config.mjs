import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TO Do
  // domains to accept for backend stuff
};

export default withNextIntl(nextConfig);

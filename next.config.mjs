/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  // Ensure experimental or optimization settings are solid
  poweredByHeader: false,
};

export default nextConfig;

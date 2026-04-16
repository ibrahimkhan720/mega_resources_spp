/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // 👈 IMPORTANT for cPanel hosting

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spp.statelyweb.co.uk',
        port: '',
        pathname: '/admin/uploads/user_images/**',
      },
    ],
  },
};

export default nextConfig;
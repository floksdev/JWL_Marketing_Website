/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dl.dropboxusercontent.com',
        pathname: '/**',
      },
      // (optionnel) si tu gardes parfois www.dropbox.com
      {
        protocol: 'https',
        hostname: 'www.dropbox.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

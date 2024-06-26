/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/gdpr",
        destination: "/PRAVIDLA%20ZPRACOVÁNÍ%20OSOBNÍCH%20ÚDAJŮ.pdf",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

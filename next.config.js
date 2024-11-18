/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      ssr: true, // Enable Server-Side Rendering for styled-components
      displayName: true, // Add display names for easier debugging
    },
  },
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

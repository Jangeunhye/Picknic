const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "today-eat.vercel.app",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};
export default nextConfig;

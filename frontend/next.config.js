/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["profile.line-scdn.net", "s.gravatar.com", "cdn.auth0.com"],
  },
};

module.exports = nextConfig;

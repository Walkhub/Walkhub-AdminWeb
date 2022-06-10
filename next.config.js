/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: { esmExternals: false },
  images: {
    domains: ["blog.kakaocdn.net", "walkhub.s3.ap-northeast-2.amazonaws.com"],
  },
};

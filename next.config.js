/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sns-clone-soo.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
}; //debug 기능 관련 설정
module.exports = nextConfig;

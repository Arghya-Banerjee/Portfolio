/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // GitHub raw sprites or other CDNs you use
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      // If you load Google Drive thumbnails:
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      // If you embed direct Drive file links (rarely works with Next/Image):
      { protocol: "https", hostname: "drive.google.com" }
    ]
  }
};
module.exports = nextConfig;

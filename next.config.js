const isProd = process.env.NODE_ENV === "production";
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: isProd
    ? "https://us-central1-soa-g6-p2.cloudfunctions.net/nextjs"
    : undefined,
  env: {
    basePath: isProd ? "/nextjs" : "",
  },
};

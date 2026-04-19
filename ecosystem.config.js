module.exports = {
  apps: [
    {
      name: "pdf-api",
      script: "./dist/index.js",
      watch: true,
      ignore_watch: ["node_modules", "public/uploads", "dist"],
      env: {
        NODE_ENV: "production",
      },
      node_args: "--max-old-space-size=4096"
    },
  ],
};

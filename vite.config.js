export default {
  root: "./frontend",
  build: {
    outDir: "../dist",
  },
  publicDir: "../frontend/public",
  server: {
    port: 5173,
    proxy: {
      "/socket.io": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};

export default {
  root: "./frontend",
  build: {
    outDir: "../dist",
  },
  publicDir: "../frontend/public",
  server: {
    port: 5173, // Vite dev server port (default)
    proxy: {
      "/socket.io": {
        target: "http://localhost:3000", // Publisher server
        ws: true,
        changeOrigin: true,
      },
    },
  },
};

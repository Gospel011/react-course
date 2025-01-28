import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "eslint-plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint],
  server: {
    allowedHosts: ["74bc-2c0f-2a80-9-8510-c146-aa2-37b0-803.ngrok-free.app"],
  },
});

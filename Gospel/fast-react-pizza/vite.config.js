import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), tailwindcss()],
  server: {
    allowedHosts: [
      "74bc-2c0f-2a80-9-8510-c146-aa2-37b0-803.ngrok-free.app",
    ],
  },
});

/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/warsztat_pieknych_wlosow/",
  plugins: [react(), tailwindcss()],
  build: { outDir: "build" },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["test/setupTests.ts"],
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: {
        // @ts-expect-error preset exists in newer nitro options or internal config
        preset: "vercel",
      },
    }),
    // Required for TanStack Start to build/deploy correctly on Vercel —
    // without this, Nitro never compiles the server output into Vercel
    // Functions and every route (other than a static index) 404s.
    nitro(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});

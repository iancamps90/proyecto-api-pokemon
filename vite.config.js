import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/proyecto-api-pokemon/",  // 📌 Revisa que esto sea EXACTAMENTE igual al nombre de tu repo en GitHub Pages
  build: {
    outDir: "dist",
  },
});

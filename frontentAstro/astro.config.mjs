import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), sitemap(), auth()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});
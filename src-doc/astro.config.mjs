import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://adulbrich.github.io",
  base: "/TrekTrak/",
  output: "static",
  integrations: [
    starlight({
      title: "TrekTrak Documentation",
      social: {
        github: "https://github.com/adulbrich/TrekTrak",
      },
      sidebar: [
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
        {
          label: "Architecture",
          autogenerate: { directory: "arch" },
        },
        {
          label: "Documents",
          autogenerate: { directory: "docs" },
        },
      ],
    }),
  ],
});

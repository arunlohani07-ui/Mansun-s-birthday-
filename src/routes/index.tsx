import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/birthday/Experience";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Happy Birthday, Mero Budii 😭💋" },
      { name: "description", content: "A little universe made with love by Ayush, only for Mansun." },
      { property: "og:title", content: "Happy Birthday, Mero Budii 😭💋" },
      { property: "og:description", content: "A little universe made with love, only for Mansun." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Experience,
});

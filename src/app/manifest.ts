import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maroc Operateur",
    short_name: "Maroc Operateur",
    description: "Discover Mobile Operator Companies and Landline Zones",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/icon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

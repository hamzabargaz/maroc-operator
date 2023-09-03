export default function metadata(t: any, locale: string) {
  return {
    metadataBase: new URL("https://www.marocoperateur.com"),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    // icons: [
    //   {
    //     rel: "icon",
    //     type: "image/png",
    //     sizes: "32x32",
    //     url: "../favicon/favicon-32x32.png",
    //   },
    //   {
    //     rel: "icon",
    //     type: "image/png",
    //     sizes: "16x16",
    //     url: "../favicon/favicon-16x16.png",
    //   },
    //   {
    //     rel: "apple-touch-icon",
    //     sizes: "180x180",
    //     url: "../favicon/apple-touch-icon.png",
    //   },
    // ],
    // openGraph: {
    //   title: t("og-title"),
    //   description: t("og-description"),
    //   url: "https://www.marocoperateur.com/",
    //   siteName: "Maroc Operateur",
    //   images: [
    //     {
    //       url: "https://www.marocoperateur.com/og.png",
    //       width: 800,
    //       height: 600,
    //     },
    //   ],
    //   locale,
    //   type: "website",
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: t("og-title"),
    //   description: t("og-description"),
    //   siteId: "",
    //   creator: "@Hamza_Bargaz",
    //   creatorId: "",
    //   images: ["https://www.marocoperateur.com/og.png"],
    // },
  };
}

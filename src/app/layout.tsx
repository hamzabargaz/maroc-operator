import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Menu from "@/components/menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.marocoperateur.com"),
  title: "Discover Your Phone Operator in Morocco | Maroc Operateur",
  description:
    "Looking for your phone operator in Morocco? Maroc Operateur makes it easy. Find your mobile operator or landline zone with our quick, accurate lookup tool.",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "./favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
  openGraph: {
    title: "Maroc Operateur",
    description:
      "Find your mobile operator or landline zone with our quick, accurate lookup tool.",
    url: "https://www.marocoperateur.com/",
    siteName: "Next.js",
    images: [
      {
        url: "https://www.marocoperateur.com/og.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maroc Operateur",
    description:
      "Find your mobile operator or landline zone with our quick, accurate lookup tool.",
    siteId: "",
    creator: "@Hamza_Bargaz",
    creatorId: "",
    images: ["https://www.marocoperateur.com/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Menu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

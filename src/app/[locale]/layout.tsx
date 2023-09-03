import "./globals.css";
import { NextIntlClientProvider, createTranslator } from "next-intl";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Menu from "@/components/menu";
import metadata from "./metadata";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "ar" }];
}

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages = (await import(`./../../locale/${locale}.json`)).default;
  const t = createTranslator({ locale, messages, namespace: "metadata" });

  return { ...metadata(t, locale) };
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  let messages;
  try {
    messages = (await import(`./../../locale/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html
      suppressHydrationWarning={true}
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <Menu />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

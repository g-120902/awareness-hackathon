import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Locale } from "@/types/locale";
import Header from "@/components/Header";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import HamburgerMenu from "@/components/HamburgerMenu";
import Chatbot from "@/components/Chatbot";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-primary min-h-screen flex flex-col overflow-hidden">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <HamburgerMenu />
          <div className="flex w-full justify-end px-4">
          <LanguageSwitcher />

          </div>
          <div className="flex-grow">{children}</div>
          <Chatbot />

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
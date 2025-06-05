import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import Script from "next/script";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Анкета амбассадора",
  description: "Отчётная форма в стиле Google Forms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head />
      <body className={roboto.className}>
        {/* <Script
          src="https://telegram.org/js/telegram-web-app.js?57"
          strategy="beforeInteractive"
        /> */}
        <div className="app-wrapper">{children}</div>
      </body>
    </html>
  );
}
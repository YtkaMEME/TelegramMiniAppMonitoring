import "@/styles/globals.css";
import { Roboto } from "next/font/google";

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
      <body className={roboto.className}>
      <div className="app-wrapper">
        {children}
      </div>
      </body>
      </html>
  );
}

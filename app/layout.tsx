import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./components/StoreProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <StoreProvider>
        <body>
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}

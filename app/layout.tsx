import "./globals.css";
import StoreProvider from "./components/StoreProvider"
import Link from "next/link";
import Image from "next/image"
import { CookiesProvider } from 'next-client-cookies/server';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fr" className="h-full">
      
      <StoreProvider>
        <body className="h-full">
          <div className=" absolute right-5 top-5">
            <Link href='/' className="inline-flex gap-2 items-center hover:bg-gradient-to-b hover:from-pink-200 hover:to-emerald-200 p-2 border duration-200">
              <Image
                src={'/accueil.png'}
                width="20"
                height="20"
                alt="Icone de suppression"
              />
              <span>Retour Accueil</span>
            </Link>
          </div>
          <CookiesProvider>
            {children}
          </CookiesProvider>
        </body>
      </StoreProvider>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/UI/layout/header";
import { Providers } from "@/providers/provider";
import { siteconfig } from "./config/site.config";
import Footer from "./components/UI/layout/footer";
import { layoutconfig } from "./config/layoutconfig";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";
import AppLoader from "@/hoc/app-loader";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteconfig.title,
  description: siteconfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SessionProvider session={session}>
          <AppLoader>
          <Header/>
          <main style={{
    minHeight: `calc(100vh - ${layoutconfig.headerHeight} - ${layoutconfig.footerHeight})`}} 
    className={`flex flex-col w-full justify-start items-center`}>{children}</main>
          <Footer/>
          </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
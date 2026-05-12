import type { Metadata } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import CONFIG from "@/config/site-config";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://balabakehouse.com"),
  title: CONFIG.metaBaslik,
  description: CONFIG.metaAciklama,
  openGraph: {
    title: CONFIG.metaBaslik,
    description: CONFIG.metaAciklama,
    images: [CONFIG.hero.arkaplan],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable} h-full`}
    >
      <body className="min-h-full bg-[var(--color-light)]">
        <LenisProvider>
          <Loader config={CONFIG.loader} />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer
            marka={CONFIG.marka}
            footer={CONFIG.footer}
            instagram={CONFIG.footer.instagram}
          />
        </LenisProvider>
      </body>
    </html>
  );
}

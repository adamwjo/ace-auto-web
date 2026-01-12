import type { Metadata } from "next";
import "./globals.css";
import { Inter, Chakra_Petch } from "next/font/google";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const chakra = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aceauto.example"),
  title: {
    default: "Ace Auto Repair | Modern Diagnostics & Clear Explanations",
    template: "%s | Ace Auto Repair",
  },
  description:
    "Modern auto repair guides, FAQs, and service requests for Ace Auto Repair.",
  keywords: [
    "Auto Repair",
    "Diagnostics",
    "Brake Service",
    "Check Engine Light",
    "Car Maintenance Guides",
  ],
  openGraph: {
    title: "Ace Auto Repair",
    description:
      "Modern diagnostics, practical guides, and straightforward service requests for drivers who want clear answers.",
    locale: "en_US",
    type: "website",
  },
  other: {
    "geo.region": "US-VA",
    "geo.placename": "Richmond",
    "geo.position": "37.5407;-77.4360",
    ICBM: "37.5407, -77.4360",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${chakra.variable}`}>
      <body className="main-shell antialiased">
        <Navbar />
        <main className="pt-24 pb-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

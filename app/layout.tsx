import type { Metadata } from "next";
import "./globals.css";
import { Inter, Chakra_Petch } from "next/font/google";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { AppProviders } from "../src/context/AppProviders";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const chakra = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://aceauto.example"
  ),
  title: {
    default:
      "Richmond Mobile Mechanic | Mobile Auto Repair in RVA & Surrounding Areas",
    template: "%s | Richmond Mobile Mechanic",
  },
  description:
    "Richmond, Virginia mobile mechanic providing on-site auto repair, diagnostics, and maintenance throughout RVA and nearby areas.",
  keywords: [
    "Richmond mobile mechanic",
    "mobile auto repair Richmond VA",
    "RVA mobile mechanic",
    "Richmond VA car repair",
    "on-site auto repair",
  ],
  openGraph: {
    title: "Richmond Mobile Mechanic",
    description:
      "On-site mobile auto repair and diagnostics serving Richmond (RVA) and surrounding Virginia communities.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Richmond Mobile Mechanic",
    description:
      "On-site mobile auto repair and diagnostics serving Richmond (RVA) and surrounding Virginia communities.",
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
        <AppProviders>
          <Navbar />
          <main className="pt-24 pb-24">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Roboto, Poppins, Raleway } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollTop from "@/components/layout/ScrollTop";
import Preloader from "@/components/layout/Preloader";
import MedilabScripts from "@/components/MedilabScripts";
import RouteAssets from "@/components/RouteAssets";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "National Colorectal Center | NCRC Nepal",
    template: "%s | NCRC",
  },
  description:
    "Expert colorectal care at Nepal's National Colorectal Center (NCRC), Everest Hospital, Baneshwor.",
  icons: {
    icon: "/assets/img/favicon.png",
    apple: "/assets/img/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
        <link href="/assets/css/main.css" rel="stylesheet" />
        <RouteAssets />
      </head>
      <body className={`${roboto.variable} ${poppins.variable} ${raleway.variable}`}>
        <Header />
        <main className="main">{children}</main>
        <Footer />
        <ScrollTop />
        <Preloader />
        <MedilabScripts />
      </body>
    </html>
  );
}

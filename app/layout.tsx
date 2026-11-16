import type { Metadata } from "next";
import { Inter, Pinyon_Script, Instrument_Serif, Playfair_Display, Bebas_Neue } from "next/font/google";
import "./globals.css";
import GlobalUI from "./components/GlobalUI";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: false,
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pinyon",
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-melodrama",
  preload: false,
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Calista Suherman — Portfolio",
  description: "Video editing, tutorials, templates, and the Editing 101 course by Calista Suherman",
  icons: { icon: "/cs-logo.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pinyon.variable} ${instrumentSerif.variable} ${playfair.variable} ${bebas.variable} bg-bg text-text-primary antialiased`}>
        <GlobalUI />
        {children}
      </body>
    </html>
  );
}

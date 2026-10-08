import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Pinyon_Script, Instrument_Serif, Luxurious_Script, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";
import GlobalUI from "./components/GlobalUI";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pinyon",
});

const luxuriousScript = Luxurious_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-luxurious",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-melodrama",
});

export const metadata: Metadata = {
  title: "Calista Suherman — Portfolio",
  description: "AI Visuals · Graphic Design · Creative Direction",
  icons: { icon: "/cs-logo.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} ${pinyon.variable} ${instrumentSerif.variable} ${luxuriousScript.variable} ${cinzel.variable} ${playfair.variable} bg-bg text-text-primary antialiased`}>
        <GlobalUI />
        {children}
      </body>
    </html>
  );
}

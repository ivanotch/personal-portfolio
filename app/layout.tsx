import type { Metadata } from "next";
import { Poppins, Roboto_Mono, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"], 
  subsets: ["latin"],
  variable: "--font-poppins"
});

const roboto = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ivanotch",
  description: "Ivan's Personal Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable} ${inter.variable} antialiased`}>
        <div>{children}</div>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reeha & Ahamed - Royal Wedding Invitation",
  description: "Official interactive digital wedding invitation for Reeha & Ahamed. Join us on December 13, 2026 at Lee Meredian Hall, Sainthamaruthu.",
  openGraph: {
    title: "Reeha & Ahamed - Royal Wedding Invitation",
    description: "Official interactive digital wedding invitation for Reeha & Ahamed.",
    images: ["/couple_flower_back_pose.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-stone-950 text-stone-100 min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

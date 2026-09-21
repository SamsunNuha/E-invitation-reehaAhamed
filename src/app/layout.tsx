import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personalized Digital Wedding Invitation Platform",
  description: "Create premium, interactive digital wedding invitations with envelope animations, live countdown, calendar sync, WhatsApp RSVP, and background music.",
  openGraph: {
    title: "Personalized Digital Wedding Invitation Platform",
    description: "Interactive online wedding invitations for brides & grooms.",
    images: ["https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-stone-950 text-stone-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}

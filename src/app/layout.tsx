import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { getConnect, getProfile } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["600"],
});

const profile = getProfile();
const connect = getConnect();
const title = profile.title ? `${profile.name} | ${profile.title}` : profile.name;
const description = profile.seoDescription;
const linkedin = connect.items.find((item) => item.type === "linkedin");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: linkedin?.href }],
  creator: profile.name,
  keywords: [
    "Emerson Siega",
    "Flutter",
    "Senior Flutter Engineer",
    "mobile developer",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: siteUrl,
    title,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${playfair.variable} antialiased`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

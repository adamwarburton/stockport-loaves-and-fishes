import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Warm display serif for headings only — body copy stays in Geist.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — hot food and a warm welcome, every Sunday`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
  },
};

// Schema.org: tells search engines this is a registered charity. NGO is the
// schema.org type for charities; Organization is the safe superset.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["NGO", "Organization"],
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  nonprofitStatus: "https://schema.org/CharitableIncorporatedOrganization",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "UK Registered Charity Number",
    value: site.charityNumber,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.venue.name}, ${site.venue.street}`,
    addressLocality: site.venue.town,
    postalCode: site.venue.postcode,
    addressCountry: "GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${geist.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

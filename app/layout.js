import React from 'react';
import { Space_Grotesk } from 'next/font/google';
import '../styles/globals.css';

const SpaceG = Space_Grotesk({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <>
      <html>
        <head>
          <title>Extend Alt Text</title>
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Extend alt text" />
          <meta
            property="og:description"
            content="Generate Multiple Alt Text, AI Powered"
          />
          <meta property="og:site_name" content="Extend Alt Text" />
          <meta
            property="og:url"
            content="https://extend-alt-text.vercel.app/"
          />
          <meta
            property="og:image"
            content="https://extend-alt-text.vercel.app/ogimage"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icon-16x16.png"
          />
          <link rel="shortcut icon" href="/icon-32x32.png" />
          <meta name="application-name" content="Extend Alt Text" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Extend Alt Text" />
          <meta
            name="description"
            content="Generate Alt Text by uploading bulk images"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-tap-highlight" content="no" />
          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icon-192x192.png"
          />
        </head>
        <body className={SpaceG.className}>{children}</body>
      </html>
    </>
  );
}

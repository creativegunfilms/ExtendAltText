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
          <meta property="og:description" content="Generate Multiple Alt Text, AI Powered" />
          <meta property="og:site_name" content="Extend Alt Text" />
          <meta property="og:url" content="https://extend-alt-text.vercel.app/" />
          <meta property="og:image" content="https://extend-alt-text.vercel.app/ogimage" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </head>
        <body className={SpaceG.className}>
          {children}
        </body>
      </html>
    </>
  );
}

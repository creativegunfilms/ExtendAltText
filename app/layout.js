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
          <meta
            property="og:image"
            content="https://extend-alt-text.vercel.app/ogimage"
          />
        </head>
        <body className={SpaceG.className}>
          {children}
        </body>
      </html>
    </>
  );
}

import React from 'react';
import { Space_Grotesk } from 'next/font/google';
import'../styles/globals.css';

const SpaceG = Space_Grotesk({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <>
      <html>
        <title>Extend Alt Text</title>
        <body className={SpaceG.className}>
          {children}
        </body>
      </html>
    </>
  );
}

import React from 'react';
import GlobalNav from './GlobalNav';
import { Signika } from 'next/font/google';
const signika = Signika({ subsets: ['latin'] });

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}-${month}-${year}`;

export default function RootLayout({ children }) {
  return (
    <>
      <html>
        <title>N-A-T-G-B</title>
        <body className={signika.className}>
          <GlobalNav />
          {children}
          <p>Developed by: Amit Sen and Titas Mallick | India | {currentDate}</p>
        </body>
      </html>
    </>
  );
}

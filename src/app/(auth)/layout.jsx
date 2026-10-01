import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hotel reservation",
  description: "Book your perfect stay with us",
};

export default function AuthLayout({ children }) {
  return (
   
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        
      </head>

      <body>

        {children}

       
      </body>
    </html>
  );
}
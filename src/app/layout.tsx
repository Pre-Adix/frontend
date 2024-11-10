import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Navbar from "@/components/customs/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Panel de Control Adix",
  description: "Panel de control para administración interna de Academia Pre-Universitaria Adix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <Navbar /> */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
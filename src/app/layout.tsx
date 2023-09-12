import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import AuthProvider from "./context/AuthProvider";
import SignInOutButton from "@/components/buttons/SignInOut";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {/* <Providers> */}
          {children}
          {/* </Providers> */}
        </AuthProvider>
      </body>
    </html>
  );
}

"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import { usePathname } from "next/navigation";
import { ChatProvider } from "./context/ChatContex";
import ProviderMerger from "./context/ProviderMerger";
import { QueryClientProviderWrapper } from "./context/QueryCliendProviderWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <body>
        <ProviderMerger
          providers={[
            SessionProvider,
            QueryClientProviderWrapper,
            ChatProvider,
          ]}
        >
          {!hideNavbar && <Navbar />}
          {children}
        </ProviderMerger>
      </body>
    </html>
  );
}

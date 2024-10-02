import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/auth";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Diet",
  description: "Aplicativo para registro de refeições diárias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}

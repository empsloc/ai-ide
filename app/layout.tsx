import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/custom/AppSideBar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "AIIDE",
  description: "Developed by empsloc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <main>
            {" "}
            <Provider>
              {children}
              <Toaster />
            </Provider>
          </main>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

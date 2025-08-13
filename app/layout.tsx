import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "sonner";
import { Github } from "lucide-react";
import Link from "next/link";

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
      <body className="flex flex-col min-h-screen">
        <ConvexClientProvider>
          <main className="flex-grow">
            <Provider>
              {children}
              <Toaster />
            </Provider>
          </main>

          {/* Footer */}
          <footer className="w-full border-t py-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            Developer:{" "}
            <Link className="flex gap-1 items-center" target="_blank" href="https://github.com/empsloc"><Github size={16} />
            <div
             
              
              
              className="hover:underline"
            >
              empsloc
            </div>
            </Link>
          </footer>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import FooterComponent from "@/components/footer/footer";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";
// 1. Import your new components


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Events App", // Updated title
  description: "A modern events application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* This body tag sets up a "sticky footer":
        - 'flex flex-col': Makes the body a vertical flex container
        - 'min-h-screen': Ensures the body is at least 100% of the screen height
        - 'bg-background': Uses your main Shadcn background color
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-background`}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {/* 2. Add your Header at the top */}
        <Header />
        
        {/* - 'flex-grow': This tells the main element to "grow" and
            take up all available space, pushing the footer down.
          - We also center the main content with 'container mx-auto'
        */}
        <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
          {/* Your 'page.tsx' files will be rendered here */}
          {children}
        </main>
        
        {/* 3. Add your Footer at the bottom */}
        <FooterComponent />

      </ThemeProvider>
      </body>
    </html>
  );
}
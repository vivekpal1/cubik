import { Plus_Jakarta_Sans } from "next/font/google";
import { ProviderContext } from "./provider";
import React from "react"
import "./global.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.JSX.Element;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className}`}>
      <ProviderContext>
        {children}
      </ProviderContext>
      </body>
    </html>
  );
}

import { Cormorant_Garamond, Space_Grotesk, Libre_Baskerville } from "next/font/google";
import "./globals.css"

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300","400","600","700"],
  style: ["normal","italic"],
  variable: "--font-cormorant",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-space",
})

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre"
})

export const metadata = {
  title: "Bloomerie Toko Buket Online",
  description: "Buket bunga segar untuk setiap momen spesialmu",
}

export default function RootLayout({ children }) {
  return (
    <html 
      lang="id" 
      className={`${cormorant.variable} ${spaceGrotesk.variable} ${libreBaskerville.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
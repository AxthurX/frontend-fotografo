import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { CartProvider } from "./context/CartContext"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "GELASSO - Bebidas Geladas na Sua Porta",
  description: "Delivery de bebidas geladas com entrega rápida",
}

export const viewport: Viewport = {
  themeColor: "#B91C1C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function GelassoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.variable} font-sans bg-neutral-100 min-h-screen`}>
      <CartProvider>{children}</CartProvider>
    </div>
  )
}

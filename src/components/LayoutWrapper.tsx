"use client"

import { usePathname } from "next/navigation"
import Footer from "@/components/Footer"
import NavbarLogin from "@/components/v0/NavbarLogin"
import { Toaster } from "@/components/ui/toaster"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isGelassoRoute = pathname?.startsWith("/gelasso")

  if (isGelassoRoute) {
    return <>{children}</>
  }

  return (
    <main className="flex min-h-screen flex-col">
      <NavbarLogin />
      <div className="w-full">{children}</div>
      <Footer />
      <Toaster />
    </main>
  )
}

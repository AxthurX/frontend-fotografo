"use client"

import { Home, LayoutGrid, FileText, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/gelasso", icon: Home, label: "Início" },
  { href: "/gelasso/categorias", icon: LayoutGrid, label: "Categorias" },
  { href: "/gelasso/pedidos", icon: FileText, label: "Pedidos" },
  { href: "/gelasso/perfil", icon: User, label: "Perfil" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <ul className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-1 ${
                  isActive ? "text-red-600" : "text-gray-500"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

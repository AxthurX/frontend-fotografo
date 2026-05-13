"use client"

import {
  ArrowLeft,
  Bell,
  ChevronRight,
  CreditCard,
  HelpCircle,
  LogOut,
  MapPin,
  Settings,
  User,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BottomNav } from "../components/BottomNav"

const menuItems = [
  { icon: MapPin, label: "Meus endereços", href: "/gelasso/endereco" },
  { icon: CreditCard, label: "Formas de pagamento", href: "/gelasso/pagamento" },
  { icon: Bell, label: "Notificações", href: "#" },
  { icon: Settings, label: "Configurações", href: "#" },
  { icon: HelpCircle, label: "Ajuda", href: "#" },
]

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-neutral-100 pb-20">
      {/* Header */}
      <header className="bg-red-700 text-white px-4 py-6 rounded-b-3xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Usuário</h1>
            <p className="text-red-200 text-sm">usuario@email.com</p>
          </div>
        </div>
      </header>

      {/* Menu Items */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-xl overflow-hidden">
          {menuItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <item.icon className="w-5 h-5 text-gray-500" />
              <span className="flex-1 text-gray-800">{item.label}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          type="button"
          className="flex items-center gap-4 w-full bg-white rounded-xl px-4 py-4 mt-4 hover:bg-gray-50 transition-colors text-red-600"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair da conta</span>
        </button>
      </div>

      <BottomNav />
    </div>
  )
}

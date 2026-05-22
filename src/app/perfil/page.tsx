"use client"

import Link from "next/link"
import { ArrowLeft, User, MapPin, CreditCard, Bell, HelpCircle, LogOut } from "lucide-react"
import { BottomNav } from "@/components/gelasso/BottomNav"

const menuItems = [
  { icon: User, label: "Meus dados", href: "#" },
  { icon: MapPin, label: "Endereços salvos", href: "#" },
  { icon: CreditCard, label: "Formas de pagamento", href: "#" },
  { icon: Bell, label: "Notificações", href: "#" },
  { icon: HelpCircle, label: "Ajuda", href: "#" },
]

export default function PerfilPage() {
  return (
    <div className="min-h-screen bg-neutral-100 pb-20">
      <header className="bg-red-700 px-4 py-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-red-700" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Usuário</h1>
              <p className="text-white/80 text-sm">usuario@email.com</p>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white mt-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-4 px-4 py-4 border-b border-gray-100"
          >
            <item.icon className="w-5 h-5 text-gray-500" />
            <span className="flex-1 text-gray-800">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="bg-white mt-2">
        <button className="flex items-center gap-4 px-4 py-4 w-full text-left">
          <LogOut className="w-5 h-5 text-red-700" />
          <span className="text-red-700">Sair</span>
        </button>
      </div>

      <BottomNav />
    </div>
  )
}

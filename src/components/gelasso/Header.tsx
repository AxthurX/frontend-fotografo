"use client"

import Link from "next/link"
import { Bell, User, MapPin, Search, ChevronDown, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"

export function Header() {
  const { totalItems } = useCart()

  return (
    <header className="bg-red-700 text-white sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-10 h-10" fill="currentColor">
                <path d="M20 5 L25 15 L20 12 L15 15 Z" />
                <circle cx="20" cy="25" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
                <text x="20" y="29" textAnchor="middle" fontSize="8" fontWeight="bold">G</text>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">GELASSO</h1>
              <p className="text-xs opacity-90">BEBIDAS GELADAS NA SUA PORTA</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative">
              <Bell className="w-6 h-6" />
            </button>
            <Link href="/perfil">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>

        <button className="w-full flex items-center gap-2 bg-red-800/50 rounded-lg px-3 py-2 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm flex-1 text-left">Entregar em: <strong>Nacional, PVH</strong></span>
          <ChevronDown className="w-4 h-4" />
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="O que vai beber hoje?"
            className="w-full bg-white text-gray-800 rounded-lg pl-10 pr-4 py-3 text-sm"
          />
        </div>
      </div>

      {totalItems > 0 && (
        <Link
          href="/carrinho"
          className="fixed bottom-20 right-4 z-50 bg-red-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-white text-red-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </Link>
      )}
    </header>
  )
}

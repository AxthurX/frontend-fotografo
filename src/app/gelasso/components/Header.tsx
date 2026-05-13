"use client"

import { Bell, MapPin, Search, User, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useCart } from "../context/CartContext"

export function Header() {
  const { itemCount } = useCart()

  return (
    <header className="bg-red-700 text-white px-4 pt-3 pb-4 rounded-b-3xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg
              viewBox="0 0 40 40"
              className="w-10 h-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 5L22 15L30 12L25 20L35 25L25 27L28 35L20 30L12 35L15 27L5 25L15 20L10 12L18 15L20 5Z"
                fill="#FFD700"
                stroke="#FFD700"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-yellow-400">
              GELASSO
            </h1>
            <p className="text-xs text-red-200">BEBIDAS GELADAS NA SUA PORTA</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="relative" aria-label="Notificações">
            <Bell className="w-6 h-6" />
          </button>
          <Link href="/gelasso/carrinho" className="relative" aria-label="Perfil">
            <User className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 bg-red-800/50 rounded-full px-4 py-2 w-full mb-3"
      >
        <MapPin className="w-4 h-4 text-red-300" />
        <span className="text-sm">Entregar em:</span>
        <span className="text-sm font-medium">Nacional, PVH</span>
        <ChevronDown className="w-4 h-4 ml-auto" />
      </button>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="O que vai beber hoje?"
          className="w-full bg-white text-gray-800 rounded-full py-3 pl-12 pr-4 text-sm placeholder:text-gray-400"
        />
      </div>
    </header>
  )
}

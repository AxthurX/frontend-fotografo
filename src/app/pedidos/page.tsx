"use client"

import Link from "next/link"
import { ArrowLeft, Package } from "lucide-react"
import { BottomNav } from "@/components/gelasso/BottomNav"

export default function PedidosPage() {
  return (
    <div className="min-h-screen bg-neutral-100 pb-20">
      <header className="bg-white px-4 py-4 flex items-center gap-4">
        <Link href="/" className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </Link>
        <h1 className="text-lg font-bold text-gray-800">Meus Pedidos</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-8 mt-20">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-center">Você ainda não fez nenhum pedido.</p>
        <Link href="/" className="mt-4 text-red-700 font-medium">
          Começar a comprar
        </Link>
      </div>

      <BottomNav />
    </div>
  )
}

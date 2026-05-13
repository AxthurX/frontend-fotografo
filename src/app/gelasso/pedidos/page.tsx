"use client"

import { ArrowLeft, Clock, Package } from "lucide-react"
import { useRouter } from "next/navigation"
import { BottomNav } from "../components/BottomNav"

export default function OrdersPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-neutral-100 pb-20">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-red-700 text-white">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold">Meus Pedidos</h1>
        <div className="w-10" />
      </header>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <Package className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Nenhum pedido ainda
        </h2>
        <p className="text-gray-500 text-center">
          Seus pedidos aparecerão aqui depois que você fizer uma compra.
        </p>
      </div>

      <BottomNav />
    </div>
  )
}

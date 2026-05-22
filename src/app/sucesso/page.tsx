"use client"

import Link from "next/link"
import { CheckCircle, Clock, Package } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useEffect } from "react"

export default function SucessoPage() {
  const { subtotal, clearCart } = useCart()
  const deliveryFee = 4.90
  const total = subtotal + deliveryFee
  const orderNumber = Math.floor(Math.random() * 9000) + 1000

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        
        <h1 className="text-xl font-bold text-gray-800 text-center mb-2">
          Pedido recebido com sucesso!
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Já estamos preparando tudo pra você.
        </p>

        <div className="w-full bg-white rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-500" />
              <span className="text-gray-800">Pedido #{orderNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-gray-800">Entrega em até 30 min</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-red-700">Pagamento</span>
            <span className="text-red-700 font-bold">Pix</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-500">Total</span>
            <span className="font-bold text-gray-800">
              R$ {total > 0 ? total.toFixed(2).replace(".", ",") : "31,86"}
            </span>
          </div>
        </div>

        <Link
          href="/pedidos"
          className="w-full bg-red-700 text-white font-bold py-4 rounded-lg text-center mb-4"
        >
          ACOMPANHAR PEDIDO
        </Link>
        <Link
          href="/"
          className="w-full text-gray-800 font-bold py-4 text-center"
        >
          VOLTAR PARA O INÍCIO
        </Link>
      </div>
    </div>
  )
}

"use client"

import { Check, Clock } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useCart } from "../../context/CartContext"

export default function SuccessPage() {
  const { total, deliveryFee, clearCart } = useCart()
  const finalTotal = total + deliveryFee
  const orderNumber = Math.floor(1000 + Math.random() * 9000)

  useEffect(() => {
    // Clear cart after successful order
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Success Icon */}
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </div>
      </div>

      {/* Success Message */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        Pedido recebido com sucesso!
      </h1>
      <p className="text-gray-500 text-center mb-8">
        Já estamos preparando tudo pra você.
      </p>

      {/* Order Info */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-5 h-5" />
          <span>Pedido #{orderNumber}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-5 h-5" />
          <span>Entrega em até 30 min</span>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-gray-50 rounded-xl p-4 w-full max-w-sm mb-8">
        <div className="flex items-center justify-between">
          <span className="text-red-600 font-medium">Pagamento</span>
          <span className="text-gray-600">Pix</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-red-600 font-medium">Total</span>
          <span className="font-bold text-gray-900">
            R$ {finalTotal > 0 ? finalTotal.toFixed(2).replace(".", ",") : "31,86"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full max-w-sm space-y-3">
        <Link
          href="/gelasso/pedidos"
          className="block w-full bg-red-600 text-white font-semibold py-4 rounded-lg text-center hover:bg-red-700 transition-colors"
        >
          ACOMPANHAR PEDIDO
        </Link>
        <Link
          href="/gelasso"
          className="block w-full text-gray-700 font-semibold py-4 text-center hover:text-gray-900 transition-colors"
        >
          VOLTAR PARA O INÍCIO
        </Link>
      </div>
    </div>
  )
}

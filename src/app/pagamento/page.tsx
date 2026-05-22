"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"
import { useCart } from "@/context/CartContext"

const paymentMethods = [
  { id: "pix", name: "Pix", description: "Aprovação imediata", icon: "◆" },
  { id: "dinheiro", name: "Dinheiro", description: "Pague na entrega", icon: "💵" },
  { id: "cartao", name: "Cartão na entrega", description: "Débito ou crédito", icon: "💳" },
]

export default function PagamentoPage() {
  const [selectedMethod, setSelectedMethod] = useState("pix")
  const [troco, setTroco] = useState("")
  const { subtotal } = useCart()
  const deliveryFee = 4.90
  const total = subtotal + deliveryFee

  return (
    <div className="min-h-screen bg-neutral-100 pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center gap-4">
        <Link href="/endereco" className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </Link>
        <h1 className="text-lg font-bold text-gray-800">Pagamento</h1>
      </header>

      {/* Payment Methods */}
      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-gray-800 font-medium mb-4">Escolha a forma de pagamento</h2>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                selectedMethod === method.id
                  ? "border-red-700 bg-red-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <span className="text-2xl">{method.icon}</span>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800">{method.name}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedMethod === method.id
                    ? "border-red-700 bg-red-700"
                    : "border-gray-300"
                }`}
              >
                {selectedMethod === method.id && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Change for cash */}
      {selectedMethod === "dinheiro" && (
        <div className="bg-white mt-2 px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-800">Troco para quanto? (opcional)</span>
            <input
              type="text"
              value={troco}
              onChange={(e) => setTroco(e.target.value)}
              placeholder="R$ 0,00"
              className="w-24 bg-gray-100 rounded-lg px-3 py-2 text-sm text-right"
            />
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-white mt-2 px-4 py-4">
        <div className="flex items-center gap-2 text-gray-500">
          <Shield className="w-4 h-4" />
          <span className="text-sm">Seus dados estão protegidos</span>
        </div>
      </div>

      {/* Finalize Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
        <Link
          href="/sucesso"
          className="block w-full bg-red-700 text-white font-bold py-4 rounded-lg text-center"
        >
          FINALIZAR PEDIDO
        </Link>
      </div>
    </div>
  )
}

"use client"

import { ArrowLeft, Check, CreditCard, Banknote, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useCart } from "../context/CartContext"

type PaymentMethod = "pix" | "cash" | "card"

interface PaymentOption {
  id: PaymentMethod
  name: string
  description: string
  icon: React.ReactNode
}

const paymentOptions: PaymentOption[] = [
  {
    id: "pix",
    name: "Pix",
    description: "Aprovação imediata",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <path
          d="M9.5 9.5L14.5 14.5M14.5 9.5L9.5 14.5"
          stroke="#00BFA5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M7 17L3.5 13.5C2.5 12.5 2.5 11 3.5 10L10 3.5C11 2.5 12.5 2.5 13.5 3.5L20.5 10.5C21.5 11.5 21.5 13 20.5 14L14 20.5C13 21.5 11.5 21.5 10.5 20.5L7 17Z"
          stroke="#00BFA5"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "cash",
    name: "Dinheiro",
    description: "Pague na entrega",
    icon: <Banknote className="w-6 h-6 text-green-600" />,
  },
  {
    id: "card",
    name: "Cartão na entrega",
    description: "Débito ou crédito",
    icon: <CreditCard className="w-6 h-6 text-blue-600" />,
  },
]

export default function PaymentPage() {
  const router = useRouter()
  const { total, deliveryFee } = useCart()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("pix")
  const [changeAmount, setChangeAmount] = useState("")

  const finalTotal = total + deliveryFee

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-gray-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-gray-900">
          Pagamento
        </h1>
        <div className="w-10" />
      </header>

      {/* Payment Methods */}
      <div className="px-4 py-6">
        <h2 className="text-gray-600 mb-4">Escolha a forma de pagamento</h2>

        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedMethod(option.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                selectedMethod === option.id
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="shrink-0">{option.icon}</div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">{option.name}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === option.id
                    ? "border-red-500 bg-red-500"
                    : "border-gray-300"
                }`}
              >
                {selectedMethod === option.id && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Change Amount (only for cash) */}
        {selectedMethod === "cash" && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label htmlFor="change" className="text-gray-600">
                Troco para quanto? (opcional)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">R$</span>
                <input
                  id="change"
                  type="text"
                  value={changeAmount}
                  onChange={(e) => setChangeAmount(e.target.value)}
                  placeholder="0,00"
                  className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-right text-gray-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="flex items-center gap-2 mt-6 text-gray-500 text-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>Seus dados estão protegidos</span>
        </div>
      </div>

      {/* Total and Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Total</span>
          <span className="text-xl font-bold text-gray-900">
            R$ {finalTotal.toFixed(2).replace(".", ",")}
          </span>
        </div>
        <Link
          href="/gelasso/sucesso"
          className="block w-full bg-red-600 text-white font-semibold py-4 rounded-lg text-center hover:bg-red-700 transition-colors"
        >
          FINALIZAR PEDIDO
        </Link>
      </div>
    </div>
  )
}

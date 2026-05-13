"use client"

import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "../context/CartContext"

export default function CartPage() {
  const router = useRouter()
  const {
    items,
    updateQuantity,
    removeItem,
    total,
    deliveryFee,
    coupon,
    setCoupon,
    observation,
    setObservation,
  } = useCart()

  const finalTotal = total + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
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
            Meu carrinho
          </h1>
          <div className="w-10" />
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
          <Link
            href="/gelasso"
            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    )
  }

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
          Meu carrinho
        </h1>
        <button type="button" className="text-red-600 font-medium text-sm">
          Editar
        </button>
      </header>

      {/* Cart Items */}
      <div className="px-4 py-4 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 pb-4 border-b border-gray-100"
          >
            <div className="w-16 h-20 bg-gradient-to-b from-green-600 to-green-800 rounded flex items-center justify-center text-white text-xs font-bold shrink-0">
              {item.name.split(" ")[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.details?.volume}</p>
              <p className="text-sm text-gray-500">
                R$ {item.price.toFixed(2).replace(".", ",")}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">
                R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
              </p>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="mt-2 text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remover item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Cupom de desconto</span>
          <button
            type="button"
            onClick={() => setCoupon(coupon ? null : "PROMO10")}
            className="text-red-600 font-medium text-sm"
          >
            {coupon ? "Remover" : "Adicionar"}
          </button>
        </div>
        {coupon && (
          <p className="text-green-600 text-sm mt-1">Cupom {coupon} aplicado</p>
        )}
      </div>

      {/* Observation */}
      <div className="px-4 py-3 border-t border-gray-100">
        <label className="block text-gray-600 mb-2" htmlFor="observation">
          Observação do pedido
        </label>
        <input
          id="observation"
          type="text"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
          placeholder="Ex: Sem gelo, por favor."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder:text-gray-400"
        />
      </div>

      {/* Summary */}
      <div className="px-4 py-4 border-t border-gray-100 space-y-2">
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal</span>
          <span>R$ {total.toFixed(2).replace(".", ",")}</span>
        </div>
        <div className="flex items-center justify-between text-gray-600">
          <span>Taxa de entrega</span>
          <span>R$ {deliveryFee.toFixed(2).replace(".", ",")}</span>
        </div>
        <div className="flex items-center justify-between text-xl font-bold text-gray-900 pt-2">
          <span>TOTAL</span>
          <span>R$ {finalTotal.toFixed(2).replace(".", ",")}</span>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        <Link
          href="/gelasso/endereco"
          className="block w-full bg-red-600 text-white font-semibold py-4 rounded-lg text-center hover:bg-red-700 transition-colors"
        >
          CONTINUAR PEDIDO
        </Link>
      </div>
    </div>
  )
}

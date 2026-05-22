"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Trash2, Minus, Plus } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function CarrinhoPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const [coupon, setCoupon] = useState("")
  const [observation, setObservation] = useState("")
  const deliveryFee = 4.90
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-100 flex flex-col">
        <header className="bg-white px-4 py-4 flex items-center gap-4">
          <Link href="/" className="w-10 h-10 flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-lg font-bold text-gray-800">Meu carrinho</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <p className="text-gray-500 text-lg mb-4">Seu carrinho está vazio</p>
          <Link href="/" className="bg-red-700 text-white font-bold py-3 px-6 rounded-lg">
            Continuar comprando
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-100 pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-lg font-bold text-gray-800">Meu carrinho</h1>
        </div>
        <button className="text-red-700 font-medium text-sm">Editar</button>
      </header>

      {/* Cart Items */}
      <div className="bg-white mt-2 px-4 py-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 py-4 border-b border-gray-100 last:border-0">
            <div className="relative w-16 h-20 bg-gray-100 rounded-lg overflow-hidden">
              <Image src={item.image} alt={item.name} fill className="object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-xs text-gray-500">{item.description}</p>
              <p className="text-red-700 font-bold mt-1">
                R$ {item.price.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button onClick={() => removeItem(item.id)} className="text-gray-400">
                <Trash2 className="w-5 h-5" />
              </button>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <p className="text-gray-800 font-bold text-sm">
                R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon */}
      <div className="bg-white mt-2 px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-800">Cupom de desconto</span>
          <button className="text-red-700 font-medium text-sm">Adicionar</button>
        </div>
      </div>

      {/* Observation */}
      <div className="bg-white mt-2 px-4 py-4">
        <label className="text-gray-800 block mb-2">Observação do pedido</label>
        <input
          type="text"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
          placeholder="Ex: Sem gelo, por favor."
          className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm"
        />
      </div>

      {/* Summary */}
      <div className="bg-white mt-2 px-4 py-4">
        <div className="flex justify-between py-2">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium">R$ {subtotal.toFixed(2).replace(".", ",")}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-500">Taxa de entrega</span>
          <span className="font-medium">R$ {deliveryFee.toFixed(2).replace(".", ",")}</span>
        </div>
        <div className="flex justify-between py-2 border-t border-gray-100 mt-2">
          <span className="font-bold text-gray-800">TOTAL</span>
          <span className="font-bold text-gray-800 text-lg">
            R$ {total.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
        <Link
          href="/endereco"
          className="block w-full bg-red-700 text-white font-bold py-4 rounded-lg text-center"
        >
          CONTINUAR PEDIDO
        </Link>
      </div>
    </div>
  )
}

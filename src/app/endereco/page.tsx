"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function EnderecoPage() {
  const [formData, setFormData] = useState({
    rua: "Av. Calama, 1234",
    numero: "567",
    bairro: "Nacional",
    complemento: "Perto da praça",
    referencia: "Casa de muro azul",
    salvar: true,
  })

  return (
    <div className="min-h-screen bg-neutral-100 pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center gap-4">
        <Link href="/carrinho" className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </Link>
        <h1 className="text-lg font-bold text-gray-800">Endereço de entrega</h1>
      </header>

      {/* Form */}
      <div className="bg-white mt-2 px-4 py-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2">
            <label className="text-sm text-gray-500 block mb-1">Rua</label>
            <input
              type="text"
              value={formData.rua}
              onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Número</label>
            <input
              type="text"
              value={formData.numero}
              onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-500 block mb-1">Bairro</label>
          <input
            type="text"
            value={formData.bairro}
            onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-500 block mb-1">Complemento (opcional)</label>
          <input
            type="text"
            value={formData.complemento}
            onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-500 block mb-1">Referência (opcional)</label>
          <input
            type="text"
            value={formData.referencia}
            onChange={(e) => setFormData({ ...formData, referencia: e.target.value })}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-800">Salvar endereço</span>
          <button
            onClick={() => setFormData({ ...formData, salvar: !formData.salvar })}
            className={`w-12 h-6 rounded-full transition-colors ${
              formData.salvar ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                formData.salvar ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
        <Link
          href="/pagamento"
          className="block w-full bg-red-700 text-white font-bold py-4 rounded-lg text-center"
        >
          IR PARA PAGAMENTO
        </Link>
      </div>
    </div>
  )
}

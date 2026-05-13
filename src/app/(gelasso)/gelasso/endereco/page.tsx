"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddressPage() {
  const router = useRouter()
  const [saveAddress, setSaveAddress] = useState(true)
  const [address, setAddress] = useState({
    street: "",
    number: "",
    neighborhood: "",
    complement: "",
    reference: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))
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
          Endereço de entrega
        </h1>
        <div className="w-10" />
      </header>

      {/* Form */}
      <div className="px-4 py-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="street" className="block text-sm text-gray-500 mb-1">
              Rua
            </label>
            <input
              id="street"
              name="street"
              type="text"
              value={address.street}
              onChange={handleChange}
              placeholder="Av. Calama, 1234"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <div className="w-24">
            <label htmlFor="number" className="block text-sm text-gray-500 mb-1">
              Número
            </label>
            <input
              id="number"
              name="number"
              type="text"
              value={address.number}
              onChange={handleChange}
              placeholder="567"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="neighborhood"
            className="block text-sm text-gray-500 mb-1"
          >
            Bairro
          </label>
          <input
            id="neighborhood"
            name="neighborhood"
            type="text"
            value={address.neighborhood}
            onChange={handleChange}
            placeholder="Nacional"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="complement"
            className="block text-sm text-gray-500 mb-1"
          >
            Complemento (opcional)
          </label>
          <input
            id="complement"
            name="complement"
            type="text"
            value={address.complement}
            onChange={handleChange}
            placeholder="Perto da praça"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400"
          />
        </div>

        <div>
          <label htmlFor="reference" className="block text-sm text-gray-500 mb-1">
            Referência (opcional)
          </label>
          <input
            id="reference"
            name="reference"
            type="text"
            value={address.reference}
            onChange={handleChange}
            placeholder="Casa de muro azul"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Save Address Toggle */}
        <div className="flex items-center justify-between py-3">
          <span className="text-gray-700">Salvar endereço</span>
          <button
            type="button"
            onClick={() => setSaveAddress(!saveAddress)}
            className={`w-14 h-8 rounded-full transition-colors ${
              saveAddress ? "bg-green-500" : "bg-gray-300"
            }`}
            role="switch"
            aria-checked={saveAddress}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow transition-transform ${
                saveAddress ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        <Link
          href="/gelasso/pagamento"
          className="block w-full bg-red-600 text-white font-semibold py-4 rounded-lg text-center hover:bg-red-700 transition-colors"
        >
          IR PARA PAGAMENTO
        </Link>
      </div>
    </div>
  )
}

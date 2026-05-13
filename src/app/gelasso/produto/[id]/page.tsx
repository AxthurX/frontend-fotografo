"use client"

import {
  ArrowLeft,
  Beer,
  ChevronRight,
  Clock,
  Globe,
  Heart,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Wine,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useCart } from "../../context/CartContext"
import { getProductById, products } from "../../data/products"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = getProductById(params.id as string)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Produto não encontrado</p>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 2)

  const handleAddToCart = () => {
    addItem(product, quantity)
    router.push("/gelasso/carrinho")
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 absolute top-0 left-0 right-0 z-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
            aria-label="Favoritar"
          >
            <Heart className="w-5 h-5 text-gray-800" />
          </button>
          <button
            type="button"
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
            aria-label="Compartilhar"
          >
            <Share2 className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </header>

      {/* Product Image */}
      <div className="bg-gradient-to-b from-green-100 to-green-50 pt-16 pb-8 flex items-center justify-center">
        <div className="relative">
          {product.badge && (
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
              {product.badge}
            </span>
          )}
          <div className="w-40 h-56 bg-gradient-to-b from-green-600 to-green-800 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-xl">
            {product.name.split(" ")[0]}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-gray-500 text-sm">{product.details?.volume}</p>

        {product.rating && (
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-800">{product.rating}</span>
            <span className="text-gray-500 text-sm">
              ({product.reviews} avaliações)
            </span>
          </div>
        )}

        <p className="text-3xl font-bold text-gray-900 mt-4">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </p>

        <p className="text-gray-600 mt-3">{product.description}</p>

        <div className="flex items-center gap-2 mt-4 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Entrega em até 30 min</span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-semibold">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 bg-red-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>

      {/* Combine com */}
      {relatedProducts.length > 0 && (
        <section className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Combine com</h2>
            <Link
              href={`/gelasso/categoria/${product.category}`}
              className="text-red-600 text-sm font-medium flex items-center gap-1"
            >
              Ver todos
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                href={`/gelasso/produto/${p.id}`}
                className="bg-gray-50 rounded-xl p-3 flex gap-3 flex-1"
              >
                <div className="w-12 h-16 bg-gradient-to-b from-green-600 to-green-800 rounded flex items-center justify-center text-white text-xs font-bold">
                  {p.name.split(" ")[0]}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-500">{p.details?.volume}</p>
                  <p className="text-sm font-bold text-gray-800 mt-1">
                    R$ {p.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    addItem(p)
                  }}
                  className="self-center bg-green-500 text-white rounded-full p-1"
                  aria-label="Adicionar"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Product Details */}
      <section className="px-4 py-4 border-t border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Detalhes</h2>
        <div className="space-y-3">
          {product.details?.alcoholContent && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Beer className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Teor alcoólico</span>
              </div>
              <span className="font-medium text-gray-800">
                {product.details.alcoholContent}
              </span>
            </div>
          )}
          {product.details?.origin && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">País de origem</span>
              </div>
              <span className="font-medium text-gray-800">
                {product.details.origin}
              </span>
            </div>
          )}
          {product.details?.type && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Wine className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Tipo</span>
              </div>
              <span className="font-medium text-gray-800">
                {product.details.type}
              </span>
            </div>
          )}
          {product.details?.volume && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Beer className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Volume</span>
              </div>
              <span className="font-medium text-gray-800">
                {product.details.volume}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Delivery and Payment Info */}
      <section className="px-4 py-4 border-t border-gray-100">
        <div className="flex gap-4">
          <div className="flex-1 bg-gray-50 rounded-xl p-3 flex items-center gap-3">
            <Truck className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-xs text-gray-500">Entrega rápida</p>
              <p className="text-sm font-semibold text-gray-800">
                em até 30 minutos
              </p>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl p-3 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Pagamento</p>
              <p className="text-sm font-semibold text-gray-800">100% seguro</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

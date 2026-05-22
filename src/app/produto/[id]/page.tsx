"use client"

import { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, Share2, Star, Clock, Minus, Plus, ShoppingCart, Truck, Shield } from "lucide-react"
import { BottomNav } from "@/components/gelasso/BottomNav"
import { useCart } from "@/context/CartContext"
import { products } from "@/data/products"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products.find((p) => p.id === parseInt(id))
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Produto não encontrado</p>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        description: product.volume,
        price: product.price,
        image: product.image,
      })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 pb-20">
      {/* Header */}
      <div className="bg-white">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="w-10 h-10 flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsFavorite(!isFavorite)}>
              <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-800"}`} />
            </button>
            <button>
              <Share2 className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div className="relative h-64 bg-gradient-to-b from-green-900 to-green-700">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-8"
          />
          {product.badge && (
            <span className="absolute bottom-4 left-4 bg-yellow-400 text-sm font-semibold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white px-4 py-4 mt-2">
        <h1 className="text-xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-500 text-sm">{product.volume}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews} avaliações)</span>
        </div>

        <p className="text-2xl font-bold text-gray-800 mt-3">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </p>

        <p className="text-gray-600 text-sm mt-3">{product.description}</p>

        <div className="flex items-center gap-2 mt-3 text-gray-500">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Entrega em até {product.deliveryTime}</span>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex items-center bg-gray-100 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Minus className="w-5 h-5 text-gray-600" />
            </button>
            <span className="w-10 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-white px-4 py-4 mt-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">Combine com</h2>
            <Link href={`/categoria/${product.category}`} className="text-red-700 text-sm font-medium">
              Ver todos
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/produto/${p.id}`} className="min-w-[140px]">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="relative h-20 mb-2">
                    <Image src={p.image} alt={p.name} fill className="object-contain" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-800 truncate">{p.name}</h3>
                  <p className="text-xs text-gray-500">{p.volume}</p>
                  <p className="text-red-700 font-bold text-sm mt-1">
                    R$ {p.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Product Details */}
      <div className="bg-white px-4 py-4 mt-2">
        <h2 className="font-bold text-gray-800 mb-3">Detalhes</h2>
        <div className="space-y-2">
          {product.alcoholContent && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Teor alcoólico</span>
              <span className="font-medium">{product.alcoholContent}</span>
            </div>
          )}
          {product.origin && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">País de origem</span>
              <span className="font-medium">{product.origin}</span>
            </div>
          )}
          {product.type && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Tipo</span>
              <span className="font-medium">{product.type}</span>
            </div>
          )}
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Volume</span>
            <span className="font-medium">{product.volume}</span>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-white px-4 py-4 mt-2 mb-4">
        <div className="flex gap-4">
          <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <Truck className="w-8 h-8 text-red-700" />
            <div>
              <p className="font-semibold text-sm">Entrega rápida</p>
              <p className="text-xs text-gray-500">em até 30 minutos</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <Shield className="w-8 h-8 text-red-700" />
            <div>
              <p className="font-semibold text-sm">Pagamento</p>
              <p className="text-xs text-gray-500">100% seguro</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

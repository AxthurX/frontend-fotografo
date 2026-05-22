"use client"

import Link from "next/link"
import Image from "next/image"
import { Plus } from "lucide-react"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/data/products"

interface ProductCardProps {
  product: Product
  compact?: boolean
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      description: product.volume,
      price: product.price,
      image: product.image,
    })
  }

  if (compact) {
    return (
      <Link href={`/produto/${product.id}`} className="block">
        <div className="bg-white rounded-xl p-3 shadow-sm min-w-[140px]">
          <div className="relative h-24 mb-2">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="font-semibold text-sm text-gray-800 truncate">{product.name}</h3>
          <p className="text-xs text-gray-500 mb-2">{product.volume}</p>
          <div className="flex items-center justify-between">
            <span className="text-red-700 font-bold text-sm">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
            <button
              onClick={handleAddToCart}
              className="w-7 h-7 bg-red-700 text-white rounded-full flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/produto/${product.id}`} className="block">
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <div className="relative h-32 mb-2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
          {product.badge && (
            <span className="absolute top-0 left-0 bg-yellow-400 text-xs font-semibold px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-red-700 font-bold">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 bg-red-700 text-white rounded-full flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  )
}

"use client"

import { Plus } from "lucide-react"
import Link from "next/link"
import type { Product } from "../context/CartContext"
import { useCart } from "../context/CartContext"

interface ProductCardProps {
  product: Product
  size?: "small" | "medium"
}

export function ProductCard({ product, size = "medium" }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <Link
      href={`/gelasso/produto/${product.id}`}
      className={`bg-white rounded-xl overflow-hidden shadow-sm flex flex-col ${
        size === "small" ? "min-w-[120px]" : "min-w-[140px]"
      }`}
    >
      <div className="relative bg-gray-100 p-2">
        <div
          className={`${
            size === "small" ? "h-20" : "h-24"
          } flex items-center justify-center`}
        >
          <div className="w-16 h-20 bg-gradient-to-b from-green-600 to-green-800 rounded-sm flex items-center justify-center text-white text-xs font-bold">
            {product.name.split(" ")[0]}
          </div>
        </div>
      </div>
      <div className="p-2 flex flex-col flex-1">
        <h3 className="text-xs font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-1">
          {product.details?.volume || product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-sm font-bold text-gray-800">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            className="bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
            aria-label="Adicionar ao carrinho"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  )
}

"use client"

import { ArrowLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BottomNav } from "../../../components/BottomNav"
import { ProductCard } from "../../../components/ProductCard"
import { categories, getProductsByCategory } from "../../../data/products"

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params.id as string
  const category = categories.find((c) => c.id === categoryId)
  const products = getProductsByCategory(categoryId)

  return (
    <div className="min-h-screen bg-neutral-100 pb-20">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-red-700 text-white">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold">
          {category?.name || "Categoria"}
        </h1>
        <div className="w-10" />
      </header>

      {/* Products Grid */}
      <div className="p-4">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">
            Nenhum produto encontrado nesta categoria.
          </p>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

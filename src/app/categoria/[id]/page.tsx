"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BottomNav } from "@/components/gelasso/BottomNav"
import { ProductCard } from "@/components/gelasso/ProductCard"
import { products, categories } from "@/data/products"

export default function CategoriaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const category = categories.find((c) => c.id === id)
  const categoryProducts = products.filter((p) => p.category === id)

  return (
    <div className="min-h-screen bg-neutral-100 pb-20">
      <header className="bg-white px-4 py-4 flex items-center gap-4">
        <Link href="/categorias" className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </Link>
        <h1 className="text-lg font-bold text-gray-800">{category?.name || "Categoria"}</h1>
      </header>

      <div className="p-4">
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

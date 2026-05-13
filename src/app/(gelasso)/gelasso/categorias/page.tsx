"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { BottomNav } from "../../components/BottomNav"
import { CategoryIcon } from "../../components/CategoryIcon"
import { categories } from "../../data/products"

export default function CategoriesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-gray-100 bg-red-700 text-white">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold">Categorias</h1>
        <div className="w-10" />
      </header>

      {/* Categories Grid */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryIcon
              key={category.id}
              id={category.id}
              name={category.name}
              icon={category.icon}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

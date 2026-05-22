"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BottomNav } from "@/components/gelasso/BottomNav"
import { CategoryIcon } from "@/components/gelasso/CategoryIcon"
import { categories } from "@/data/products"

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-neutral-100 pb-20">
      <header className="bg-white px-4 py-4 flex items-center gap-4">
        <Link href="/" className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </Link>
        <h1 className="text-lg font-bold text-gray-800">Categorias</h1>
      </header>

      <div className="bg-white mt-2 px-4 py-6">
        <div className="grid grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryIcon key={cat.id} {...cat} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

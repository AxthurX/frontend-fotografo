"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/gelasso/Header"
import { BottomNav } from "@/components/gelasso/BottomNav"
import { ProductCard } from "@/components/gelasso/ProductCard"
import { CategoryIcon } from "@/components/gelasso/CategoryIcon"
import { products, categories, combos } from "@/data/products"

export default function HomePage() {
  const maisPedidos = products.filter((p) => p.badge === "Mais pedido" || p.category === "cervejas").slice(0, 4)
  const gelados = products.filter((p) => p.category === "cervejas" || p.category === "energeticos").slice(0, 4)

  return (
    <div className="min-h-screen bg-neutral-100 pb-20">
      <Header />

      <main className="px-4 py-4">
        {/* Banner Promocional */}
        <div className="relative bg-gradient-to-r from-red-900 to-red-700 rounded-2xl overflow-hidden mb-6">
          <div className="p-4 pr-32">
            <h2 className="text-white text-xl font-black leading-tight mb-1">
              SEU ROLÊ<br />COMEÇA AQUI
            </h2>
            <p className="text-white/80 text-xs mb-3">
              BEBIDAS GELADAS<br />ENTREGA RÁPIDA
            </p>
            <button className="bg-white text-red-700 font-bold text-sm px-4 py-2 rounded-lg">
              PEÇA AGORA
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-32">
            <Image
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&h=200&fit=crop"
              alt="Bebidas"
              fill
              className="object-cover opacity-80"
            />
          </div>
        </div>

        {/* Categorias */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">Categorias</h2>
            <Link href="/categorias" className="text-red-700 text-sm font-medium">
              Ver todas
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {categories.slice(0, 5).map((cat) => (
              <CategoryIcon key={cat.id} {...cat} />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-3 mt-3">
            {categories.slice(5, 10).map((cat) => (
              <CategoryIcon key={cat.id} {...cat} />
            ))}
          </div>
        </section>

        {/* Mais pedidos */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">Mais pedidos</h2>
            <Link href="/categoria/cervejas" className="text-red-700 text-sm font-medium">
              Ver todas
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {maisPedidos.map((product) => (
              <div key={product.id} className="min-w-[160px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Promoções de hoje */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">Promoções de hoje</h2>
            <Link href="/categoria/combos" className="text-red-700 text-sm font-medium">
              Ver todas
            </Link>
          </div>
          <div className="relative bg-gradient-to-r from-red-800 to-red-600 rounded-2xl overflow-hidden">
            <div className="p-4 pr-40">
              <h3 className="text-white font-black text-lg leading-tight mb-2">
                VODKA + ENERGÉTICO<br />+ FRUTAICE
              </h3>
              <p className="text-white/70 text-sm line-through">DE R$ 39,90</p>
              <p className="text-white font-black text-xl">POR R$ 29,90</p>
              <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mt-2">
                ECONOMIZE R$ 10,00
              </span>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-36">
              <Image
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&h=250&fit=crop"
                alt="Promoção"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Gelados pra agora */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">Gelados pra agora</h2>
            <Link href="/categoria/cervejas" className="text-red-700 text-sm font-medium">
              Ver todas
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {gelados.map((product) => (
              <div key={product.id} className="min-w-[140px]">
                <ProductCard product={product} compact />
              </div>
            ))}
          </div>
        </section>

        {/* Combos Gelasso */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">Combos Gelasso</h2>
            <Link href="/categoria/combos" className="text-red-700 text-sm font-medium">
              Ver todos
            </Link>
          </div>
          <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-2xl p-4 flex items-center gap-4">
            <div className="flex-1">
              <span className="text-yellow-400 font-black text-sm">COMBO ESQUENTA</span>
              <p className="text-white text-xs mb-2">1 Vodka + 2 Energéticos + Gelo saborizado</p>
              <p className="text-white font-black text-lg">R$ 49,90</p>
            </div>
            <Link
              href="/categoria/combos"
              className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg"
            >
              VER AGORA
            </Link>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

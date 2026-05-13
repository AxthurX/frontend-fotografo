"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "./components/BottomNav"
import { CategoryIcon } from "./components/CategoryIcon"
import { Header } from "./components/Header"
import { ProductCard } from "./components/ProductCard"
import {
  categories,
  combos,
  getColdProducts,
  getMostOrdered,
  promotions,
} from "./data/products"

export default function GelassoHome() {
  const mostOrdered = getMostOrdered()
  const coldProducts = getColdProducts()

  return (
    <div className="min-h-screen bg-neutral-100 pb-20">
      <Header />

      <main className="px-4 py-4">
        {/* Banner Promocional */}
        <div className="bg-gradient-to-r from-red-800 to-red-600 rounded-2xl p-4 mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-white text-xl font-bold mb-1">
              SEU ROLÊ COMEÇA AQUI
            </h2>
            <p className="text-red-200 text-sm mb-3">
              BEBIDAS GELADAS
              <br />
              ENTREGA RÁPIDA
            </p>
            <button
              type="button"
              className="bg-white text-red-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-red-50 transition-colors"
            >
              PEÇA AGORA
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 flex items-center opacity-90">
            <div className="flex gap-2">
              <div className="w-12 h-24 bg-green-600 rounded-sm transform rotate-6" />
              <div className="w-12 h-24 bg-red-500 rounded-sm transform -rotate-3" />
              <div className="w-12 h-24 bg-green-700 rounded-sm transform rotate-3" />
            </div>
          </div>
        </div>

        {/* Categorias */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Categorias</h2>
            <Link
              href="/gelasso/categorias"
              className="text-red-600 text-sm font-medium flex items-center gap-1"
            >
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <CategoryIcon
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
              />
            ))}
          </div>
        </section>

        {/* Mais Pedidos */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Mais pedidos</h2>
            <Link
              href="/gelasso/categoria/cervejas"
              className="text-red-600 text-sm font-medium flex items-center gap-1"
            >
              Ver todos
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {mostOrdered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Promoções de Hoje */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Promoções de hoje</h2>
            <Link
              href="/gelasso/promocoes"
              className="text-red-600 text-sm font-medium flex items-center gap-1"
            >
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-gradient-to-r from-red-900 to-red-700 rounded-2xl p-4 relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg">{promo.title}</h3>
                <p className="text-red-300 text-sm line-through">
                  DE R$ {promo.originalPrice.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-white text-2xl font-bold">
                  POR R$ {promo.promoPrice.toFixed(2).replace(".", ",")}
                </p>
                <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mt-2">
                  ECONOMIZE R$ {promo.discount.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="flex gap-2 opacity-80">
                  <div className="w-16 h-28 bg-red-600 rounded transform rotate-6" />
                  <div className="w-10 h-20 bg-blue-500 rounded transform -rotate-3" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Gelados pra agora */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Gelados pra agora</h2>
            <Link
              href="/gelasso/categoria/cervejas"
              className="text-red-600 text-sm font-medium flex items-center gap-1"
            >
              Ver todos
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {coldProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Combos Gelasso */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Combos Gelasso</h2>
            <Link
              href="/gelasso/combos"
              className="text-red-600 text-sm font-medium flex items-center gap-1"
            >
              Ver todos
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="bg-gray-900 rounded-2xl p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="text-yellow-400 font-bold text-lg">{combo.title}</h3>
                <p className="text-gray-400 text-sm">{combo.description}</p>
                <p className="text-white font-bold text-xl mt-2">
                  R$ {combo.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <button
                type="button"
                className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                VER AGORA
              </button>
            </div>
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

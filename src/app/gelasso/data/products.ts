import type { Product } from "../context/CartContext"

export const categories = [
  { id: "cervejas", name: "Cervejas", icon: "beer" },
  { id: "whisky", name: "Whisky", icon: "whisky" },
  { id: "gin", name: "Gin", icon: "gin" },
  { id: "frutaice", name: "Frutaice", icon: "frutaice" },
  { id: "combos", name: "Combos", icon: "combo" },
  { id: "energeticos", name: "Energéticos", icon: "energy" },
  { id: "refrigerantes", name: "Refrigerantes", icon: "soda" },
  { id: "gelo", name: "Gelo", icon: "ice" },
  { id: "conveniencia", name: "Conveniência", icon: "store" },
  { id: "vodka", name: "Vodka", icon: "vodka" },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Heineken Long Neck",
    description: "Cerveja puro malte, gelada do jeito que tem que ser.",
    price: 8.99,
    image: "/gelasso/products/heineken.jpg",
    category: "cervejas",
    rating: 4.8,
    reviews: 324,
    badge: "Mais pedido",
    details: {
      alcoholContent: "5%",
      origin: "Holanda",
      type: "Lager",
      volume: "330ml",
    },
  },
  {
    id: "2",
    name: "Skol Long Neck",
    description: "A cerveja que desce redondo.",
    price: 7.49,
    image: "/gelasso/products/skol.jpg",
    category: "cervejas",
    rating: 4.5,
    reviews: 256,
    details: {
      alcoholContent: "4.7%",
      origin: "Brasil",
      type: "Pilsen",
      volume: "330ml",
    },
  },
  {
    id: "3",
    name: "Budweiser Long Neck",
    description: "The King of Beers.",
    price: 8.49,
    image: "/gelasso/products/budweiser.jpg",
    category: "cervejas",
    rating: 4.6,
    reviews: 189,
    details: {
      alcoholContent: "5%",
      origin: "EUA",
      type: "Lager",
      volume: "330ml",
    },
  },
  {
    id: "4",
    name: "Brahma Latão",
    description: "A número 1 do Brasil.",
    price: 3.49,
    image: "/gelasso/products/brahma.jpg",
    category: "cervejas",
    rating: 4.4,
    reviews: 412,
    details: {
      alcoholContent: "4.8%",
      origin: "Brasil",
      type: "Pilsen",
      volume: "350ml",
    },
  },
  {
    id: "5",
    name: "Heineken Latão",
    description: "Premium Lager Beer.",
    price: 4.99,
    image: "/gelasso/products/heineken-lata.jpg",
    category: "cervejas",
    rating: 4.7,
    reviews: 298,
    details: {
      alcoholContent: "5%",
      origin: "Holanda",
      type: "Lager",
      volume: "350ml",
    },
  },
  {
    id: "6",
    name: "Energético Red Bull",
    description: "Te dá asas.",
    price: 6.99,
    image: "/gelasso/products/redbull.jpg",
    category: "energeticos",
    rating: 4.8,
    reviews: 567,
    details: {
      volume: "250ml",
    },
  },
  {
    id: "7",
    name: "Frutaice Limão e Sal",
    description: "Bebida de frutas refrescante.",
    price: 3.99,
    image: "/gelasso/products/frutaice.jpg",
    category: "frutaice",
    rating: 4.3,
    reviews: 145,
    details: {
      volume: "275ml",
    },
  },
  {
    id: "8",
    name: "Gelo de Limão",
    description: "Gelo saborizado de limão.",
    price: 4.99,
    image: "/gelasso/products/gelo-limao.jpg",
    category: "gelo",
    rating: 4.5,
    reviews: 89,
    details: {
      volume: "1kg",
    },
  },
  {
    id: "9",
    name: "Gelo Limão",
    description: "Gelo saborizado.",
    price: 2.99,
    image: "/gelasso/products/gelo.jpg",
    category: "gelo",
    rating: 4.4,
    reviews: 112,
    details: {
      volume: "500g",
    },
  },
  {
    id: "10",
    name: "Vodka Smirnoff",
    description: "A vodka mais famosa do mundo.",
    price: 29.99,
    image: "/gelasso/products/smirnoff.jpg",
    category: "vodka",
    rating: 4.6,
    reviews: 234,
    details: {
      alcoholContent: "40%",
      origin: "Rússia",
      type: "Vodka",
      volume: "998ml",
    },
  },
]

export const promotions = [
  {
    id: "promo1",
    title: "VODKA + ENERGÉTICO + FRUTAICE",
    originalPrice: 39.9,
    promoPrice: 29.9,
    discount: 10,
    image: "/gelasso/promos/combo-vodka.jpg",
  },
]

export const combos = [
  {
    id: "combo1",
    title: "COMBO ESQUENTA",
    description: "1 Vodka + 2 Energéticos + Gelo saborizado",
    price: 49.9,
    image: "/gelasso/combos/combo-esquenta.jpg",
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getMostOrdered(): Product[] {
  return products.slice(0, 3)
}

export function getColdProducts(): Product[] {
  return products.filter(
    (p) => p.category === "cervejas" || p.category === "energeticos"
  ).slice(0, 3)
}

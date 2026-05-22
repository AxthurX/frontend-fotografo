export interface Product {
  id: number
  name: string
  description: string
  price: number
  oldPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  volume: string
  alcoholContent?: string
  origin?: string
  type?: string
  badge?: string
  deliveryTime: string
}

export interface Category {
  id: string
  name: string
  icon: string
}

export const categories: Category[] = [
  { id: "cervejas", name: "Cervejas", icon: "beer" },
  { id: "whisky", name: "Whisky", icon: "whisky" },
  { id: "gin", name: "Gin", icon: "gin" },
  { id: "frutaice", name: "Frutaice", icon: "frutaice" },
  { id: "combos", name: "Combos", icon: "combos" },
  { id: "energeticos", name: "Energéticos", icon: "energy" },
  { id: "refrigerantes", name: "Refrigerantes", icon: "soda" },
  { id: "gelo", name: "Gelo", icon: "ice" },
  { id: "conveniencia", name: "Conveniência", icon: "store" },
  { id: "vodka", name: "Vodka", icon: "vodka" },
]

export const products: Product[] = [
  {
    id: 1,
    name: "Heineken Long Neck",
    description: "Cerveja puro malte, gelada do jeito que tem que ser.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=300&fit=crop",
    category: "cervejas",
    rating: 4.8,
    reviews: 324,
    volume: "330ml",
    alcoholContent: "5%",
    origin: "Holanda",
    type: "Lager",
    badge: "Mais pedido",
    deliveryTime: "30 min",
  },
  {
    id: 2,
    name: "Skol Long Neck",
    description: "A cerveja que desce redondo, sempre gelada.",
    price: 7.49,
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=200&h=300&fit=crop",
    category: "cervejas",
    rating: 4.5,
    reviews: 256,
    volume: "330ml",
    alcoholContent: "4.7%",
    origin: "Brasil",
    type: "Pilsen",
    deliveryTime: "30 min",
  },
  {
    id: 3,
    name: "Budweiser Long Neck",
    description: "The King of Beers, cerveja premium americana.",
    price: 8.49,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&h=300&fit=crop",
    category: "cervejas",
    rating: 4.6,
    reviews: 189,
    volume: "330ml",
    alcoholContent: "5%",
    origin: "EUA",
    type: "Lager",
    deliveryTime: "30 min",
  },
  {
    id: 4,
    name: "Frutaice Limão e Sal",
    description: "Bebida refrescante com limão e toque de sal.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200&h=300&fit=crop",
    category: "frutaice",
    rating: 4.7,
    reviews: 145,
    volume: "275ml",
    deliveryTime: "30 min",
  },
  {
    id: 5,
    name: "Gelo de Limão",
    description: "Gelo premium com sabor de limão, perfeito para drinks.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=200&h=300&fit=crop",
    category: "gelo",
    rating: 4.9,
    reviews: 87,
    volume: "1kg",
    deliveryTime: "30 min",
  },
  {
    id: 6,
    name: "Brahma Latão",
    description: "A número 1 do Brasil, gelada e refrescante.",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=200&h=300&fit=crop",
    category: "cervejas",
    rating: 4.4,
    reviews: 312,
    volume: "350ml",
    alcoholContent: "4.8%",
    origin: "Brasil",
    type: "Pilsen",
    deliveryTime: "30 min",
  },
  {
    id: 7,
    name: "Heineken Latão",
    description: "Cerveja premium em latão gelado.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=300&fit=crop",
    category: "cervejas",
    rating: 4.8,
    reviews: 278,
    volume: "350ml",
    alcoholContent: "5%",
    origin: "Holanda",
    type: "Lager",
    deliveryTime: "30 min",
  },
  {
    id: 8,
    name: "Red Bull",
    description: "Energético que te dá asas, gelado.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=300&fit=crop",
    category: "energeticos",
    rating: 4.6,
    reviews: 198,
    volume: "250ml",
    deliveryTime: "30 min",
  },
  {
    id: 9,
    name: "Smirnoff Ice",
    description: "Vodka com limão, refrescante e gelada.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&h=300&fit=crop",
    category: "vodka",
    rating: 4.5,
    reviews: 167,
    volume: "275ml",
    alcoholContent: "5%",
    origin: "Brasil",
    type: "Ice",
    deliveryTime: "30 min",
  },
  {
    id: 10,
    name: "Gelo Comum",
    description: "Gelo em cubos, ideal para qualquer bebida.",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1558349699-1e1c38c05eef?w=200&h=300&fit=crop",
    category: "gelo",
    rating: 4.8,
    reviews: 234,
    volume: "2kg",
    deliveryTime: "30 min",
  },
]

export const combos = [
  {
    id: 101,
    name: "VODKA + ENERGÉTICO + FRUTAICE",
    description: "1 Vodka + 2 Energéticos + Gelo saborizado",
    oldPrice: 39.90,
    price: 29.90,
    savings: 10.00,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
  },
  {
    id: 102,
    name: "COMBO ESQUENTA",
    description: "1 Vodka + 2 Energéticos + Gelo saborizado",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop",
  },
]

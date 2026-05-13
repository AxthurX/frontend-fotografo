import { CartProvider } from "./context/CartContext"

export default function GelassoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-sans bg-neutral-100 min-h-screen">
      <CartProvider>{children}</CartProvider>
    </div>
  )
}

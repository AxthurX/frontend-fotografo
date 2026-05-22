import Link from "next/link"
import { Beer, Wine, Martini, IceCream, Package, Zap, GlassWater, Snowflake, Store, LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  beer: Beer,
  whisky: Wine,
  gin: Martini,
  frutaice: IceCream,
  combos: Package,
  energy: Zap,
  soda: GlassWater,
  ice: Snowflake,
  store: Store,
  vodka: Wine,
}

interface CategoryIconProps {
  id: string
  name: string
  icon: string
}

export function CategoryIcon({ id, name, icon }: CategoryIconProps) {
  const Icon = iconMap[icon] || Beer

  return (
    <Link href={`/categoria/${id}`} className="flex flex-col items-center gap-1">
      <div className="w-14 h-14 bg-red-700/10 rounded-xl flex items-center justify-center">
        <Icon className="w-7 h-7 text-red-700" />
      </div>
      <span className="text-xs text-gray-700 text-center">{name}</span>
    </Link>
  )
}

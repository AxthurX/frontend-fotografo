"use client"

import Link from "next/link"

interface CategoryIconProps {
  id: string
  name: string
  icon: string
}

const iconMap: Record<string, JSX.Element> = {
  beer: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path
        d="M8 3v18M16 3v18M6 6h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M8 6V3h8v3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  whisky: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path
        d="M8 3h8l2 4v14H6V7l2-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  gin: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path
        d="M9 3h6v4l3 14H6L9 7V3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  frutaice: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 4v4M8 6l2 3M16 6l-2 3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  combo: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  energy: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  soda: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path
        d="M9 4h6v2l1 14H8L9 6V4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 4a3 3 0 016 0" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  ice: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path
        d="M12 2v20M2 12h20M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  store: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  vodka: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path
        d="M8 2h8v4l2 16H6L8 6V2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

export function CategoryIcon({ id, name, icon }: CategoryIconProps) {
  return (
    <Link
      href={`/gelasso/categoria/${id}`}
      className="flex flex-col items-center gap-1 min-w-[70px]"
    >
      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors">
        {iconMap[icon] || iconMap.beer}
      </div>
      <span className="text-xs text-gray-700 text-center">{name}</span>
    </Link>
  )
}

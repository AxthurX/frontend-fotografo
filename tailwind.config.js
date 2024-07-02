
/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      "light",
      {
        sedam: {
          "primary": "#2a4d14",
          "primary-content": "#e4ebdc",
          "secondary": "#6d4c3d",
          "secondary-content": "#e4ebdc",
          "accent": "#b6c197",
          "accent-content": "#e4ebdc",
          "neutral": "#5c4137",
          "neutral-content": "#e4ebdc",
          "base-100": "#d4dfc7",
          "base-content": "#2d1e1b",
          "info": "#40798c",
          "info-content": "#e4ebdc",
          "success": "#69be6e",
          "success-content": "#2d1e1b",
          "warning": "#fac637",
          "warning-content": "#2d1e1b",
          "error": "#9d0606",
          "error-content": "#e4ebdc",
        }
      }
    ],
    base: true,
    logs: false
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      transitionProperty: {
        "height": "height",
        "spacing": "margin, padding",
        "width": "width",
        "margin" : "padding",
      },
      colors: {
        gray: {
          "50": "#F9FAFB",
          "100": "#F3F4F6",
          "200": "#E5E7EB",
          "300": "#D1D5DB",
          "400": "#9CA3AF",
          "500": "#6B7280",
          "600": "#4B5563",
          "700": "#374151",
          "800": "#1F2937",
          "900": "#111827",
        },
        calpolygreen: {
          "50": "#f3fee7",
          "100": "#e5fbcc",
          "200": "#caf79f",
          "300": "#a8ef67",
          "400": "#88e338",
          "500": "#68c81a",
          "600": "#4ea010",
          "700": "#3d7a11",
          "800": "#336014",
          "900": "#2a4d14",
          "950": "#142d06",
          "980": "#223e10",
        },
        sage: {
          "50": "#f6f7ee",
          "100": "#eaedda",
          "200": "#d6dcba",
          "250": "#C6CF9B",
          "300": "#b6c187",
          "400": "#a2af6c",
          "500": "#84934f",
          "600": "#67743c",
          "700": "#4f5a31",
          "800": "#41492b",
          "900": "#383f28",
          "950": "#1d2112",
          "980" : "#B6C187",

        },
        beige: {
          "50": "#f3f6ef",
          "100": "#e4ebdc",
          "200": "#d4dfc7",
          "300": "#acc195",
          "400": "#8ea972",
          "500": "#718d55",
          "600": "#576f41",
          "700": "#445635",
          "800": "#39462e",
          "900": "#323d2a",
          "950": "#192013",
        },
        cerulean: {
          "50": "#f2f8f9",
          "100": "#ddecf0",
          "200": "#bfdae2",
          "300": "#93c0cd",
          "400": "#609eb0",
          "500": "#40798c",
          "600": "#3b6b7f",
          "700": "#355969",
          "800": "#324b58",
          "900": "#2d404c",
          "950": "#1a2832",
        },
        coffee: {
          "50": "#f6f4f0",
          "100": "#eae3d7",
          "200": "#d6c8b2",
          "300": "#bea586",
          "400": "#ab8964",
          "500": "#9c7856",
          "600": "#856149",
          "700": "#6d4c3d",
          "800": "#5c4137",
          "850": "#402a1f",
          "900": "#503933",
          "950": "#2d1e1b",
          "980" : "#41252E"
        },
        red: {
          "50": "#FEF2F2",
          "100": "#FEE2E2",
          "200": "#FECACA",
          "300": "#FCA5A5",
          "400": "#F87171",
          "500": "#EF4444",
          "600": "#DC2626",
          "700": "#B91C1C",
          "800": "#991B1B",
          "900": "#7F1D1D",
        },
        blue: {
          "500" : "#0494c7",
          "700" : "#256d97",
        },
      },
      boxShadow: {
        "daisy-radio": "0 0 0 4px #f3f6ef inset, 0 0 0 4px #f3f6ef inset"
      },
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
        "24": "repeat(24, minmax(0, 1fr))"
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
        "span-17": "span 17 / span 17",
        "span-18": "span 18 / span 18",
        "span-19": "span 19 / span 19",
        "span-20": "span 20 / span 20",
        "span-21": "span 21 / span 21",
        "span-22": "span 22 / span 22",
        "span-23": "span 23 / span 23",
        "span-24": "span 24 / span 24",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("daisyui")],
};
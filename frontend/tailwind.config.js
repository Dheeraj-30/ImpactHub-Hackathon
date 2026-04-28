/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "inverse-primary": "#bec6e0",
        "on-surface": "#191c1e",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "tertiary-fixed": "#ffdad7",
        "on-tertiary-fixed": "#410004",
        "secondary-fixed": "#d8e2ff",
        "on-secondary-fixed-variant": "#004395",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f6",
        "surface-container": "#eceef0",
        "surface-bright": "#f7f9fb",
        "surface-variant": "#e0e3e5",
        "primary": "#000000",
        "on-primary": "#ffffff",
        "outline-variant": "#c6c6cd",
        "error": "#ba1a1a",
        "secondary": "#0058be",
        "primary-container": "#131b2e",
        "tertiary-fixed-dim": "#ffb3ad",
        "secondary-fixed-dim": "#adc6ff",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
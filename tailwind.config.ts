import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],

  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],

  theme: {
    extend: {
      // COLOR SYSTEM (CLINIC THEME)
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Surfaces
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F1F5F9",
          muted: "#E2E8F0"
        },

        // Brand (Medical Blue System)
        primary: {
          DEFAULT: "#2563EB",
          foreground: "#FFFFFF"
        },

        // Semantic states (clinic workflow)
        success: "#22C55E",     // completed
        warning: "#F59E0B",     // no-show / pending attention
        danger: "#EF4444",      // cancelled / error
        info: "#14B8A6",        // confirmed / stable

        muted: {
          DEFAULT: "#64748B",
          foreground: "#94A3B8"
        },

        border: "#E2E8F0",
        input: "#E2E8F0",
        ring: "#2563EB"
      },

      // 🔤 TYPOGRAPHY
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },

      // 📏 SPACING (clinic UI = breathable)
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem"
      },

      // 🧱 BORDER RADIUS (soft clinical UI)
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px"
      },

      // 🌫️ SHADOWS (subtle, not dramatic)
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.05)",
        hover: "0 4px 12px rgba(0,0,0,0.08)"
      },

      // 📊 ANIMATIONS (light, functional only)
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },

      animation: {
        fadeIn: "fadeIn 0.2s ease-out"
      }
    }
  },

  plugins: [
    require("tailwindcss-animate")
  ]
}

export default config
import type { Config } from "tailwindcss"
import twAnimate from "tailwindcss-animate"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      transparent: "transparent",
      white: "hsl(var(--white))",
      black: "hsl(var(--black))",
      text: {
        primary: "hsl(var(--text-primary))",
        secondary: {
          DEFAULT: "hsl(var(--text-secondary))",
          accent: "hsl(var(--text-secondary-accent))"
        },
        error: "hsl(var(--text-error))"
      },
      link: {
        blue: "hsl(var(--text-link-blue))"
      },
      brand: {
        primary: "hsl(var(--brand-primary))",
        secondary: "hsl(var(--brand-secondary))",
        muted: "hsl(var(--brand-muted))",
        accent: {
          DEFAULT: "hsl(var(--brand-accent))",
          highlight: "hsl(var(--brand-accent-highlit))"
        },
        colorGradient: "hsl(var(--brand-colorGradient))"
      },
      solid: {
        bg: "hsl(var(--solid-bg))",
        primary: "hsl(var(--solid-primary))",
        secondary: "hsl(var(--solid-secondary))",
        tertiary: "hsl(var(--solid-tertiary))",
        accent: "hsl(var(--solid-accent))",
        spacer: "hsl(var(--solid-spacer))",
      },
      translucent: {
        soft: "hsla(var(--translucent-soft))",
        md: "hsla(var(--translucent-md))",
        lg: "hsla(var(--translucent-lg))",
        heavy: "hsla(var(--translucent-heavy))",
      }
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [twAnimate],
} satisfies Config

export default config

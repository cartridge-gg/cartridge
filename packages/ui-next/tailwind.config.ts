import { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

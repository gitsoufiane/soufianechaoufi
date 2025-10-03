import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
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
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "rgb(0, 129, 137)",
          foreground: "rgb(255, 255, 255)",
          mid: "rgb(153, 205, 208)",
          light: "rgb(204, 236, 238)",
          lightest: "rgb(230, 246, 247)",
        },
        secondary: {
          DEFAULT: "rgb(0, 61, 55)",
          foreground: "rgb(255, 255, 255)",
        },
        destructive: {
          DEFAULT: "rgb(176, 0, 32)",
          foreground: "rgb(255, 255, 255)",
          mid: "rgb(227, 172, 165)",
          light: "rgb(237, 203, 198)",
          lightest: "rgb(248, 234, 232)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Color Palette
        success: {
          DEFAULT: "rgb(1, 131, 79)",
          foreground: "rgb(255, 255, 255)",
          mid: "rgb(139, 201, 176)",
          light: "rgb(182, 221, 205)",
          lightest: "rgb(225, 241, 235)",
        },
        warning: {
          DEFAULT: "rgb(247, 155, 0)",
          foreground: "rgb(51, 51, 51)",
          mid: "rgb(255, 204, 130)",
          light: "rgb(253, 235, 204)",
          lightest: "rgb(254, 245, 230)",
        },
        info: {
          DEFAULT: "rgb(24, 115, 204)",
          foreground: "rgb(255, 255, 255)",
          mid: "rgb(151, 192, 232)",
          light: "rgb(190, 215, 241)",
          lightest: "rgb(228, 239, 249)",
        },
        gray: {
          DEFAULT: "rgb(51, 51, 51)",
          foreground: "rgb(255, 255, 255)",
          cool: "rgb(110, 120, 128)",
        },
        neutral: {
          DEFAULT: "rgb(227, 222, 217)",
          mid: "rgb(235, 232, 228)",
          light: "rgb(241, 239, 236)",
          lightest: "rgb(251, 249, 246)",
        },
        blue: {
          DEFAULT: "rgb(154, 187, 218)",
          light: "rgb(214, 229, 240)",
        },
        green: {
          DEFAULT: "rgb(138, 203, 170)",
          light: "rgb(197, 234, 219)",
        },
        turquoise: {
          DEFAULT: "rgb(136, 201, 204)",
          light: "rgb(197, 232, 234)",
        },
        orange: {
          DEFAULT: "rgb(255, 192, 153)",
          light: "rgb(255, 224, 204)",
        },
        red: {
          DEFAULT: "rgb(255, 170, 158)",
          light: "rgb(255, 214, 214)",
        },
        pink: {
          DEFAULT: "rgb(226, 164, 199)",
          light: "rgb(245, 214, 230)",
        },
        purple: {
          DEFAULT: "rgb(190, 165, 209)",
          light: "rgb(224, 213, 232)",
        },
        brown: {
          DEFAULT: "rgb(196, 169, 146)",
          light: "rgb(229, 215, 204)",
        },
        yellow: {
          DEFAULT: "rgb(232, 203, 123)",
          light: "rgb(248, 237, 201)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-in-up": "slide-in-up 0.3s ease-out",
        "slide-in-down": "slide-in-down 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      screens: {
        xs: "475px",
        "3xl": "1600px",
      },
      backdropBlur: {
        xs: "2px",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    // Add container queries support
    require("@tailwindcss/container-queries"),
  ],
} satisfies Config;

export default config;

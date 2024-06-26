/** @type {import('tailwindcss').Config} */
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_1300 = { ...Array.from(Array(1301)).map((_, i) => `${i}px`) };

module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        pretendard: ["Pretendard"],
      },
      width: px0_1300,
      height: px0_1300,
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      margin: px0_100,
      padding: px0_100,
      gap: px0_100,
      spacing: px0_200,
      borderRadius: px0_100,
      colors: {
        "st-skyblue-300": "#9dd5ff",
        "st-skyblue-50": "#ddf1ff",
        "st-primary": "#5585ff",
        "st-red": "#ff5353",
        "st-green": "#35cc00",
        "st-gray-50": "#f5f5f5",
        "st-gray-75": "#dbdbdb",
        "st-gray-100": "#b4b4b4",
        "st-gray-200": "#8a8a8a",
        "st-gray-250": "#858585",
        "st-gray-400": "#6c6c6c",
        "st-white": "#ffffff",
        "st-white-50": "#f8f8f8",
        "st-white-100": "#F8FBFF",
        "banner-bg": "#6F87C6",
        "banner-bg2": "#00A8E1",
        "banner-bg3": "#A6BCFF",
        "st-black": "#000000",
        "st-yellow": "#F0F000",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
      },
      screens: {
        "2xl": "1400px",
        mobile: "390px",
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
      transitionDuration: {
        1500: "1500ms",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};

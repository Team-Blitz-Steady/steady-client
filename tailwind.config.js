/** @type {import('tailwindcss').Config} */
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_1300 = { ...Array.from(Array(1301)).map((_, i) => `${i}px`) };

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      "st-primary": "#5585ff",
      "st-red": "#ff5353",
      "st-green": "#35cc00",
      "st-gray-100": "#b4b4b4",
      "st-gray-200": "#8a8a8a",
      "st-gray-250": "#858585",
      "st-gray-400": "#6c6c6c",
    },
    extend: {
      width: px0_1300,
      height: px0_1300,
      borderWidth: px0_10,
      borderRadius: px0_100,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      margin: px0_100,
      padding: px0_100,
      spacing: px0_200,
    },
    plugins: [],
  },
};

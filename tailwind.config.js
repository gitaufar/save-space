/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/presentation/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#00BFA6",
        light_grey: '#64748B',
        black_common: '#1F2937'
      }
    },
  },
  plugins: [],
}
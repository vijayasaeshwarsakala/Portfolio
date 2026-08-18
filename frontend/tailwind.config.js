/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        spider: {
          darkBg: "#050505",
          darkCard: "#0D0D12",
          darkBorder: "#1A1A24",
          redPrimary: "#E50914",
          redGlow: "#FF1E27",
          redDark: "#B00010",
          blueSubtle: "#147BFF",
          blueDark: "#0A3C80",
          textLight: "#F5F5F5",
          textMuted: "#888888",
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
        display: ['Space Grotesk', 'Sora', 'sans-serif'],
      },
      boxShadow: {
        'spider-glow': '0 0 25px rgba(229, 9, 20, 0.4)',
        'spider-glow-strong': '0 0 40px rgba(229, 9, 20, 0.7)',
        'blue-glow': '0 0 25px rgba(20, 123, 255, 0.3)',
      },
      animation: {
        'web-pulse': 'webPulse 4s ease-in-out infinite',
        'spider-sense': 'spiderSense 1.5s infinite alternate',
      },
      keyframes: {
        webPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        spiderSense: {
          '0%': { boxShadow: '0 0 10px rgba(229, 9, 20, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(229, 9, 20, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}

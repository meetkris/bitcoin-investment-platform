import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Bitcoin Orange
                btc: {
                    50: '#FFF5E6',
                    100: '#FFE6B3',
                    200: '#FFD480',
                    300: '#FFC24D',
                    400: '#FFB01A',
                    500: '#F7931A', // Main Bitcoin Orange
                    600: '#E67E00',
                    700: '#CC6E00',
                    800: '#B35E00',
                    900: '#994E00',
                },
                // Gold Accent
                gold: {
                    500: '#FFB800',
                    600: '#E6A600',
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            animation: {
                scroll: "scroll 30s linear infinite",
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "slide-up": "slideUp 0.6s ease-out forwards",
                pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "price-up": "priceUp 0.3s ease-out",
                "price-down": "priceDown 0.3s ease-out",
            },
            keyframes: {
                scroll: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                priceUp: {
                    "0%, 100%": { color: "#10B981" },
                    "50%": { color: "#34D399" },
                },
                priceDown: {
                    "0%, 100%": { color: "#EF4444" },
                    "50%": { color: "#F87171" },
                },
            },
            boxShadow: {
                'btc': '0 0 20px rgba(247, 147, 26, 0.3)',
                'gold': '0 0 15px rgba(255, 184, 0, 0.4)',
            },
        },
    },
    plugins: [],
};
export default config;

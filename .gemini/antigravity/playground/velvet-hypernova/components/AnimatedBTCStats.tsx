"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface BTCData {
    price: number;
    change24h: number;
    marketCap: number;
    volume24h: number;
}

// Count-up animation hook
function useCountUp(end: number, duration: number = 2000, shouldAnimate: boolean = true) {
    const [count, setCount] = useState(0);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (!shouldAnimate) {
            setCount(end);
            return;
        }

        startTimeRef.current = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = timestamp - startTimeRef.current;
            const percentage = Math.min(progress / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
            setCount(end * easeOutQuart);

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldAnimate]);

    return count;
}

export default function AnimatedBTCStats() {
    const [data, setData] = useState<BTCData>({
        price: 0,
        change24h: 0,
        marketCap: 0,
        volume24h: 0,
    });
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    // Animated values
    const animatedPrice = useCountUp(data.price, 2000, isInitialLoad);
    const animatedChange = useCountUp(Math.abs(data.change24h), 1500, isInitialLoad);
    const animatedMarketCap = useCountUp(data.marketCap, 2000, isInitialLoad);
    const animatedVolume = useCountUp(data.volume24h, 2000, isInitialLoad);

    // Fetch Bitcoin data from API
    const fetchBitcoinData = async () => {
        try {
            const response = await fetch('/api/btc-price');
            if (!response.ok) throw new Error('Failed to fetch Bitcoin data');

            const apiData = await response.json();
            setData({
                price: apiData.price,
                change24h: apiData.change24h,
                marketCap: apiData.marketCap / 1_000_000_000, // Convert to billions
                volume24h: apiData.volume24h / 1_000_000_000, // Convert to billions
            });
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching Bitcoin data:', error);
            // Fallback to default values if API fails
            setData({
                price: 86297.00,
                change24h: -0.23,
                marketCap: 1717.18,
                volume24h: 69.04,
            });
            setIsLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchBitcoinData();
    }, []);

    useEffect(() => {
        // Mark initial load complete after first animation
        const timer = setTimeout(() => setIsInitialLoad(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    // Fetch live data updates every 60 seconds (CoinGecko rate limit friendly)
    useEffect(() => {
        const interval = setInterval(() => {
            fetchBitcoinData();
        }, 60000); // 60 seconds

        return () => clearInterval(interval);
    }, []);

    const isPositive = data.change24h >= 0;

    return (
        <div className="w-full bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-y border-neutral-800 relative overflow-hidden">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 animate-pulse"></div>

            {/* Flowing shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-btc-500/5 to-transparent animate-shimmer"></div>

            <div className="container mx-auto px-6 py-6 relative z-10">
                {/* Live Status Badge */}
                <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm animate-pulse-glow">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-btc-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-btc-500 shadow-[0_0_10px_rgba(247,147,26,0.8)]"></span>
                        </span>
                        <span className="text-sm font-bold text-btc-500 tracking-wide">Live Bitcoin Trading Active</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Bitcoin Price */}
                    <div className="flex flex-col items-center p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-btc-500/50 transition-all group">
                        <span className="text-xs text-neutral-500 mb-2 uppercase tracking-wider">Bitcoin Price</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl lg:text-4xl font-bold text-white group-hover:text-btc-500 transition-colors tabular-nums">
                                ${animatedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className="text-sm text-neutral-400">USD</span>
                        </div>
                    </div>

                    {/* 24h Change */}
                    <div className="flex flex-col items-center p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-btc-500/50 transition-all group">
                        <span className="text-xs text-neutral-500 mb-2 uppercase tracking-wider">24h Change</span>
                        <div className={`flex items-center gap-2 text-2xl lg:text-3xl font-bold tabular-nums transition-all ${isPositive
                            ? 'text-green-500 animate-price-up'
                            : 'text-red-500 animate-price-down'
                            }`}>
                            {isPositive ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                            <span>
                                {isPositive ? '+' : ''}{animatedChange.toFixed(2)}%
                            </span>
                        </div>
                    </div>

                    {/* Market Cap */}
                    <div className="flex flex-col items-center p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-btc-500/50 transition-all group">
                        <span className="text-xs text-neutral-500 mb-2 uppercase tracking-wider">Market Cap</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl lg:text-4xl font-bold text-white group-hover:text-btc-500 transition-colors tabular-nums">
                                ${animatedMarketCap.toFixed(2)}
                            </span>
                            <span className="text-xl text-neutral-400">B</span>
                        </div>
                    </div>

                    {/* 24h Volume */}
                    <div className="flex flex-col items-center p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-btc-500/50 transition-all group">
                        <span className="text-xs text-neutral-500 mb-2 uppercase tracking-wider">24h Volume</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl lg:text-4xl font-bold text-white group-hover:text-btc-500 transition-colors tabular-nums">
                                ${animatedVolume.toFixed(2)}
                            </span>
                            <span className="text-xl text-neutral-400">B</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(247, 147, 26, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(247, 147, 26, 0.5);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}

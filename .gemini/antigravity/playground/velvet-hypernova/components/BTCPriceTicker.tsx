"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface BTCData {
    price: number;
    change24h: number;
    marketCap: number;
    volume24h: number;
}

export default function BTCPriceTicker() {
    const [data, setData] = useState<BTCData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await fetch('/api/btc-price');
                const btcData = await response.json();
                setData(btcData);
            } catch (error) {
                console.error('Failed to fetch BTC price:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrice();
        const interval = setInterval(fetchPrice, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    if (loading || !data) {
        return (
            <div className="w-full bg-neutral-950 border-y border-neutral-900 py-4">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center gap-2 text-neutral-600">
                        <div className="w-2 h-2 bg-btc-500 rounded-full animate-pulse"></div>
                        Loading Bitcoin price...
                    </div>
                </div>
            </div>
        );
    }

    const isPositive = data.change24h >= 0;

    return (
        <div className="w-full bg-neutral-950 border-y border-neutral-900 py-4">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Price */}
                    <div className="flex flex-col">
                        <span className="text-xs text-neutral-500 mb-1">Bitcoin Price</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">
                                ${data.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className="text-xs text-neutral-400">USD</span>
                        </div>
                    </div>

                    {/* 24h Change */}
                    <div className="flex flex-col">
                        <span className="text-xs text-neutral-500 mb-1">24h Change</span>
                        <div className={`flex items-center gap-1 text-lg font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span>{isPositive ? '+' : ''}{data.change24h.toFixed(2)}%</span>
                        </div>
                    </div>

                    {/* Market Cap */}
                    <div className="flex flex-col">
                        <span className="text-xs text-neutral-500 mb-1">Market Cap</span>
                        <span className="text-lg font-bold text-white">
                            ${(data.marketCap / 1e9).toFixed(2)}B
                        </span>
                    </div>

                    {/* 24h Volume */}
                    <div className="flex flex-col">
                        <span className="text-xs text-neutral-500 mb-1">24h Volume</span>
                        <span className="text-lg font-bold text-white">
                            ${(data.volume24h / 1e9).toFixed(2)}B
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

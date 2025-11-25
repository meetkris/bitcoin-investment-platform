"use client";

import { useEffect, useState } from "react";

const COINS = [
    { symbol: "BTC", name: "Bitcoin", price: 64231.45, change: 2.4 },
    { symbol: "ETH", name: "Ethereum", price: 3452.12, change: 1.8 },
    { symbol: "SOL", name: "Solana", price: 145.67, change: 5.2 },
    { symbol: "BNB", name: "Binance Coin", price: 590.33, change: -0.5 },
    { symbol: "XRP", name: "Ripple", price: 0.62, change: 1.1 },
    { symbol: "ADA", name: "Cardano", price: 0.45, change: -1.2 },
    { symbol: "DOGE", name: "Dogecoin", price: 0.16, change: 8.4 },
    { symbol: "DOT", name: "Polkadot", price: 7.23, change: 0.9 },
];

export default function Ticker() {
    return (
        <div className="w-full bg-slate-900/80 border-y border-slate-800 overflow-hidden py-2 backdrop-blur-sm">
            <div className="flex animate-scroll whitespace-nowrap">
                <div className="flex gap-8 px-4">
                    {COINS.map((coin) => (
                        <div key={coin.symbol} className="flex items-center gap-2 text-sm">
                            <span className="font-bold text-slate-300">{coin.symbol}</span>
                            <span className="text-slate-400">${coin.price.toLocaleString()}</span>
                            <span className={coin.change >= 0 ? "text-green-400" : "text-red-400"}>
                                {coin.change >= 0 ? "+" : ""}{coin.change}%
                            </span>
                        </div>
                    ))}
                </div>
                {/* Duplicate for seamless loop */}
                <div className="flex gap-8 px-4">
                    {COINS.map((coin) => (
                        <div key={`${coin.symbol}-dup`} className="flex items-center gap-2 text-sm">
                            <span className="font-bold text-slate-300">{coin.symbol}</span>
                            <span className="text-slate-400">${coin.price.toLocaleString()}</span>
                            <span className={coin.change >= 0 ? "text-green-400" : "text-red-400"}>
                                {coin.change >= 0 ? "+" : ""}{coin.change}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

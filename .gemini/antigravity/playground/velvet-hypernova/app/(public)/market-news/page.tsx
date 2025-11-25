"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import Script from "next/script";

const newsArticles = [
    {
        id: 1,
        category: "Price",
        title: "Bitcoin Surges Past $85,000 as Institutional Demand Grows",
        excerpt: "Major institutions continue to accumulate Bitcoin, driving prices to new highs...",
        date: "2 hours ago",
        trend: "up"
    },
    {
        id: 2,
        category: "Regulation",
        title: "SEC Approves New Bitcoin ETF Applications",
        excerpt: "The Securities and Exchange Commission has greenlit several new Bitcoin ETF proposals...",
        date: "5 hours ago",
        trend: "up"
    },
    {
        id: 3,
        category: "Adoption",
        title: "Major Retailer Announces Bitcoin Payment Integration",
        excerpt: "Global retail giant to accept Bitcoin payments across 10,000 stores worldwide...",
        date: "1 day ago",
        trend: "up"
    },
    {
        id: 4,
        category: "Tech",
        title: "Lightning Network Reaches 5,000 BTC Capacity",
        excerpt: "Bitcoin's Layer 2 scaling solution continues to grow, enabling instant transactions...",
        date: "1 day ago",
        trend: "up"
    },
    {
        id: 5,
        category: "Price",
        title: "Analysts Predict Bitcoin to Reach $100K by Year End",
        excerpt: "Top crypto analysts cite halving cycle and institutional adoption as key drivers...",
        date: "2 days ago",
        trend: "up"
    },
    {
        id: 6,
        category: "Regulation",
        title: "European Union Finalizes Crypto Regulation Framework",
        excerpt: "MiCA regulation brings clarity to cryptocurrency operations across EU member states...",
        date: "3 days ago",
        trend: "neutral"
    },
];

export default function MarketNewsPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [chartLoaded, setChartLoaded] = useState(false);
    const filters = ["All", "Price", "Tech", "Regulation", "Adoption"];

    const filteredNews = activeFilter === "All"
        ? newsArticles
        : newsArticles.filter(article => article.category === activeFilter);

    useEffect(() => {
        // Initialize TradingView widget after script loads
        const initChart = () => {
            if (typeof window !== 'undefined' && (window as any).TradingView && !chartLoaded) {
                new (window as any).TradingView.widget({
                    "width": "100%",
                    "height": 500,
                    "symbol": "BITSTAMP:BTCUSD",
                    "interval": "D",
                    "timezone": "Etc/UTC",
                    "theme": "dark",
                    "style": "1",
                    "locale": "en",
                    "toolbar_bg": "#0a0a0a",
                    "enable_publishing": false,
                    "allow_symbol_change": true,
                    "container_id": "tradingview_btc_chart",
                    "backgroundColor": "#0a0a0a",
                    "gridColor": "#262626",
                    "hide_top_toolbar": false,
                    "hide_legend": false,
                    "save_image": false,
                });
                setChartLoaded(true);
            }
        };

        // Try to init immediately if script already loaded
        initChart();

        // Also set up interval to retry
        const interval = setInterval(initChart, 500);
        const timeout = setTimeout(() => clearInterval(interval), 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [chartLoaded]);

    return (
        <main className="flex min-h-screen flex-col bg-black">
            {/* Hero */}
            <section className="relative py-20 px-6 bg-black overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
                        Bitcoin <span className="text-btc-500">Market News</span>
                    </h1>
                    <p className="text-xl text-neutral-400 text-center">
                        Stay updated with the latest Bitcoin news, price analysis, and market insights.
                    </p>
                </div>
            </section>

            {/* TradingView Widget */}
            <section className="py-12 px-6 bg-neutral-950/50 border-y border-neutral-900">
                <div className="container mx-auto max-w-6xl">
                    <div className="rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950">
                        <div className="p-4 border-b border-neutral-900">
                            <h2 className="text-xl font-bold text-white">Live Bitcoin Chart</h2>
                        </div>
                        <div style={{ height: '500px', width: '100%', backgroundColor: '#0a0a0a' }}>
                            <div id="tradingview_btc_chart" style={{ height: '100%', width: '100%' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Load TradingView Script */}
            <Script
                src="https://s3.tradingview.com/tv.js"
                strategy="lazyOnload"
            />

            {/* Filters */}
            <section className="py-8 px-6 bg-black border-b border-neutral-900">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-wrap gap-3">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2 rounded-lg font-medium transition-all ${activeFilter === filter
                                        ? "bg-btc-500 text-black"
                                        : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Articles */}
            <section className="py-12 px-6 bg-black">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNews.map((article) => (
                            <article
                                key={article.id}
                                className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 bg-btc-500/10 text-btc-500 text-xs font-bold rounded">
                                        {article.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-neutral-500 text-xs">
                                        <Clock className="w-3 h-3" />
                                        {article.date}
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-btc-500 transition-colors">
                                    {article.title}
                                </h3>

                                <p className="text-neutral-400 text-sm mb-4">
                                    {article.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-btc-500 text-sm font-medium">Read more →</span>
                                    {article.trend === "up" && (
                                        <TrendingUp className="w-5 h-5 text-green-500" />
                                    )}
                                    {article.trend === "down" && (
                                        <TrendingDown className="w-5 h-5 text-red-500" />
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Halving Countdown */}
            <section className="py-20 px-6 bg-neutral-950/50 border-y border-neutral-900">
                <div className="container mx-auto max-w-4xl">
                    <div className="p-8 rounded-2xl bg-gradient-to-r from-btc-500/10 to-gold-500/10 border border-btc-500/30">
                        <h2 className="text-3xl font-bold text-white mb-4 text-center">
                            Next Bitcoin Halving
                        </h2>
                        <p className="text-neutral-400 text-center mb-8">
                            The next halving event will reduce block rewards from 6.25 BTC to 3.125 BTC
                        </p>
                        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                            {[
                                { value: "145", label: "Days" },
                                { value: "12", label: "Hours" },
                                { value: "34", label: "Minutes" },
                                { value: "56", label: "Seconds" },
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-4xl font-bold text-btc-500 mb-1">{item.value}</div>
                                    <div className="text-sm text-neutral-400">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

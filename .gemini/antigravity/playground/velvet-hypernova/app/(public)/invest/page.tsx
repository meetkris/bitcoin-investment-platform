"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function InvestPage() {
    const [investment, setInvestment] = useState(1000);
    const [years, setYears] = useState(5);

    // Simple projection calculation (10% annual return estimate)
    const projectedValue = investment * Math.pow(1.10, years);
    const profit = projectedValue - investment;

    return (
        <main className="flex min-h-screen flex-col bg-black">
            {/* Hero */}
            <section className="relative py-20 px-6 bg-black overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

                <div className="container mx-auto max-w-4xl relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
                        Start Investing in <span className="text-btc-500">Bitcoin</span>
                    </h1>
                    <p className="text-xl text-neutral-400 text-center">
                        Follow our simple step-by-step guide to start your Bitcoin investment journey today.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="py-20 px-6 bg-neutral-950/50 border-y border-neutral-900">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        How to Invest in Bitcoin
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Create Account", desc: "Sign up and verify your identity", icon: CheckCircle },
                            { step: "2", title: "Connect Wallet", desc: "Link your crypto wallet securely", icon: Shield },
                            { step: "3", title: "Deposit Funds", desc: "Add funds via bank transfer or card", icon: Zap },
                            { step: "4", title: "Buy Bitcoin", desc: "Purchase BTC and start investing", icon: TrendingUp },
                        ].map((item, i) => (
                            <div key={i} className="relative">
                                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-btc-500 flex items-center justify-center mb-4 text-black font-bold text-xl">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-neutral-400 text-sm">{item.desc}</p>
                                </div>
                                {i < 3 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <ArrowRight className="w-8 h-8 text-btc-500/30" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Investment Strategies */}
            <section className="py-20 px-6 bg-black">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        Investment Strategies
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                            <h3 className="text-xl font-bold text-white mb-3">HODL (Hold)</h3>
                            <p className="text-neutral-400 text-sm mb-4">
                                Buy Bitcoin and hold it for the long term, regardless of short-term price fluctuations. This strategy has historically yielded the best returns.
                            </p>
                            <div className="text-btc-500 text-sm font-bold">Best for: Long-term investors</div>
                        </div>

                        <div className="p-6 rounded-2xl bg-neutral-950 border border-btc-500">
                            <div className="inline-block px-2 py-1 bg-btc-500/10 text-btc-500 text-xs font-bold rounded mb-3">
                                RECOMMENDED
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Dollar-Cost Averaging (DCA)</h3>
                            <p className="text-neutral-400 text-sm mb-4">
                                Invest a fixed amount regularly (weekly/monthly) regardless of price. This reduces the impact of volatility and removes emotion from investing.
                            </p>
                            <div className="text-btc-500 text-sm font-bold">Best for: Consistent investors</div>
                        </div>

                        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                            <h3 className="text-xl font-bold text-white mb-3">Lump Sum</h3>
                            <p className="text-neutral-400 text-sm mb-4">
                                Invest a large amount at once. Works best when you believe the current price is a good entry point based on your research.
                            </p>
                            <div className="text-btc-500 text-sm font-bold">Best for: Experienced investors</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculator */}
            <section className="py-20 px-6 bg-neutral-950/50 border-y border-neutral-900">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        Investment Calculator
                    </h2>

                    <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-900">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">
                                    Investment Amount (USD)
                                </label>
                                <input
                                    type="number"
                                    value={investment}
                                    onChange={(e) => setInvestment(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-lg text-white focus:border-btc-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">
                                    Time Period (Years)
                                </label>
                                <input
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-lg text-white focus:border-btc-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-black border border-btc-500/30">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-sm text-neutral-400 mb-1">Initial Investment</div>
                                    <div className="text-2xl font-bold text-white">${investment.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-neutral-400 mb-1">Projected Value</div>
                                    <div className="text-2xl font-bold text-btc-500">${projectedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-neutral-400 mb-1">Potential Profit</div>
                                    <div className="text-2xl font-bold text-green-500">+${profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                </div>
                            </div>
                            <p className="text-xs text-neutral-500 text-center mt-4">
                                *Based on historical 10% annual return. Past performance does not guarantee future results.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Risk Disclosure */}
            <section className="py-20 px-6 bg-black">
                <div className="container mx-auto max-w-4xl">
                    <div className="p-8 rounded-2xl bg-red-950/20 border border-red-900/50">
                        <h3 className="text-2xl font-bold text-white mb-4">⚠️ Risk Disclosure</h3>
                        <div className="space-y-3 text-neutral-300 text-sm">
                            <p>• Cryptocurrency investments are highly volatile and carry significant risk.</p>
                            <p>• Only invest what you can afford to lose.</p>
                            <p>• Past performance does not guarantee future results.</p>
                            <p>• Do your own research before making any investment decisions.</p>
                            <p>• Consider consulting with a financial advisor.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-neutral-950/50 border-t border-neutral-900">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-neutral-400 mb-10">
                        Connect your wallet and start investing in Bitcoin today.
                    </p>
                    <Link
                        href="/connect-wallet"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-btc-500 hover:bg-btc-600 text-black text-lg font-bold rounded-lg transition-all shadow-btc"
                    >
                        Connect Wallet
                    </Link>
                </div>
            </section>
        </main>
    );
}

import Link from "next/link";
import { ArrowRight, Shield, Zap, TrendingUp, Lock } from "lucide-react";
import ConnectWallet from "./ConnectWallet";

export default function BitcoinHero() {
    return (
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            {/* Bitcoin Glow Effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-btc-500/10 rounded-full blur-[120px] animate-pulse"></div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                {/* Live Indicator */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm mb-8 animate-fade-in">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-btc-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-btc-500"></span>
                    </span>
                    <span className="text-sm text-neutral-400">Live Bitcoin Trading Active</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-slide-up">
                    Buy, Invest & Track <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-btc-400 via-btc-500 to-gold-500">
                        Bitcoin Securely
                    </span>
                </h1>

                <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10 animate-slide-up">
                    The world's most trusted cryptocurrency platform. Start investing in Bitcoin with bank-grade security, real-time analytics, and instant trading.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up">
                    <ConnectWallet />
                    <Link
                        href="/invest"
                        className="px-8 py-3 bg-neutral-900 text-white font-bold rounded-lg border border-neutral-800 hover:bg-neutral-800 transition-all flex items-center gap-2"
                    >
                        Learn How to Invest <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* Feature Pills */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in">
                    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-neutral-950/50 border border-neutral-900 backdrop-blur-sm hover:border-btc-500/50 transition-colors">
                        <div className="p-2 rounded-lg bg-btc-500/10 text-btc-500">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-bold text-white">Secure Storage</h3>
                        <p className="text-xs text-neutral-500">Cold wallet protection</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-neutral-950/50 border border-neutral-900 backdrop-blur-sm hover:border-btc-500/50 transition-colors">
                        <div className="p-2 rounded-lg bg-btc-500/10 text-btc-500">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-bold text-white">Real-Time Analytics</h3>
                        <p className="text-xs text-neutral-500">Live market data</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-neutral-950/50 border border-neutral-900 backdrop-blur-sm hover:border-btc-500/50 transition-colors">
                        <div className="p-2 rounded-lg bg-btc-500/10 text-btc-500">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-bold text-white">Instant Trading</h3>
                        <p className="text-xs text-neutral-500">Lightning fast execution</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-neutral-950/50 border border-neutral-900 backdrop-blur-sm hover:border-btc-500/50 transition-colors">
                        <div className="p-2 rounded-lg bg-btc-500/10 text-btc-500">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-bold text-white">Low Fees</h3>
                        <p className="text-xs text-neutral-500">Competitive rates</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";

export default function CryptoHero() {
    return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-10"></div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>

            <div className="relative z-20 container mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm mb-8 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-slate-400">Live Market Data Active</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in-up delay-100">
                    The Future of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 neon-text">
                        Crypto Investment
                    </span>
                </h1>

                <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
                    Experience lightning-fast trading, institutional-grade security, and automated investment strategies powered by advanced AI algorithms.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                    <Link
                        href="/register"
                        className="px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-colors flex items-center gap-2"
                    >
                        Start Investing <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="/about"
                        className="px-8 py-4 bg-slate-900/50 text-white font-bold rounded-full border border-slate-800 hover:bg-slate-800 transition-colors backdrop-blur-sm"
                    >
                        Learn More
                    </Link>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up delay-500">
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
                        <div className="p-3 rounded-full bg-violet-500/10 text-violet-400">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Bank-Grade Security</h3>
                        <p className="text-sm text-slate-400">Your assets are protected by cold storage and multi-sig wallets.</p>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
                        <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Instant Withdrawals</h3>
                        <p className="text-sm text-slate-400">Access your funds anytime with our automated processing system.</p>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
                        <div className="p-3 rounded-full bg-fuchsia-500/10 text-fuchsia-400">
                            <Globe className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Global Access</h3>
                        <p className="text-sm text-slate-400">Trade from anywhere in the world with 24/7 multilingual support.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

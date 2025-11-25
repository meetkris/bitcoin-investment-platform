"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
    TrendingUp,
    Wallet,
    Activity,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    LogOut,
    User,
    Settings
} from "lucide-react";
import Link from "next/link";

interface UserData {
    email: string;
    fullName: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [btcPrice, setBtcPrice] = useState(0);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/signin');
                return;
            }

            setUser({
                email: user.email || '',
                fullName: user.user_metadata?.full_name || 'User'
            });
            setLoading(false);
        };

        checkUser();
    }, [router, supabase.auth]);

    // Fetch Bitcoin price
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await fetch('/api/btc-price');
                const data = await response.json();
                setBtcPrice(data.price);
            } catch (error) {
                console.error('Error fetching BTC price:', error);
            }
        };

        fetchPrice();
        const interval = setInterval(fetchPrice, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-btc-500"></div>
            </div>
        );
    }

    // Mock portfolio data (replace with real data from database)
    const portfolioValue = 12500.00;
    const btcHoldings = 0.145;
    const profitLoss = 2340.50;
    const profitLossPercent = 23.05;

    return (
        <div className="min-h-screen bg-black">
            {/* Navigation */}
            <nav className="border-b border-neutral-900 bg-neutral-950/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold text-btc-500">
                            ₿itcoin Platform
                        </Link>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800">
                                <User className="w-4 h-4 text-btc-500" />
                                <span className="text-sm text-white">{user?.fullName}</span>
                            </div>

                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-btc-500/50 transition-all text-white"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Welcome back, {user?.fullName}! 👋
                    </h1>
                    <p className="text-neutral-400">
                        Here's your Bitcoin investment overview
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Portfolio Value */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-btc-500/10 to-neutral-950 border border-btc-500/30">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-btc-500/20 flex items-center justify-center">
                                <Wallet className="w-6 h-6 text-btc-500" />
                            </div>
                            <div className="flex items-center gap-1 text-green-500 text-sm font-bold">
                                <ArrowUpRight className="w-4 h-4" />
                                {profitLossPercent.toFixed(2)}%
                            </div>
                        </div>
                        <p className="text-neutral-400 text-sm mb-1">Portfolio Value</p>
                        <p className="text-3xl font-bold text-white">
                            ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>

                    {/* BTC Holdings */}
                    <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-btc-500" />
                            </div>
                        </div>
                        <p className="text-neutral-400 text-sm mb-1">BTC Holdings</p>
                        <p className="text-3xl font-bold text-white">
                            {btcHoldings.toFixed(6)} BTC
                        </p>
                    </div>

                    {/* Current BTC Price */}
                    <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-btc-500" />
                            </div>
                        </div>
                        <p className="text-neutral-400 text-sm mb-1">Current BTC Price</p>
                        <p className="text-3xl font-bold text-white">
                            ${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>

                    {/* Profit/Loss */}
                    <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                                <Activity className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                        <p className="text-neutral-400 text-sm mb-1">Total Profit/Loss</p>
                        <p className="text-3xl font-bold text-green-500">
                            +${profitLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Link
                        href="/invest"
                        className="p-6 rounded-2xl bg-btc-500 hover:bg-btc-600 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-black mb-2">Buy Bitcoin</h3>
                                <p className="text-black/70 text-sm">Invest in BTC now</p>
                            </div>
                            <ArrowUpRight className="w-8 h-8 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </Link>

                    <Link
                        href="/market-news"
                        className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Market News</h3>
                                <p className="text-neutral-400 text-sm">Stay updated</p>
                            </div>
                            <Activity className="w-8 h-8 text-btc-500 group-hover:scale-110 transition-transform" />
                        </div>
                    </Link>

                    <Link
                        href="/connect-wallet"
                        className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Connect Wallet</h3>
                                <p className="text-neutral-400 text-sm">Link your wallet</p>
                            </div>
                            <Wallet className="w-8 h-8 text-btc-500 group-hover:scale-110 transition-transform" />
                        </div>
                    </Link>
                </div>

                {/* Recent Transactions */}
                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                    <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>

                    <div className="space-y-4">
                        {/* Mock transactions - replace with real data */}
                        {[
                            { type: 'buy', amount: 0.025, price: 85000, date: '2025-11-24' },
                            { type: 'buy', amount: 0.050, price: 82000, date: '2025-11-20' },
                            { type: 'buy', amount: 0.070, price: 79000, date: '2025-11-15' },
                        ].map((tx, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-btc-500/30 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'buy' ? 'bg-green-500/10' : 'bg-red-500/10'
                                        }`}>
                                        {tx.type === 'buy' ? (
                                            <ArrowDownRight className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <ArrowUpRight className="w-5 h-5 text-red-500" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">
                                            {tx.type === 'buy' ? 'Bought' : 'Sold'} {tx.amount} BTC
                                        </p>
                                        <p className="text-neutral-500 text-sm">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-bold">
                                        ${(tx.amount * tx.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </p>
                                    <p className="text-neutral-500 text-sm">
                                        @ ${tx.price.toLocaleString('en-US')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-neutral-500 text-sm">
                            No more transactions to display
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

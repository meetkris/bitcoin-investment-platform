"use client";

import Link from "next/link";
import { Bitcoin, Menu, X } from "lucide-react";
import ConnectWallet from "@/components/ConnectWallet";
import { useState } from "react";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-black text-neutral-50 font-sans selection:bg-btc-500/30">
            {/* Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-black/80 backdrop-blur-md">
                <div className="container mx-auto flex h-20 items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-xl bg-btc-500 flex items-center justify-center shadow-btc">
                            <Bitcoin className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-xl font-bold text-white">
                            Bitcoin Platform
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href="/about-bitcoin" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                            About Bitcoin
                        </Link>
                        <Link href="/invest" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                            Invest
                        </Link>
                        <Link href="/market-news" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                            Market News
                        </Link>
                        <Link href="/contact" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                            Contact
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                            Login
                        </Link>
                        <ConnectWallet />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-neutral-300 hover:text-white"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-neutral-900 bg-black">
                        <nav className="flex flex-col p-6 gap-4">
                            <Link href="/" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                                Home
                            </Link>
                            <Link href="/about-bitcoin" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                                About Bitcoin
                            </Link>
                            <Link href="/invest" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                                Invest
                            </Link>
                            <Link href="/market-news" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                                Market News
                            </Link>
                            <Link href="/contact" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                                Contact
                            </Link>
                            <div className="pt-4 border-t border-neutral-900">
                                <ConnectWallet />
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-black border-t border-neutral-900 pt-16 pb-8">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1">
                            <Link href="/" className="flex items-center gap-2 mb-6">
                                <div className="h-8 w-8 rounded-lg bg-btc-500 flex items-center justify-center">
                                    <Bitcoin className="w-5 h-5 text-black" />
                                </div>
                                <span className="text-lg font-bold text-white">Bitcoin Platform</span>
                            </Link>
                            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                                The world's most trusted Bitcoin investment platform. Secure, fast, and reliable.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6">Platform</h4>
                            <ul className="space-y-4 text-sm text-neutral-400">
                                <li><Link href="/invest" className="hover:text-btc-500 transition-colors">Buy Bitcoin</Link></li>
                                <li><Link href="/about-bitcoin" className="hover:text-btc-500 transition-colors">About Bitcoin</Link></li>
                                <li><Link href="/market-news" className="hover:text-btc-500 transition-colors">Market News</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6">Support</h4>
                            <ul className="space-y-4 text-sm text-neutral-400">
                                <li><Link href="/contact" className="hover:text-btc-500 transition-colors">Contact Us</Link></li>
                                <li><a href="mailto:support@yourdomain.com" className="hover:text-btc-500 transition-colors">support@yourdomain.com</a></li>
                                <li><Link href="#" className="hover:text-btc-500 transition-colors">FAQ</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6">Legal</h4>
                            <ul className="space-y-4 text-sm text-neutral-400">
                                <li><Link href="#" className="hover:text-btc-500 transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-btc-500 transition-colors">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-btc-500 transition-colors">Risk Disclosure</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-neutral-500 text-sm">
                            © {new Date().getFullYear()} Bitcoin Platform. All rights reserved.
                        </p>
                        <p className="text-neutral-600 text-xs">
                            ⚠️ Cryptocurrency investments carry risk. Only invest what you can afford to lose.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

import ConnectWallet from "@/components/ConnectWallet";
import { Shield, Zap, CheckCircle } from "lucide-react";

export const metadata = {
    title: "Connect Wallet | Bitcoin Investment Platform",
    description: "Connect your crypto wallet to start investing in Bitcoin. Supports MetaMask, Coinbase Wallet, and WalletConnect.",
};

export default function ConnectWalletPage() {
    return (
        <main className="flex min-h-screen flex-col bg-black">
            {/* Hero */}
            <section className="relative py-20 px-6 bg-black overflow-hidden min-h-[80vh] flex items-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-btc-500/10 rounded-full blur-[120px]"></div>

                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Connect Your <span className="text-btc-500">Wallet</span>
                        </h1>
                        <p className="text-xl text-neutral-400 mb-10">
                            Securely connect your crypto wallet to start investing in Bitcoin.
                        </p>

                        <div className="flex justify-center">
                            <ConnectWallet />
                        </div>
                    </div>

                    {/* Supported Wallets */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">Supported Wallets</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 text-center">
                                <div className="w-16 h-16 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🦊</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">MetaMask</h3>
                                <p className="text-neutral-400 text-sm">
                                    The most popular browser wallet
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 text-center">
                                <div className="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">💼</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Coinbase Wallet</h3>
                                <p className="text-neutral-400 text-sm">
                                    Secure wallet from Coinbase
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 text-center">
                                <div className="w-16 h-16 rounded-xl bg-btc-500/10 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🔗</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">WalletConnect</h3>
                                <p className="text-neutral-400 text-sm">
                                    Connect 300+ mobile wallets
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6 bg-neutral-950/50 border-y border-neutral-900">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        Why Connect Your Wallet?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                            <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-btc-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Full Control</h3>
                            <p className="text-neutral-400 text-sm">
                                You maintain complete control of your private keys. Your wallet, your Bitcoin.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                            <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-btc-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Instant Trading</h3>
                            <p className="text-neutral-400 text-sm">
                                Execute trades instantly without waiting for bank transfers or deposits.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                            <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                                <CheckCircle className="w-6 h-6 text-btc-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Secure Connection</h3>
                            <p className="text-neutral-400 text-sm">
                                Industry-standard encryption ensures your wallet connection is always secure.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Connect */}
            <section className="py-20 px-6 bg-black">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        How to Connect
                    </h2>

                    <div className="space-y-6">
                        {[
                            { step: "1", title: "Click Connect Wallet", desc: "Click the 'Connect Wallet' button above" },
                            { step: "2", title: "Choose Your Wallet", desc: "Select MetaMask, Coinbase Wallet, or scan QR code for mobile wallets" },
                            { step: "3", title: "Approve Connection", desc: "Approve the connection request in your wallet" },
                            { step: "4", title: "Start Investing", desc: "You're all set! Start buying Bitcoin immediately" },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-btc-500 flex items-center justify-center text-black font-bold text-xl">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                    <p className="text-neutral-400 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

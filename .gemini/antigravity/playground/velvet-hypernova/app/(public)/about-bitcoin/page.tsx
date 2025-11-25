import { Shield, TrendingUp, Zap, CheckCircle, Award, Globe } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "About Bitcoin | Bitcoin Investment Platform",
    description: "Learn about Bitcoin, blockchain technology, and why Bitcoin remains the world's most trusted cryptocurrency.",
};

export default function AboutBitcoinPage() {
    return (
        <main className="flex min-h-screen flex-col bg-black">
            {/* Hero Section */}
            <section className="relative py-20 px-6 bg-black overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-btc-500/10 rounded-full blur-[120px]"></div>

                <div className="container mx-auto max-w-4xl relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
                        What is <span className="text-btc-500">Bitcoin</span>?
                    </h1>
                    <p className="text-xl text-neutral-400 text-center max-w-3xl mx-auto">
                        Bitcoin is the world's first decentralized digital currency. Created in 2009, it operates without a central authority, enabling peer-to-peer transactions across a global network.
                    </p>
                </div>
            </section>

            {/* How Bitcoin Works */}
            <section className="py-20 px-6 bg-neutral-950/50 border-y border-neutral-900">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        How Bitcoin Works
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                            <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-btc-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Blockchain Technology</h3>
                            <p className="text-neutral-400 text-sm">
                                Every Bitcoin transaction is recorded on a public ledger called the blockchain. This distributed database is maintained by thousands of computers worldwide, making it virtually impossible to hack or manipulate.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                            <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                                <Globe className="w-6 h-6 text-btc-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Decentralization</h3>
                            <p className="text-neutral-400 text-sm">
                                No single entity controls Bitcoin. The network is maintained by miners and nodes distributed globally, ensuring censorship resistance and true financial sovereignty.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                            <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                                <CheckCircle className="w-6 h-6 text-btc-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Proof of Work</h3>
                            <p className="text-neutral-400 text-sm">
                                Bitcoin uses a consensus mechanism called Proof of Work. Miners compete to solve complex mathematical problems to validate transactions and secure the network.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Bitcoin Dominates */}
            <section className="py-20 px-6 bg-black">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        Why Bitcoin Remains Dominant
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="w-10 h-10 rounded-lg bg-btc-500/10 flex items-center justify-center">
                                    <Award className="w-5 h-5 text-btc-500" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">First Mover Advantage</h3>
                                <p className="text-neutral-400 text-sm">
                                    As the first cryptocurrency, Bitcoin has the strongest brand recognition, largest network effect, and most established infrastructure.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="w-10 h-10 rounded-lg bg-btc-500/10 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-btc-500" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Unmatched Security</h3>
                                <p className="text-neutral-400 text-sm">
                                    Bitcoin's network is the most secure blockchain in existence, protected by more computational power than any other cryptocurrency.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="w-10 h-10 rounded-lg bg-btc-500/10 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-btc-500" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Fixed Supply</h3>
                                <p className="text-neutral-400 text-sm">
                                    Only 21 million Bitcoin will ever exist. This scarcity makes it an excellent hedge against inflation and currency devaluation.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="w-10 h-10 rounded-lg bg-btc-500/10 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-btc-500" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Global Adoption</h3>
                                <p className="text-neutral-400 text-sm">
                                    Accepted by millions of merchants worldwide and recognized as legal tender in multiple countries, Bitcoin is truly global money.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bitcoin Timeline */}
            <section className="py-20 px-6 bg-neutral-950/50 border-y border-neutral-900">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        Bitcoin Milestones
                    </h2>

                    <div className="space-y-8">
                        {[
                            { year: "2008", title: "Bitcoin Whitepaper", desc: "Satoshi Nakamoto publishes the Bitcoin whitepaper" },
                            { year: "2009", title: "Genesis Block", desc: "The first Bitcoin block is mined" },
                            { year: "2010", title: "First Transaction", desc: "10,000 BTC used to buy two pizzas" },
                            { year: "2013", title: "$1,000 Milestone", desc: "Bitcoin reaches $1,000 for the first time" },
                            { year: "2017", title: "Mainstream Adoption", desc: "Bitcoin futures launch on major exchanges" },
                            { year: "2021", title: "All-Time High", desc: "Bitcoin reaches $69,000" },
                            { year: "2024", title: "Institutional Era", desc: "Major institutions hold Bitcoin as treasury reserve" },
                        ].map((milestone, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="shrink-0 w-20 text-right">
                                    <span className="text-btc-500 font-bold text-lg">{milestone.year}</span>
                                </div>
                                <div className="border-l-2 border-btc-500/30 pl-6 pb-8">
                                    <h3 className="text-white font-bold mb-1">{milestone.title}</h3>
                                    <p className="text-neutral-400 text-sm">{milestone.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-black">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready to Start Your Bitcoin Journey?
                    </h2>
                    <p className="text-xl text-neutral-400 mb-10">
                        Join millions of investors worldwide and start building your Bitcoin portfolio today.
                    </p>
                    <Link
                        href="/invest"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-btc-500 hover:bg-btc-600 text-black text-lg font-bold rounded-lg transition-all shadow-btc"
                    >
                        Start Investing
                    </Link>
                </div>
            </section>
        </main>
    );
}

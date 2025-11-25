import BitcoinHero from "@/components/BitcoinHero";
import AnimatedBTCStats from "@/components/AnimatedBTCStats";
import { Check, Shield, TrendingUp, Users, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <AnimatedBTCStats />
      <BitcoinHero />

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-black relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Why Invest in Bitcoin?
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Bitcoin is the world's first and most trusted cryptocurrency. Here's why millions of investors choose Bitcoin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-btc-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Unmatched Security</h3>
              <p className="text-neutral-400 text-sm">
                Protected by the world's most secure blockchain network with military-grade encryption and decentralized architecture.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-btc-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Inflation Hedge</h3>
              <p className="text-neutral-400 text-sm">
                With a fixed supply of 21 million coins, Bitcoin is designed to resist inflation and preserve value over time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-btc-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Global Adoption</h3>
              <p className="text-neutral-400 text-sm">
                Accepted worldwide by millions of merchants and institutions. Send and receive payments anywhere, anytime.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-btc-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Proven Track Record</h3>
              <p className="text-neutral-400 text-sm">
                Over 15 years of continuous operation with 99.99% uptime. The most battle-tested cryptocurrency in existence.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-btc-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Full Transparency</h3>
              <p className="text-neutral-400 text-sm">
                Every transaction is recorded on the public blockchain. Complete transparency and auditability guaranteed.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-btc-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-btc-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Long-Term Growth</h3>
              <p className="text-neutral-400 text-sm">
                Historically the best-performing asset class. Bitcoin has outperformed traditional investments over the past decade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-neutral-950/50 border-y border-neutral-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Trusted by Investors Worldwide
            </h2>
            <p className="text-neutral-400">
              Join thousands of satisfied investors who trust our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-btc-500">★</span>
                  ))}
                </div>
                <p className="text-neutral-300 mb-4">
                  "Best Bitcoin platform I've used. The interface is clean, secure, and the transaction speeds are incredible. Highly recommended!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-btc-500/20 flex items-center justify-center text-btc-500 font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Investor #{i}</p>
                    <p className="text-neutral-500 text-xs">Verified User</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Bitcoin Journey?
          </h2>
          <p className="text-xl text-neutral-400 mb-10">
            Join millions of investors worldwide. Start investing in Bitcoin today with as little as $10.
          </p>
          <Link
            href="/invest"
            className="inline-flex items-center gap-2 px-8 py-4 bg-btc-500 hover:bg-btc-600 text-black text-lg font-bold rounded-lg transition-all shadow-btc"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </main>
  );
}

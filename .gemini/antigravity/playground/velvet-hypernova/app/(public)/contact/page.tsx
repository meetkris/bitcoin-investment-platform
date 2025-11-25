"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus("sending");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setFormStatus("success");
                (e.target as HTMLFormElement).reset();
            } else {
                setFormStatus("error");
            }
        } catch (error) {
            setFormStatus("error");
        }
    };

    return (
        <main className="flex min-h-screen flex-col bg-black">
            {/* Hero */}
            <section className="relative py-20 px-6 bg-black overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

                <div className="container mx-auto max-w-4xl relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
                        Get in <span className="text-btc-500">Touch</span>
                    </h1>
                    <p className="text-xl text-neutral-400 text-center">
                        Have questions? We're here to help. Reach out to our support team.
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20 px-6 bg-neutral-950/50 border-y border-neutral-900">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-900">
                            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-lg text-white focus:border-btc-500 focus:outline-none"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-lg text-white focus:border-btc-500 focus:outline-none"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-lg text-white focus:border-btc-500 focus:outline-none resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={formStatus === "sending"}
                                    className="w-full px-6 py-3 bg-btc-500 hover:bg-btc-600 text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {formStatus === "sending" ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                {formStatus === "success" && (
                                    <p className="text-green-500 text-sm">Message sent successfully!</p>
                                )}
                                {formStatus === "error" && (
                                    <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>
                                )}
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                                <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                                    <Mail className="w-6 h-6 text-btc-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                                <p className="text-neutral-400 mb-3">
                                    Get in touch with our support team
                                </p>
                                <a href="mailto:support@yourdomain.com" className="text-btc-500 hover:text-btc-400">
                                    support@yourdomain.com
                                </a>
                            </div>

                            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                                <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                                    <Phone className="w-6 h-6 text-btc-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
                                <p className="text-neutral-400">
                                    Our team is available around the clock to assist you with any questions or concerns.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900">
                                <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center mb-4">
                                    <MapPin className="w-6 h-6 text-btc-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Global Presence</h3>
                                <p className="text-neutral-400">
                                    Serving customers worldwide with offices in major financial centers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6 bg-black">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {[
                            {
                                q: "How do I start investing in Bitcoin?",
                                a: "Simply create an account, verify your identity, connect your wallet, and start buying Bitcoin. Our platform makes it easy for beginners."
                            },
                            {
                                q: "Is my Bitcoin safe on your platform?",
                                a: "Yes. We use bank-grade security, cold storage for the majority of funds, and multi-signature wallets to ensure maximum security."
                            },
                            {
                                q: "What are the fees?",
                                a: "We offer competitive fees starting at 0.5% per transaction. Volume traders receive discounted rates."
                            },
                            {
                                q: "How long do withdrawals take?",
                                a: "Bitcoin withdrawals are typically processed within 30 minutes. Bank transfers may take 1-3 business days."
                            },
                        ].map((faq, i) => (
                            <details key={i} className="p-6 rounded-xl bg-neutral-950 border border-neutral-900 group">
                                <summary className="font-bold text-white cursor-pointer list-none flex items-center justify-between">
                                    {faq.q}
                                    <span className="text-btc-500 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-neutral-400 text-sm">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

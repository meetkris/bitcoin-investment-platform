"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import { Bitcoin, Mail, Lock, AlertCircle } from "lucide-react";

function SigninForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    const supabase = createClient();

    async function handleSignin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("Network error. Please try again.");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-btc-500/10 rounded-full blur-[120px]"></div>

            <div className="max-w-md w-full relative z-10">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="h-12 w-12 rounded-xl bg-btc-500 flex items-center justify-center shadow-btc">
                        <Bitcoin className="w-7 h-7 text-black" />
                    </div>
                    <span className="text-2xl font-bold text-white">Bitcoin Platform</span>
                </Link>

                {/* Signin Card */}
                <div className="bg-neutral-950 rounded-2xl shadow-2xl p-8 border border-neutral-900">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-neutral-400">Sign in to your account</p>
                    </div>

                    {message && (
                        <div className="mb-6 p-4 bg-green-950/50 border border-green-900 text-green-400 rounded-lg text-sm">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-950/50 border border-red-900 text-red-400 rounded-lg text-sm flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSignin}>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-neutral-800 bg-black text-white focus:ring-2 focus:ring-btc-500 focus:border-btc-500 outline-none transition-all"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-neutral-300">
                                    Password
                                </label>
                                <Link
                                    href="/reset-password"
                                    className="text-sm text-btc-500 hover:text-btc-400 transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-neutral-800 bg-black text-white focus:ring-2 focus:ring-btc-500 focus:border-btc-500 outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-btc-500 hover:bg-btc-600 text-black font-bold rounded-lg transition-all disabled:opacity-50 shadow-btc flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    Signing In...
                                </>
                            ) : (
                                "Log In"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-neutral-400">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-btc-500 hover:text-btc-400 font-medium">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-neutral-400 hover:text-btc-500 transition-colors">
                        ← Back to Home
                    </Link>
                </div>

                <p className="text-center text-neutral-600 text-xs mt-6">
                    Secure login with end-to-end encryption
                </p>
            </div>
        </div>
    );
}

export default function SigninPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <SigninForm />
        </Suspense>
    );
}

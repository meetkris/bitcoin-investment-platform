"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { Bitcoin, Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

export default function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const supabase = createClient();

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                setSuccess(true);
                setLoading(false);
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

                {/* Reset Password Card */}
                <div className="bg-neutral-950 rounded-2xl shadow-2xl p-8 border border-neutral-900">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                        <p className="text-neutral-400">
                            {success
                                ? "Check your email for the reset link"
                                : "Enter your email to receive a password reset link"}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-950/50 border border-red-900 text-red-400 rounded-lg text-sm flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success ? (
                        <div className="mb-6 p-6 bg-green-950/50 border border-green-900 rounded-lg text-center">
                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <p className="text-green-400 mb-4">
                                Password reset email sent! Check your inbox and follow the instructions.
                            </p>
                            <Link
                                href="/signin"
                                className="inline-flex items-center gap-2 text-btc-500 hover:text-btc-400 font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Sign In
                            </Link>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleResetPassword}>
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-btc-500 hover:bg-btc-600 text-black font-bold rounded-lg transition-all disabled:opacity-50 shadow-btc flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </button>
                        </form>
                    )}

                    {!success && (
                        <div className="mt-6 text-center">
                            <Link
                                href="/signin"
                                className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-btc-500 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Sign In
                            </Link>
                        </div>
                    )}
                </div>

                <p className="text-center text-neutral-600 text-xs mt-6">
                    Password reset links expire after 1 hour
                </p>
            </div>
        </div>
    );
}

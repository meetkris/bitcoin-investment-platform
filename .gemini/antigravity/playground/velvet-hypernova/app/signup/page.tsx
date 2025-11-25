"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Bitcoin, Mail, Lock, User, CheckCircle, XCircle, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();
    const supabase = createClient();

    // Password strength calculation
    const getPasswordStrength = (pass: string) => {
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (pass.length >= 12) strength++;
        if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
        if (/\d/.test(pass)) strength++;
        if (/[^a-zA-Z0-9]/.test(pass)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength(password);
    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"];

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!agreedToTerms) {
            newErrors.terms = "You must agree to the Terms & Privacy Policy";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (error) {
                setErrors({ submit: error.message });
                setLoading(false);
            } else {
                router.push("/signin?message=Check your email to confirm your account");
            }
        } catch (err) {
            setErrors({ submit: "Network error. Please try again." });
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-btc-500/10 rounded-full blur-[120px]"></div>

            <div className="max-w-md w-full relative z-10">
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="h-12 w-12 rounded-xl bg-btc-500 flex items-center justify-center shadow-btc">
                        <Bitcoin className="w-7 h-7 text-black" />
                    </div>
                    <span className="text-2xl font-bold text-white">Bitcoin Platform</span>
                </Link>

                <div className="bg-neutral-950 rounded-2xl shadow-2xl p-8 border border-neutral-900">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-neutral-400">Join the Bitcoin revolution</p>
                    </div>

                    {errors.submit && (
                        <div className="mb-6 p-4 bg-red-950/50 border border-red-900 text-red-400 rounded-lg text-sm flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span>{errors.submit}</span>
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSignup}>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className={`w-full pl-11 pr-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-neutral-800'} bg-black text-white focus:ring-2 focus:ring-btc-500 focus:border-btc-500 outline-none transition-all`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.fullName && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4" />{errors.fullName}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-11 pr-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-neutral-800'} bg-black text-white focus:ring-2 focus:ring-btc-500 focus:border-btc-500 outline-none transition-all`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4" />{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full pl-11 pr-12 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-neutral-800'} bg-black text-white focus:ring-2 focus:ring-btc-500 focus:border-btc-500 outline-none transition-all`}
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4" />{errors.password}</p>}
                            {password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className={`h-1 flex-1 rounded-full ${i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-neutral-800'}`} />
                                        ))}
                                    </div>
                                    <p className="text-xs text-neutral-400">Strength: <span className={passwordStrength >= 4 ? 'text-green-500' : 'text-yellow-500'}>{strengthLabels[passwordStrength - 1] || "Very Weak"}</span></p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`w-full pl-11 pr-12 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-neutral-800'} bg-black text-white focus:ring-2 focus:ring-btc-500 focus:border-btc-500 outline-none transition-all`}
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300">
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4" />{errors.confirmPassword}</p>}
                            {confirmPassword && password === confirmPassword && <p className="mt-1 text-sm text-green-500 flex items-center gap-1"><CheckCircle className="w-4 h-4" />Passwords match</p>}
                        </div>

                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-1 w-4 h-4 rounded border-neutral-800 bg-black text-btc-500 focus:ring-2 focus:ring-btc-500" />
                                <span className="text-sm text-neutral-400">I agree to the <Link href="#" className="text-btc-500 hover:text-btc-400">Terms of Service</Link> and <Link href="#" className="text-btc-500 hover:text-btc-400">Privacy Policy</Link></span>
                            </label>
                            {errors.terms && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4" />{errors.terms}</p>}
                        </div>

                        <button type="submit" className="w-full py-3 bg-btc-500 hover:bg-btc-600 text-black font-bold rounded-lg transition-all shadow-btc flex items-center justify-center gap-2">
                            {loading ? (<><div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>Creating Account...</>) : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-neutral-400">Already have an account? <Link href="/signin" className="text-btc-500 hover:text-btc-400 font-medium">Sign in</Link></p>
                    </div>
                </div>

                <p className="text-center text-neutral-600 text-xs mt-6">Protected by industry-standard encryption</p>
            </div>
        </div>
    );
}

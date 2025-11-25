import { Check } from "lucide-react";

interface InvestmentCardProps {
    title: string;
    roi: string;
    duration: string;
    min: string;
    max: string;
    features: string[];
    recommended?: boolean;
}

export default function InvestmentCard({
    title,
    roi,
    duration,
    min,
    max,
    features,
    recommended = false,
}: InvestmentCardProps) {
    return (
        <div
            className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${recommended
                    ? "bg-slate-900/80 border-violet-500 shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)]"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                }`}
        >
            {recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-600 text-white text-xs font-bold rounded-full shadow-lg">
                    MOST POPULAR
                </div>
            )}

            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                        {roi}
                    </span>
                    <span className="text-slate-400">ROI</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">Duration: {duration}</p>
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Min Deposit</span>
                    <span className="text-white font-medium">{min}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Max Deposit</span>
                    <span className="text-white font-medium">{max}</span>
                </div>
                <ul className="space-y-2 mt-4">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                            <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                className={`w-full py-3 rounded-lg font-bold transition-all ${recommended
                        ? "bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-lg shadow-violet-900/20"
                        : "bg-slate-800 hover:bg-slate-700 text-white"
                    }`}
            >
                Invest Now
            </button>
        </div>
    );
}

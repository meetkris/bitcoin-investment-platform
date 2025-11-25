"use client";

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon: LucideIcon;
}

export default function StatsCard({
    title,
    value,
    change,
    changeType = "neutral",
    icon: Icon,
}: StatsCardProps) {
    const changeColors = {
        positive: "text-green-600",
        negative: "text-red-600",
        neutral: "text-gray-600",
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{title}</h3>
                <div className="w-10 h-10 rounded-lg bg-btc-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-btc-500" />
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                {change && (
                    <p className={`text-sm font-medium ${changeColors[changeType]}`}>
                        {change}
                    </p>
                )}
            </div>
        </div>
    );
}

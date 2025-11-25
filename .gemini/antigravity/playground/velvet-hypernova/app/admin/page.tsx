"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import { Users, Activity, UserPlus, TrendingUp } from "lucide-react";

interface Stats {
    totalUsers: number;
    userGrowth: string;
    activeSessions: number;
    sessionGrowth: string;
    newSignups: number;
    signupGrowth: string;
    totalTransactions: number;
    pendingTransactions: number;
    recentActivity: Array<{
        id: string;
        full_name: string;
        email: string;
        created_at: string;
    }>;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-btc-500"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">
                        Welcome back! Here's what's happening with your platform.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Total Users"
                        value={stats?.totalUsers || 0}
                        change={stats?.userGrowth}
                        changeType="positive"
                        icon={Users}
                    />
                    <StatsCard
                        title="Active Sessions"
                        value={stats?.activeSessions || 0}
                        change={stats?.sessionGrowth}
                        changeType="positive"
                        icon={Activity}
                    />
                    <StatsCard
                        title="New Signups"
                        value={stats?.newSignups || 0}
                        change={stats?.signupGrowth}
                        changeType="positive"
                        icon={UserPlus}
                    />
                    <StatsCard
                        title="Total Transactions"
                        value={stats?.totalTransactions || 0}
                        change={`${stats?.pendingTransactions || 0} pending`}
                        changeType="neutral"
                        icon={TrendingUp}
                    />
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                            stats.recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 font-semibold text-sm">
                                                {activity.full_name?.charAt(0)?.toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {activity.full_name || 'Unknown User'}
                                            </p>
                                            <p className="text-xs text-gray-500">{activity.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">
                                            {new Date(activity.created_at).toLocaleDateString()}
                                        </p>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                                            Completed
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-8 text-center text-gray-500">
                                No recent activity
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a
                        href="/admin/users"
                        className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Manage Users</h3>
                            <Users className="w-6 h-6 text-btc-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-sm text-gray-600">
                            View and manage all registered users
                        </p>
                    </a>

                    <a
                        href="/admin/transactions"
                        className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Transactions</h3>
                            <TrendingUp className="w-6 h-6 text-btc-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-sm text-gray-600">
                            Monitor and manage all transactions
                        </p>
                    </a>

                    <a
                        href="/admin/settings"
                        className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
                            <Activity className="w-6 h-6 text-btc-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-sm text-gray-600">
                            Configure platform settings
                        </p>
                    </a>
                </div>
            </div>
        </AdminLayout>
    );
}

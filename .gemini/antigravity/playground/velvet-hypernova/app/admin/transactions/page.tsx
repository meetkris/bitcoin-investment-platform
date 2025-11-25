"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
    Search,
    Filter,
    Download,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle,
    XCircle,
} from "lucide-react";

interface Transaction {
    id: string;
    user_id: string;
    type: string;
    amount: number;
    btc_amount: number;
    btc_price: number;
    status: string;
    payment_method: string;
    created_at: string;
    completed_at: string | null;
    user_profiles: {
        full_name: string;
        email: string;
    };
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTransactions();
    }, [page, statusFilter, typeFilter]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            // Mock data for now - replace with real API call
            const mockData: Transaction[] = Array.from({ length: 20 }, (_, i) => ({
                id: `tx-${i}`,
                user_id: `user-${i}`,
                type: i % 3 === 0 ? 'buy' : i % 3 === 1 ? 'sell' : 'withdrawal',
                amount: Math.random() * 10000,
                btc_amount: Math.random() * 0.5,
                btc_price: 85000 + Math.random() * 5000,
                status: i % 4 === 0 ? 'pending' : i % 4 === 1 ? 'completed' : i % 4 === 2 ? 'failed' : 'cancelled',
                payment_method: i % 2 === 0 ? 'Bank Transfer' : 'Credit Card',
                created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                completed_at: i % 4 === 1 ? new Date().toISOString() : null,
                user_profiles: {
                    full_name: `User ${i}`,
                    email: `user${i}@example.com`,
                },
            }));

            setTransactions(mockData);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            completed: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle },
            pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
            failed: { bg: "bg-red-100", text: "text-red-800", icon: XCircle },
            cancelled: { bg: "bg-gray-100", text: "text-gray-800", icon: XCircle },
        };

        const style = styles[status as keyof typeof styles] || styles.pending;
        const Icon = style.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                <Icon className="w-3 h-3" />
                {status}
            </span>
        );
    };

    const getTypeIcon = (type: string) => {
        return type === 'buy' || type === 'deposit' ? (
            <ArrowDownRight className="w-4 h-4 text-green-600" />
        ) : (
            <ArrowUpRight className="w-4 h-4 text-red-600" />
        );
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
                        <p className="text-gray-600 mt-1">
                            Monitor and manage all platform transactions
                        </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-btc-500 hover:bg-btc-600 text-black font-semibold rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                        Export
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by transaction ID or user..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btc-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-400" />
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btc-500 focus:border-transparent"
                            >
                                <option value="all">All Types</option>
                                <option value="buy">Buy</option>
                                <option value="sell">Sell</option>
                                <option value="deposit">Deposit</option>
                                <option value="withdrawal">Withdrawal</option>
                            </select>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btc-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Transaction
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-btc-500"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No transactions found
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <p className="font-medium text-gray-900">{tx.id}</p>
                                                    <p className="text-gray-500">{tx.payment_method}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <p className="font-medium text-gray-900">{tx.user_profiles.full_name}</p>
                                                    <p className="text-gray-500">{tx.user_profiles.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {getTypeIcon(tx.type)}
                                                    <span className="text-sm font-medium text-gray-900 capitalize">
                                                        {tx.type}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <p className="font-medium text-gray-900">
                                                        ${tx.amount.toFixed(2)}
                                                    </p>
                                                    <p className="text-gray-500">
                                                        {tx.btc_amount.toFixed(6)} BTC
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(tx.status)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(tx.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing {transactions.length} transactions
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-sm text-gray-600">Page {page}</span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

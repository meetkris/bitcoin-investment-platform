"use client";

import { useEffect, useState } from "react";

interface Email {
    id: number;
    from: string;
    subject: string;
    date: Date;
    text: string;
}

export default function Inbox() {
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEmails();
    }, []);

    async function fetchEmails() {
        try {
            setLoading(true);
            const response = await fetch("/api/webmail?folder=INBOX&limit=50");

            if (!response.ok) throw new Error("Failed to fetch emails");

            const data = await response.json();
            setEmails(data.emails);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to load emails. Please check your email configuration.");
        } finally {
            setLoading(false);
        }
    }

    function formatDate(date: Date) {
        const emailDate = new Date(date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (emailDate.toDateString() === today.toDateString()) {
            return emailDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        } else if (emailDate.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return emailDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }

    return (
        <div className="flex flex-col h-full">
            <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white dark:bg-slate-900">
                <h1 className="text-xl font-bold">Inbox ({emails.length})</h1>
                <button
                    onClick={fetchEmails}
                    disabled={loading}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Refresh'}
                </button>
            </header>
            <div className="flex-grow overflow-auto bg-white dark:bg-slate-900">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading your Gmail inbox...</div>
                ) : error ? (
                    <div className="p-8 text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button onClick={fetchEmails} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                            Try Again
                        </button>
                    </div>
                ) : emails.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No emails found</div>
                ) : (
                    emails.map((email) => (
                        <div key={email.id} className="flex items-center gap-4 p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-medium shrink-0">
                                {email.from[0]?.toUpperCase() || '?'}
                            </div>
                            <div className="flex-grow min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-semibold text-slate-900 dark:text-white truncate">{email.from}</h3>
                                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{formatDate(email.date)}</span>
                                </div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{email.subject}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{email.text?.substring(0, 100) || '(No content)'}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

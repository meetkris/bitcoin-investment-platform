import Link from "next/link";

export default function WebmailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col">
                <div className="p-6">
                    <Link href="/" className="text-xl font-bold text-blue-900 dark:text-blue-500">
                        Velvet<span className="text-amber-700 dark:text-amber-400">Mail</span>
                    </Link>
                </div>
                <div className="px-4 mb-6">
                    <Link href="/webmail/compose" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md flex items-center justify-center gap-2">
                        <span>+</span> Compose
                    </Link>
                </div>
                <nav className="flex-grow px-2 space-y-1">
                    <Link href="/webmail" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium">
                        <span>📥</span> Inbox <span className="ml-auto text-xs bg-blue-200 dark:bg-blue-800 px-2 py-0.5 rounded-full">4</span>
                    </Link>
                    <Link href="/webmail/sent" className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span>📤</span> Sent
                    </Link>
                    <Link href="/webmail/drafts" className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span>📝</span> Drafts
                    </Link>
                    <Link href="/webmail/trash" className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span>🗑️</span> Trash
                    </Link>
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold">
                            K
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">Kristech</p>
                            <p className="text-xs text-slate-500 truncate">kristech.ec@gmail.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden">
                {children}
            </main>
        </div>
    );
}

import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-900 dark:text-blue-500">
                    Velvet<span className="text-amber-700 dark:text-amber-400">Hypernova</span>
                </Link>
                <nav className="hidden md:flex gap-6">
                    <Link href="/" className="text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-500 transition-colors">Home</Link>
                    <Link href="/about" className="text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-500 transition-colors">About</Link>
                    <Link href="/services" className="text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-500 transition-colors">Services</Link>
                    <Link href="/blog" className="text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-500 transition-colors">Blog</Link>
                    <Link href="/contact" className="text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-500 transition-colors">Contact</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="px-4 py-2 text-sm font-medium text-white bg-blue-900 dark:bg-blue-600 rounded-md hover:bg-blue-800 dark:hover:bg-blue-500 transition-colors">
                        Admin
                    </Link>
                    <Link href="/webmail" className="px-4 py-2 text-sm font-medium text-white bg-amber-700 dark:bg-amber-500 rounded-md hover:bg-amber-800 dark:hover:bg-amber-400 transition-colors">
                        Webmail
                    </Link>
                </div>
            </div>
        </header>
    );
}

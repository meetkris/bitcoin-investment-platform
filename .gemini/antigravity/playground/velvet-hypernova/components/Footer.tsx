import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-blue-900 dark:bg-slate-900 text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Velvet Hypernova</h3>
                    <p className="text-blue-100 dark:text-slate-400">
                        Leading the way in corporate excellence and digital innovation.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link href="/about" className="text-blue-100 dark:text-slate-400 hover:text-sky-400 transition-colors">About Us</Link></li>
                        <li><Link href="/services" className="text-blue-100 dark:text-slate-400 hover:text-sky-400 transition-colors">Services</Link></li>
                        <li><Link href="/blog" className="text-blue-100 dark:text-slate-400 hover:text-sky-400 transition-colors">Blog</Link></li>
                        <li><Link href="/contact" className="text-blue-100 dark:text-slate-400 hover:text-sky-400 transition-colors">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Legal</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="text-blue-100 dark:text-slate-400 hover:text-sky-400 transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="text-blue-100 dark:text-slate-400 hover:text-sky-400 transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Connect</h4>
                    <div className="flex gap-4">
                        {/* Social Icons Placeholders */}
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">F</div>
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">T</div>
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">L</div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-white/10 text-center text-sm text-blue-200 dark:text-slate-500">
                © {new Date().getFullYear()} Velvet Hypernova. All rights reserved.
            </div>
        </footer>
    );
}

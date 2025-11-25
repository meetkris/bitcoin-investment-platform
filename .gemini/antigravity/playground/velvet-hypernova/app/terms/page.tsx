import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Terms of Service | Bitcoin Investment Platform",
    description: "Terms and conditions for using our Bitcoin investment platform",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="border-b border-neutral-900 bg-neutral-950/50 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-btc-500 hover:text-btc-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </div>

            {/* Content */}
            <main className="container mx-auto px-6 py-12 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Terms of Service
                </h1>
                <p className="text-neutral-400 mb-8">
                    Last updated: November 25, 2025
                </p>

                <div className="prose prose-invert prose-neutral max-w-none">
                    <div className="space-y-8 text-neutral-300">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                            <p className="mb-4">
                                By accessing and using this Bitcoin investment platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this Service.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
                            <p className="mb-4">
                                Permission is granted to temporarily access the materials (information or software) on our platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for any commercial purpose or for any public display</li>
                                <li>Attempt to decompile or reverse engineer any software contained on the platform</li>
                                <li>Remove any copyright or other proprietary notations from the materials</li>
                                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Investment Risks</h2>
                            <p className="mb-4">
                                <strong className="text-btc-500">IMPORTANT:</strong> Cryptocurrency investments carry significant risk. You acknowledge that:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Bitcoin and cryptocurrency prices are highly volatile</li>
                                <li>You may lose some or all of your invested capital</li>
                                <li>Past performance does not guarantee future results</li>
                                <li>You should only invest what you can afford to lose</li>
                                <li>This platform does not provide financial advice</li>
                            </ul>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Account Responsibilities</h2>
                            <p className="mb-4">
                                You are responsible for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Maintaining the confidentiality of your account credentials</li>
                                <li>All activities that occur under your account</li>
                                <li>Notifying us immediately of any unauthorized use</li>
                                <li>Ensuring your account information is accurate and up-to-date</li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Prohibited Activities</h2>
                            <p className="mb-4">
                                You agree not to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Use the Service for any illegal purpose</li>
                                <li>Engage in money laundering or terrorist financing</li>
                                <li>Manipulate market prices or engage in fraudulent trading</li>
                                <li>Violate any applicable laws or regulations</li>
                                <li>Interfere with or disrupt the Service or servers</li>
                            </ul>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Disclaimer</h2>
                            <p className="mb-4">
                                The materials on our platform are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                        </section>

                        {/* Section 7 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Limitations</h2>
                            <p className="mb-4">
                                In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
                            </p>
                        </section>

                        {/* Section 8 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Accuracy of Materials</h2>
                            <p className="mb-4">
                                The materials appearing on our platform could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our platform are accurate, complete, or current. We may make changes to the materials contained on our platform at any time without notice.
                            </p>
                        </section>

                        {/* Section 9 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. Links</h2>
                            <p className="mb-4">
                                We have not reviewed all of the sites linked to our platform and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
                            </p>
                        </section>

                        {/* Section 10 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">10. Modifications</h2>
                            <p className="mb-4">
                                We may revise these terms of service for our platform at any time without notice. By using this platform you are agreeing to be bound by the then current version of these terms of service.
                            </p>
                        </section>

                        {/* Section 11 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
                            <p className="mb-4">
                                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                            </p>
                        </section>

                        {/* Contact */}
                        <section className="pt-8 border-t border-neutral-800">
                            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                            <p className="mb-4">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/contact" className="text-btc-500 hover:text-btc-400 transition-colors">
                                        Contact Form
                                    </Link>
                                </li>
                                <li className="text-neutral-400">Email: legal@bitcoinplatform.com</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

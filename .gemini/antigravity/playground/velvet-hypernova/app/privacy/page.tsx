import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";

export const metadata = {
    title: "Privacy Policy | Bitcoin Investment Platform",
    description: "How we collect, use, and protect your personal information",
};

export default function PrivacyPage() {
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
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-btc-500/10 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-btc-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Privacy Policy
                    </h1>
                </div>

                <p className="text-neutral-400 mb-8">
                    Last updated: November 25, 2025
                </p>

                {/* Privacy Commitment Banner */}
                <div className="p-6 rounded-2xl bg-btc-500/10 border border-btc-500/30 mb-8">
                    <p className="text-white text-lg">
                        <strong className="text-btc-500">Your privacy is our priority.</strong> We are committed to protecting your personal information and being transparent about how we collect, use, and safeguard your data.
                    </p>
                </div>

                <div className="prose prose-invert prose-neutral max-w-none">
                    <div className="space-y-8 text-neutral-300">
                        {/* Section 1 */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Database className="w-6 h-6 text-btc-500" />
                                <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 mt-6">Personal Information</h3>
                            <p className="mb-4">
                                When you create an account, we collect:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Full name</li>
                                <li>Email address</li>
                                <li>Password (encrypted)</li>
                                <li>Account creation date</li>
                            </ul>

                            <h3 className="text-xl font-bold text-white mb-3 mt-6">Transaction Information</h3>
                            <p className="mb-4">
                                When you use our platform, we may collect:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Bitcoin wallet addresses</li>
                                <li>Transaction history</li>
                                <li>Investment amounts and dates</li>
                                <li>Portfolio holdings</li>
                            </ul>

                            <h3 className="text-xl font-bold text-white mb-3 mt-6">Technical Information</h3>
                            <p className="mb-4">
                                We automatically collect:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>IP address</li>
                                <li>Browser type and version</li>
                                <li>Device information</li>
                                <li>Operating system</li>
                                <li>Access times and dates</li>
                                <li>Pages viewed and links clicked</li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="w-6 h-6 text-btc-500" />
                                <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
                            </div>

                            <p className="mb-4">
                                We use your information to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Create and manage your account</li>
                                <li>Process your Bitcoin transactions</li>
                                <li>Provide customer support</li>
                                <li>Send important account notifications</li>
                                <li>Improve our platform and services</li>
                                <li>Detect and prevent fraud</li>
                                <li>Comply with legal obligations</li>
                                <li>Send marketing communications (with your consent)</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="w-6 h-6 text-btc-500" />
                                <h2 className="text-2xl font-bold text-white">3. Data Security</h2>
                            </div>

                            <p className="mb-4">
                                We implement industry-standard security measures to protect your data:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>Encryption:</strong> All data is encrypted in transit using SSL/TLS</li>
                                <li><strong>Password Security:</strong> Passwords are hashed using bcrypt</li>
                                <li><strong>Secure Storage:</strong> Data is stored on secure, encrypted servers</li>
                                <li><strong>Access Controls:</strong> Strict access controls limit who can view your data</li>
                                <li><strong>Regular Audits:</strong> We conduct regular security audits</li>
                                <li><strong>Two-Factor Authentication:</strong> Optional 2FA for enhanced security</li>
                            </ul>

                            <div className="mt-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                                <p className="text-sm text-neutral-400">
                                    <strong className="text-white">Note:</strong> While we implement robust security measures, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                                </p>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <UserCheck className="w-6 h-6 text-btc-500" />
                                <h2 className="text-2xl font-bold text-white">4. Information Sharing</h2>
                            </div>

                            <p className="mb-4">
                                We do not sell your personal information. We may share your information with:
                            </p>

                            <h3 className="text-xl font-bold text-white mb-3 mt-6">Service Providers</h3>
                            <p className="mb-4">
                                Third-party companies that help us operate our platform:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Email service providers (for account notifications)</li>
                                <li>Cloud hosting providers (for data storage)</li>
                                <li>Analytics providers (to improve our service)</li>
                                <li>Payment processors (for transactions)</li>
                            </ul>

                            <h3 className="text-xl font-bold text-white mb-3 mt-6">Legal Requirements</h3>
                            <p className="mb-4">
                                We may disclose your information if required by law or to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Comply with legal processes</li>
                                <li>Enforce our Terms of Service</li>
                                <li>Protect our rights and property</li>
                                <li>Prevent fraud or illegal activity</li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-6 h-6 text-btc-500" />
                                <h2 className="text-2xl font-bold text-white">5. Your Privacy Rights</h2>
                            </div>

                            <p className="mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>Access:</strong> Request a copy of your personal data</li>
                                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                                <li><strong>Object:</strong> Object to certain data processing activities</li>
                            </ul>

                            <p className="mt-4">
                                To exercise these rights, please contact us at{" "}
                                <a href="mailto:privacy@bitcoinplatform.com" className="text-btc-500 hover:text-btc-400">
                                    privacy@bitcoinplatform.com
                                </a>
                            </p>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Database className="w-6 h-6 text-btc-500" />
                                <h2 className="text-2xl font-bold text-white">6. Data Retention</h2>
                            </div>

                            <p className="mb-4">
                                We retain your personal information for as long as necessary to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide our services to you</li>
                                <li>Comply with legal obligations</li>
                                <li>Resolve disputes</li>
                                <li>Enforce our agreements</li>
                            </ul>
                            <p className="mt-4">
                                When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it by law.
                            </p>
                        </section>

                        {/* Section 7 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>

                            <p className="mb-4">
                                We use cookies and similar technologies to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Keep you signed in</li>
                                <li>Remember your preferences</li>
                                <li>Analyze platform usage</li>
                                <li>Improve user experience</li>
                            </ul>
                            <p className="mt-4">
                                You can control cookies through your browser settings. Note that disabling cookies may affect platform functionality.
                            </p>
                        </section>

                        {/* Section 8 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>

                            <p className="mb-4">
                                Our platform is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                            </p>
                        </section>

                        {/* Section 9 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>

                            <p className="mb-4">
                                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
                            </p>
                        </section>

                        {/* Section 10 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>

                            <p className="mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Posting the new policy on this page</li>
                                <li>Updating the "Last updated" date</li>
                                <li>Sending you an email notification (for significant changes)</li>
                            </ul>
                            <p className="mt-4">
                                Your continued use of the platform after changes constitutes acceptance of the updated policy.
                            </p>
                        </section>

                        {/* Contact */}
                        <section className="pt-8 border-t border-neutral-800">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-6 h-6 text-btc-500" />
                                <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                            </div>

                            <p className="mb-4">
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="space-y-3 p-6 rounded-xl bg-neutral-900 border border-neutral-800">
                                <div>
                                    <p className="text-sm text-neutral-500">Email</p>
                                    <a href="mailto:privacy@bitcoinplatform.com" className="text-btc-500 hover:text-btc-400">
                                        privacy@bitcoinplatform.com
                                    </a>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-500">Contact Form</p>
                                    <Link href="/contact" className="text-btc-500 hover:text-btc-400">
                                        Visit our contact page
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

export const metadata = {
    title: "Services | Velvet Hypernova",
    description: "Explore our premium corporate services including secure cloud storage, enterprise webmail, and data analytics.",
};

export default function ServicesPage() {
    const services = [
        {
            title: "Secure Cloud Infrastructure",
            description: "Enterprise-grade cloud solutions with military-grade encryption and 99.99% uptime guarantee.",
            icon: "☁️",
        },
        {
            title: "Corporate Webmail",
            description: "A unified communication platform integrating email, calendar, and contacts with seamless mobile sync.",
            icon: "📧",
        },
        {
            title: "Asset Management",
            description: "Track and manage physical and digital assets with our comprehensive, real-time dashboard.",
            icon: "💎",
        },
        {
            title: "Advanced Analytics",
            description: "Turn data into actionable insights with our AI-powered analytics engine and custom reporting.",
            icon: "📊",
        },
        {
            title: "Cyber Security",
            description: "Proactive threat detection and automated response systems to keep your business safe.",
            icon: "🛡️",
        },
        {
            title: "24/7 Dedicated Support",
            description: "Round-the-clock access to our team of experts for any technical or operational needs.",
            icon: "🎧",
        },
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Comprehensive solutions designed for the modern enterprise.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent"></div>
            </section>

            {/* Services Grid */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 group"
                        >
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {service.description}
                            </p>
                            <div className="mt-6">
                                <a href="/contact" className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center gap-1">
                                    Learn more <span>→</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-4 py-16">
                <div className="bg-amber-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
                        <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
                            We understand that every business is unique. Contact us to discuss a tailored package that fits your specific needs.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-4 text-lg font-semibold bg-white text-amber-700 rounded-full hover:bg-amber-50 transition-colors shadow-lg"
                        >
                            Get a Quote
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

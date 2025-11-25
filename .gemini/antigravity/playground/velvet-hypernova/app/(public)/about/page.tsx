import Image from "next/image";

export const metadata = {
    title: "About Us | Velvet Hypernova",
    description: "Learn about Velvet Hypernova's mission, vision, and the team driving corporate excellence.",
};

export default function AboutPage() {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
            {/* Hero Section */}
            <section className="bg-blue-900 text-white py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">About Velvet Hypernova</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Pioneering the future of corporate digital infrastructure with elegance and security.
                    </p>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/circuit-board.svg')] opacity-10"></div>
            </section>

            {/* Mission & Vision */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            To empower enterprises with secure, scalable, and aesthetically superior digital tools that enhance productivity and brand value. We believe that corporate software shouldn't just work—it should inspire.
                        </p>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white pt-6">Our Vision</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            A world where business operations are seamless, secure, and beautiful. We strive to be the global standard for premium corporate digital ecosystems.
                        </p>
                    </div>
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl bg-slate-200 dark:bg-slate-800">
                        {/* Placeholder for an office/team image */}
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                            [Office Image Placeholder]
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-white dark:bg-slate-900 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Leadership Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Alexandra Chen", role: "CEO & Founder", bio: "Visionary leader with 15+ years in fintech and enterprise software." },
                            { name: "Marcus Thorne", role: "CTO", bio: "Architect of the Hypernova secure core. Expert in distributed systems." },
                            { name: "Sarah Jenkins", role: "Head of Design", bio: "Award-winning designer ensuring every pixel meets our premium standard." },
                        ].map((member, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative shadow-lg group-hover:scale-105 transition-transform duration-300">
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-4xl">
                                        {member.name[0]}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</p>
                                <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

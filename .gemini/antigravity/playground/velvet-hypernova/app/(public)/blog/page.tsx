import Link from "next/link";

export const metadata = {
    title: "Blog | Velvet Hypernova",
    description: "Insights and updates from the world of corporate technology and digital infrastructure.",
};

export default function BlogPage() {
    const posts = [
        {
            slug: "future-of-corporate-security",
            title: "The Future of Corporate Security in 2025",
            excerpt: "As cyber threats evolve, so must our defenses. Explore the latest trends in enterprise security.",
            date: "Nov 20, 2025",
            author: "Marcus Thorne",
            category: "Security",
        },
        {
            slug: "optimizing-remote-workflows",
            title: "Optimizing Remote Workflows with Cloud Integration",
            excerpt: "How to maintain productivity and security in a distributed workforce environment.",
            date: "Nov 18, 2025",
            author: "Alexandra Chen",
            category: "Productivity",
        },
        {
            slug: "sustainable-tech-infrastructure",
            title: "Building Sustainable Tech Infrastructure",
            excerpt: "Reducing carbon footprint while maximizing performance in your data centers.",
            date: "Nov 15, 2025",
            author: "Sarah Jenkins",
            category: "Sustainability",
        },
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
            <section className="bg-slate-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Insights</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Thought leadership and industry updates from the Velvet Hypernova team.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <Link key={i} href={`/blog/${post.slug}`} className="group">
                            <article className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 h-full flex flex-col hover:shadow-2xl transition-shadow duration-300">
                                <div className="h-48 bg-slate-200 dark:bg-slate-800 relative">
                                    {/* Placeholder for blog image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                        [Image: {post.category}]
                                    </div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-medium">{post.category}</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">
                                            {post.author[0]}
                                        </div>
                                        {post.author}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

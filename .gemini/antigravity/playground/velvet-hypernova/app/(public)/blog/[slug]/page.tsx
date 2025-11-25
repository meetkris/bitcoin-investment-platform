import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return {
        title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | Velvet Hypernova`,
        description: "Read our latest insights on corporate technology.",
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Mock data - in a real app this would fetch from a DB/CMS
    const post = {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        date: "Nov 20, 2025",
        author: "Marcus Thorne",
        content: `
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h2 class="text-2xl font-bold mb-4 mt-8">The Evolution of Security</h2>
      <p class="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p class="mb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      <h2 class="text-2xl font-bold mb-4 mt-8">What This Means for Enterprise</h2>
      <p class="mb-4">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    `
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
            <article className="container mx-auto px-4 py-20 max-w-3xl">
                <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
                    ← Back to Blog
                </Link>
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
                                {post.author[0]}
                            </div>
                            <span>{post.author}</span>
                        </div>
                        <span>•</span>
                        <span>{post.date}</span>
                    </div>
                </header>

                <div
                    className="prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>
        </div>
    );
}

import Link from "next/link";

type Blog = {
  title: string;
  excerpt: string;
  featuredImage?: string;
  createdAt: string;
  slug: string;
  tags: string[];
  category?: string;
  views?: number;
  content?: string;
};

function calculateReadingTime(content: string | undefined) {
  if (!content || typeof content !== "string") return 0;
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default function BlogCard({ blog }: { blog: Blog }) {
  const readingTime = calculateReadingTime(blog.content);

  return (
    <article
      className="
        group overflow-hidden rounded-2xl border
        bg-gray-200 dark:bg-neutral-900
        border-neutral-200 dark:border-neutral-800
        transition hover:shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900/30
      "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        {blog.category && (
          <span
            className="
            absolute top-3 left-3 z-10
            rounded-full px-3 py-1 text-xs font-medium
            bg-black/70 text-white
          "
          >
            {blog.category}
          </span>
        )}

        <img
          src={blog.featuredImage || "/placeholder.jpg"}
          alt={blog.title}
          className="
            h-52 w-full object-cover
            transition-transform duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
          {new Date(blog.createdAt).toDateString()}
        </p>

        <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
          {blog.title}
        </h2>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-4">
          {blog.excerpt}
        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-3">
            <span>⏱ {readingTime} min</span>
            {typeof blog.views === "number" && <span>👀 {blog.views}</span>}
          </div>

          <Link
            href={`/blog/${blog.slug}`}
            className="font-medium hover:underline"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}

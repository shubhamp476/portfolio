import Link from "next/link";

type Blog = {
  title: string;
  description: string;
  image: string;
  date: string;
  slug: string;
  tags: string[];
};

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article
      className="
        overflow-hidden rounded-2xl border
        bg-white dark:bg-neutral-900
        border-neutral-200 dark:border-neutral-800
        transition hover:shadow-lg
      "
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-56 w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
          {blog.date}
        </p>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-300 mb-6">
          {blog.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-full
                bg-neutral-100 dark:bg-neutral-800
                text-neutral-700 dark:text-neutral-300
                px-3 py-1 text-sm
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            📅 <span>{blog.date}</span>
          </div>

          <Link
            href={`/blog/${blog.slug}`}
            className="font-medium hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}

import Link from "next/link";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  
};

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch("http://localhost:3000/api/blogs", {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>

      {blogs.length === 0 && (
        <p className="text-neutral-500">No blogs published yet.</p>
      )}

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blog/${blog.slug}`}
            className="group"
          >
            <div className="overflow-hidden rounded-2xl mb-4">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="h-56 w-full object-cover group-hover:scale-105 transition"
              />
            </div>

            <h2 className="text-xl font-semibold mb-2">
              {blog.title}
            </h2>

            <p className="text-neutral-600 dark:text-neutral-400 line-clamp-3">
              {blog.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}

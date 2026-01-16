import BlogCard from "@/components/BlogCard";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  createdAt: string;
  tags?: string[];
  category?: string;
  views?: number;
  content?: string;
};

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch("/api/blogs", {
  cache: "no-store",
});


  if (!res.ok) return [];
  return res.json();
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  // Skeleton loader
  if (!blogs || blogs.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-10">Blog</h1>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Blog</h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={{
              title: blog.title,
              excerpt: blog.excerpt,
              featuredImage: blog.featuredImage,
              createdAt: blog.createdAt,
              slug: blog.slug,
              tags: blog.tags || [],
              category: blog.category,
              views: blog.views,
              content: blog.content,
            }}
          />
        ))}
      </div>
    </main>
  );
}

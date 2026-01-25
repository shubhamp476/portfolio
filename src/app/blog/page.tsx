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

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/* =========================
   Fetch blogs (category + search)
========================= */
async function getBlogs(
  category = "all",
  search = ""
): Promise<Blog[]> {
  const params = new URLSearchParams();

  if (category && category !== "all") {
    params.set("category", category);
  }

  if (search) {
    params.set("search", search);
  }

  const res = await fetch(
    `${baseUrl}/api/blogs?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return res.json();
}

/* =========================
   Fetch categories
========================= */
async function getCategories(): Promise<string[]> {
  const res = await fetch(`${baseUrl}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  const data = await res.json();

  // category model returns objects → map names
  return data.map((c: any) => c.name);
}

/* =========================
   Blog Page
========================= */
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  const selectedCategory = resolvedSearchParams.category || "all";
  const searchQuery = resolvedSearchParams.q || "";


  const blogs = await getBlogs(selectedCategory, searchQuery);
  const categories = await getCategories();

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {/* 🔍 SEARCH BAR */}
      <form className="mb-8">
        <input
          name="q"
          defaultValue={searchQuery}
          placeholder="Search blogs..."
          className="w-full md:w-1/2 rounded-xl border px-4 py-3"
        />
      </form>

      {/* 🏷 CATEGORY FILTER */}
      <div className="flex flex-wrap gap-3 mb-10">
        <a
          href="/blog"
          className={`px-4 py-1.5 rounded-full text-sm border transition
            ${
              selectedCategory === "all"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
        >
          All
        </a>

        {categories.map((cat) => (
          <a
            key={cat}
            href={`/blog?category=${cat}`}
            className={`px-4 py-1.5 rounded-full text-sm border transition
              ${
                selectedCategory === cat
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
          >
            {cat}
          </a>
        ))}
      </div>

      {/* 📰 BLOG GRID */}
      {blogs.length === 0 ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      ) : (
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
      )}
    </main>
  );
}

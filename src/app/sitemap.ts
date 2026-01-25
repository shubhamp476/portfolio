import { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://portfolio-v31b.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 🔹 Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // 🔹 Blog pages
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${SITE_URL}/api/blogs`, {
      cache: "no-store",
    });

    if (res.ok) {
      const blogs = await res.json();

      blogRoutes = blogs.map((blog: any) => ({
        url: `${SITE_URL}/blog/${blog.slug}`,
        lastModified: blog.updatedAt
          ? new Date(blog.updatedAt)
          : new Date(blog.createdAt),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("❌ Sitemap fetch failed:", error);
  }

  return [...staticRoutes, ...blogRoutes];
}

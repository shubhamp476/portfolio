import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import BlogShareButtons from "@/components/BlogShareButtons";



const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

// Fetch single blog
async function getBlog(slug: string) {
  const res = await fetch(`${baseUrl}/api/blogs/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

// FAQ Schema
function generateFaqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Blog Article Schema 
function generateArticleSchema(blog: any, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: [blog.featuredImage],
    author: {
      "@type": "Person",
      name: "Shubham",
      url: `${baseUrl}/about`,
    },
    publisher: {
      "@type": "Person",
      name: "Shubham",
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${blog.slug}`,
    },
  };
}


// Realted blogs
async function getRelatedBlogs(category: string, slug: string) {
  const res = await fetch(`${baseUrl}/api/blogs`, {
    cache: "no-store",
  });
  if (!res.ok) return [];

  const blogs = await res.json();

  const sameCategory = blogs.filter(
    (b: any) => b.category === category && b.slug !== slug
  );
  const otherCategory = blogs.filter(
    (b: any) => b.category !== category && b.slug !== slug
  );

  return [...sameCategory, ...otherCategory];
}

//reading time function
function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}


// Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return { title: "Blog not found" };

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.featuredImage }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.featuredImage],
    },
  };
}

// Blog Detail Page
export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const readingTime = calculateReadingTime(blog.content);


  if (!blog) {
    return <h1 className="p-10 text-2xl">Blog not found</h1>;
  }

  const relatedBlogs = await getRelatedBlogs(
    blog.category,
    blog.slug
  );

  const publishedDate = new Date(blog.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    
  );
  const updatedDate =
  blog.updatedAt &&
  new Date(blog.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <BlogShareButtons url={`${baseUrl}/blog/${blog.slug}`} />

      {/* FAQ JSON-LD */}
      {blog.faqs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFaqSchema(blog.faqs)),
          }}
        />
      )}
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema(blog, baseUrl)),
        }}
      />


      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

      {/* AUTHOR + DATE */}
{/* AUTHOR INFO (Mobile Optimized) */}
<div className="mb-6 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 sm:border-0 sm:p-0">

  {/* Top Row: Avatar + Name */}
  <div className="flex items-center gap-3">
    <img
      src="/author.jpg"
      alt="Shubham"
      className="h-12 w-12 rounded-full object-cover"
    />
    <div>
      <p className="author-name">
        Shubham
      </p>
      <p className="text-xs text-neutral-500">
        Software Developer 
      </p>
    </div>
  </div>

  {/* Social Links */}
  <div className="mt-3 flex flex-wrap gap-3 text-sm text-neutral-600 dark:text-neutral-400">
    <a
      href="https://github.com/shubhamp476"
      target="_blank"
      className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:underline"
    >
      Github
    </a>

    <a
      href="https://twitter.com/shu_bham_panwar"
      target="_blank"
      className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:underline"
    >
      Twitter
    </a>

    <a
      href="https://linkedin.com/in/shubham476"
      target="_blank"
      className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:underline"
    >
      LinkedIn
    </a>
  </div>

  {/* Reading Time */}
  <div className="flex justify-between ">
  <p className="mt-2 text-sm text-neutral-500">
    ⏱ {readingTime} min read
  </p>
  <p className="text-xs sm:text-sm text-neutral-500 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
  <span>
    Published on <span className="font-medium">{publishedDate}</span>
  </span>

  {updatedDate && updatedDate !== publishedDate && (
    <span className="sm:before:content-['•'] sm:before:mx-2">
      Updated on <span className="font-medium">{updatedDate}</span>
    </span>
  )}
</p>

  </div>
</div>


      {/* FEATURED IMAGE */}
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="rounded-2xl mb-10 w-full"
        />
      )}

      {/* CONTENT */}
      <div className="prose prose-neutral  max-w-none">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>

      {/* FAQ */}
      {blog.faqs?.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">FAQs</h2>
          <div className="space-y-4">
            {blog.faqs.map((faq: any, i: number) => (
              <div
                key={i}
                className="border rounded-xl p-4 dark:border-neutral-700"
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="faq-ans mt-2 text-neutral-800 ">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AD SPACE */}
      <div className="my-30 rounded-xl  p-10 text-center text-neutral-400">
        
      </div>

      {/* RELATED BLOGS */}
      {relatedBlogs.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Read Next</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {relatedBlogs.map((b: any) => (
              <a
                key={b._id}
                href={`/blog/${b.slug}`}
                className="group"
              >
                <div className="overflow-hidden rounded-xl mb-4">
                  <img
                    src={b.featuredImage}
                    alt={b.title}
                    className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold group-hover:underline">
                  {b.title}
                </h3>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

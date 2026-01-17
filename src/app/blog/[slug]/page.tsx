import { Metadata } from "next";
import ReactMarkdown from "react-markdown";

async function getBlog(slug: string) {
  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

function generateFaqSchema(faqs: { question: string; answer: string }[]) {
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

async function getRelatedBlogs(category: string, slug: string) {
  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const res = await fetch(
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?category=${category}&exclude=${slug}`,
  { cache: "no-store" }
);


  if (!res.ok) return [];
  return res.json();
}



export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";




  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${slug}`, { cache: "no-store" });

  if (!res.ok) {
    return { title: "Blog not found" };
  }

  const blog = await res.json();

  return {
    title: blog.title,
    description: blog.excerpt,

    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`,
      images: [
        {
          url: blog.featuredImage, // 🔥 YAHI IMAGE SHARE HOGI
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image", // 🔥 ISSE IMAGE DIKHEGI
      title: blog.title,
      description: blog.excerpt,
      images: [blog.featuredImage],
    },
  };
}


export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return <h1 className="p-10 text-2xl">Blog not found</h1>;
  }

  const relatedBlogs = await getRelatedBlogs(blog.category, blog.slug);

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      {/* FAQ JSON-LD (SEO ONLY) */}
      {blog.faqs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFaqSchema(blog.faqs)),
          }}
        />
      )}

      {/* Share Buttons – Right */}
      <div className="hidden lg:flex fixed right-6 top-1/3 flex-col items-center gap-4">
        <span className="text-xs text-neutral-500">Share</span>

        <a
          href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`}
          target="_blank"
          className="h-10 w-10 flex items-center justify-center rounded-full border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          𝕏
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`}
          target="_blank"
          className="h-10 w-10 flex items-center justify-center rounded-full border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          in
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`}
          target="_blank"
          className="h-10 w-10 flex items-center justify-center rounded-full border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          f
        </a>
      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      {/* AUTHOR + SOCIAL */}
      <section className="mt-16 border-t pt-8 dark:border-neutral-700">
        <p className="font-semibold">Written by Shubham</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Full Stack Developer & Technical Writer
        </p>

        <div className="flex gap-4 mt-1 mb-4 text-sm">
          <a
            href="https://github.com/shubhamp476"
            target="_blank"
            className="hover:underline"
          >
            Github
          </a>
          <a
            href="https://twitter.com/shu_bham_panwar"
            target="_blank"
            className="hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com/in/shubham476"
            target="_blank"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* FEATURED IMAGE */}
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="rounded-2xl mb-10 w-full"
        />
      )}

      {/* CONTENT */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h2: ({ children }) => {
              const id = String(children)
                .toLowerCase()
                .replace(/[^\w]+/g, "-");
              return <h2 id={id}>{children}</h2>;
            },
            h3: ({ children }) => {
              const id = String(children)
                .toLowerCase()
                .replace(/[^\w]+/g, "-");
              return <h3 id={id}>{children}</h3>;
            },
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>

      {/* FAQ UI */}
      {blog.faqs?.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">FAQs</h2>

          <div className="space-y-4">
            {blog.faqs.map(
              (faq: { question: string; answer: string }, index: number) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 dark:border-neutral-700"
                >
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                    {faq.answer}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* RELATED BLOGS */}
      {relatedBlogs.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">Related Blogs</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBlogs.map((b: any) => (
              <a
                key={b._id}
                href={`/blog/${b.slug}`}
                className="border rounded-xl p-4 hover:shadow transition dark:border-neutral-700"
              >
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                  {b.excerpt}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

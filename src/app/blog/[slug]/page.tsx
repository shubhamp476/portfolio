import ReactMarkdown from "react-markdown";

async function getBlog(slug: string) {
  const res = await fetch(
    `http://localhost:3000/api/blogs/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
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

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

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
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>

      {/* FAQ SECTION */}
      {blog.faqs?.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">FAQs</h2>

          <div className="space-y-4">
            {blog.faqs.map(
              (
                faq: { question: string; answer: string },
                index: number
              ) => (
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
    </article>
  );
}

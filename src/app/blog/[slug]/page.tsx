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
    return <h1 className="p-10">Blog not found</h1>;
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      <img
        src={blog.coverImage}
        alt={blog.title}
        className="rounded-2xl mb-10 w-full"
      />

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
    </article>
  );
}

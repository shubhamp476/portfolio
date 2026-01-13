"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  /* ========= STATES ========= */
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const [featuredImage, setFeaturedImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");

  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [status, setStatus] = useState<"draft" | "published">("draft");

  /* ========= LOAD BLOG ========= */
  useEffect(() => {
    async function loadBlog() {
      const res = await fetch(`/api/blogs?id=${id}`);
      const blog = await res.json();

      setTitle(blog.title);
      setSlug(blog.slug);
      setAuthor(blog.author);
      setCategory(blog.category);
      setTags(blog.tags.join(", "));

      setFeaturedImage(blog.featuredImage);
      setExcerpt(blog.excerpt);
      setContent(blog.content);

      setMetaTitle(blog.seo?.metaTitle || "");
      setMetaDescription(blog.seo?.metaDescription || "");
      setCanonicalUrl(blog.seo?.canonicalUrl || "");

      setOgTitle(blog.og?.title || "");
      setOgDescription(blog.og?.description || "");
      setOgImage(blog.og?.image || "");

      setFaqs(blog.faqs?.length ? blog.faqs : [{ question: "", answer: "" }]);
      setStatus(blog.status);

      setLoading(false);
    }

    loadBlog();
  }, [id]);

  /* ========= HANDLERS ========= */
  function updateFaq(i: number, key: "question" | "answer", value: string) {
    const updated = [...faqs];
    updated[i][key] = value;
    setFaqs(updated);
  }

  function addFaq() {
    setFaqs([...faqs, { question: "", answer: "" }]);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/blogs?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        author,
        category,
        tags: tags.split(",").map((t) => t.trim()),
        excerpt,
        content,
        featuredImage,
        seo: { metaTitle, metaDescription, canonicalUrl },
        og: { title: ogTitle, description: ogDescription, image: ogImage },
        faqs,
        status,
      }),
    });

    alert("Blog updated ✅");
    router.push("/admin");
  }

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>

      <form onSubmit={handleUpdate} className="space-y-10">

        {/* BASIC */}
        <section>
          <h2 className="font-semibold mb-2">Basic</h2>
          <input className="w-full border p-3 mb-2" value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(generateSlug(e.target.value));
            }} />
          <input className="w-full border p-3" value={slug}
            onChange={(e) => setSlug(e.target.value)} />
        </section>

        {/* CONTENT */}
        <section>
          <h2 className="font-semibold mb-2">Content</h2>
          <input className="w-full border p-3 mb-2"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            placeholder="Featured Image URL"
          />
          <textarea className="w-full border p-3 mb-2"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
          <MDEditor value={content} onChange={(v) => setContent(v || "")} height={400} />
        </section>

        {/* SEO */}
        <section>
          <h2 className="font-semibold mb-2">SEO</h2>
          <input className="w-full border p-3 mb-2" value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)} />
          <textarea className="w-full border p-3"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)} />
        </section>

        {/* FAQ */}
        <section>
          <h2 className="font-semibold mb-2">FAQs</h2>
          {faqs.map((f, i) => (
            <div key={i} className="mb-3">
              <input className="w-full border p-2 mb-1"
                value={f.question}
                onChange={(e) => updateFaq(i, "question", e.target.value)} />
              <textarea className="w-full border p-2"
                value={f.answer}
                onChange={(e) => updateFaq(i, "answer", e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={addFaq} className="underline">
            + Add FAQ
          </button>
        </section>

        <button className="bg-black text-white px-6 py-3 rounded-lg">
          Update Blog
        </button>
      </form>
    </main>
  );
}

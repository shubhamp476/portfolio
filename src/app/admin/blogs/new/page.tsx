"use client";
import WordCounter from "@/components/WordCounter";
import { useState , useEffect } from "react";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

// 🔹 slug generator
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewBlogPage() {
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("Shubham");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
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

  useEffect(() => {
  fetch("/api/categories")
    .then(res => res.json())
    .then(data => setCategories(data.map((c: any) => c.name)));
}, []);
  function handleTitleChange(value: string) {
    setTitle(value);
    setSlug(generateSlug(value));
  }

  function updateFaq(index: number, key: "question" | "answer", value: string) {
    const updated = [...faqs];
    updated[index][key] = value;
    setFaqs(updated);
  }

  function addFaq() {
    setFaqs([...faqs, { question: "", answer: "" }]);
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  
  await fetch("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: category }),
  });
  if (
  title.length > 60 ||
  metaTitle.length > 60 ||
  metaDescription.length > 160 ||
  excerpt.length > 300
) {
  alert("Please fix SEO limits before saving ❌");
  return;
}

  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
  
  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs`, {
    method: "POST",
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
      seo: {
        metaTitle,
        metaDescription,
        canonicalUrl,
      },
      og: {
        title: ogTitle,
        description: ogDescription,
        image: ogImage,
      },
      faqs,
      status,
    }),
  });

  alert("Blog saved ✅");
}

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Create New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-12">

        {/* BASIC INFO */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
          <WordCounter
            value={title}
            limit={60}
            label="Recommended: 50–60 characters"
          />
          <input
            className="w-full border px-4 py-3 mb-3"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          

          <input
            className="w-full border px-4 py-3 mb-3"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          <input
            className="w-full border px-4 py-3 mb-3"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <label className="font-medium">Category</label>

          <input
            list="category-list"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select or type new category"
            className="w-full border px-4 py-3 mb-3 rounded"
          />

          <datalist id="category-list">
            {categories.map((cat: string) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>


          <input
            className="w-full border px-4 py-3"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </section>

        {/* SEO */}
        <section>
          <h2 className="text-xl font-semibold mb-4">SEO</h2>
          <WordCounter
            value={metaTitle}
            limit={60}
            label="SEO Meta Title"
          />
          <input
            className="w-full border px-4 py-3 mb-3"
            placeholder="Meta Title (50–60 chars)"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
          />
          
          <WordCounter
            value={metaDescription}
            limit={160}
            label="SEO Meta Description"
          />
          <textarea
            className="w-full border px-4 py-3 mb-3"
            placeholder="Meta Description (150–160 chars)"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
          />
          

          <input
            className="w-full border px-4 py-3"
            placeholder="Canonical URL"
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
          />
        </section>

        {/* CONTENT */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Content</h2>

          <input
            className="w-full border px-4 py-3 mb-3"
            placeholder="Featured Image URL"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
          />

          <WordCounter
            value={excerpt}
            limit={300}
            label="Excerpt (used in cards & SEO)"
          />
          <textarea
            className="w-full border px-4 py-3 mb-3"
            placeholder="Excerpt / Short summary"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
          

          <MDEditor value={content} onChange={(v) => setContent(v || "")} height={400} />
        </section>

        {/* OPEN GRAPH */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Open Graph</h2>

          <input
            className="w-full border px-4 py-3 mb-3"
            placeholder="OG Title"
            value={ogTitle}
            onChange={(e) => setOgTitle(e.target.value)}
          />

          <textarea
            className="w-full border px-4 py-3 mb-3"
            placeholder="OG Description"
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
          />

          <input
            className="w-full border px-4 py-3"
            placeholder="OG Image URL"
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
          />
        </section>

        {/* ADVANCED */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Advanced</h2>

          {faqs.map((faq, i) => (
            <div key={i} className="mb-4">
              <input
                className="w-full border px-4 py-2 mb-2"
                placeholder="FAQ Question"
                value={faq.question}
                onChange={(e) => updateFaq(i, "question", e.target.value)}
              />
              <textarea
                className="w-full border px-4 py-2"
                placeholder="FAQ Answer"
                value={faq.answer}
                onChange={(e) => updateFaq(i, "answer", e.target.value)}
              />
            </div>
          ))}

          <button type="button" onClick={addFaq} className="underline mb-4">
            + Add FAQ
          </button>

          <select
            className="w-full border px-4 py-3"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </section>

        <button className="bg-black text-white px-6 py-3 rounded-lg">
          Save Blog
        </button>
      </form>
    </main>
  );
}

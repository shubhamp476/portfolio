"use client";

import { useState } from "react";
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

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const slug = generateSlug(title);

    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        excerpt,
        coverImage,
        content,
      }),
    });

    alert("Blog published ✅");
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Add New Blog</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="w-full border rounded-lg px-4 py-3 mb-4"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg px-4 py-3 mb-4"
          placeholder="Short excerpt (for blog card)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <input
          className="w-full border rounded-lg px-4 py-3 mb-4"
          placeholder="Cover Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />

        <div className="mb-6">
          <label className="font-medium mb-2 block">
            Blog Content (Markdown)
          </label>

          <MDEditor
            value={content}
            onChange={(val) => setContent(val || "")}
            height={400}
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full border rounded-lg px-4 py-3 mb-4"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>


        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Publish Blog
        </button>
      </form>
    </main>
  );
}

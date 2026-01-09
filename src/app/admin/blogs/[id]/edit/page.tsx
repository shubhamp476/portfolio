"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(true);

  // 🔹 Load blog by ID
  useEffect(() => {
    async function loadBlog() {
      const res = await fetch(`/api/blogs?id=${id}`);
      const data = await res.json();

      setTitle(data.title);
      setExcerpt(data.excerpt);
      setCoverImage(data.coverImage);
      setContent(data.content);
      setStatus(data.status);
      setLoading(false);
    }

    if (id) loadBlog();
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/blogs?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        excerpt,
        coverImage,
        content,
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

      <form onSubmit={handleUpdate}>
        <input
          className="w-full border px-4 py-3 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border px-4 py-3 mb-4"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <input
          className="w-full border px-4 py-3 mb-4"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full border px-4 py-3 mb-4"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <MDEditor
          value={content}
          onChange={(val) => setContent(val || "")}
          height={400}
        />

        <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg">
          Update Blog
        </button>
      </form>
    </main>
  );
}

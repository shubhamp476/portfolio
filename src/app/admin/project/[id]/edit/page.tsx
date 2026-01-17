"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tech, setTech] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(true);

  // 🔹 Load project by ID
  useEffect(() => {
    async function loadProject() {
      const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/projects?id=${id}`);
      const data = await res.json();

      setTitle(data.title);
      setImage(data.image);
      setTech(data.tech.join(", "));
      setContent(data.content);
      setStatus(data.status);
      setLoading(false);
    }

    if (id) loadProject();
  }, [id]);

  // 🔹 Update project
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/projects?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        image,
        tech: tech.split(",").map((t) => t.trim()),
        content,
        status,
      }),
    });

    alert("Project updated ✅");
    router.push("/admin");
  }

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Edit Project</h1>

      <form onSubmit={handleUpdate}>
        <input
          className="w-full border px-4 py-3 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border px-4 py-3 mb-4"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          className="w-full border px-4 py-3 mb-4"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          placeholder="Tech stack (comma separated)"
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
          Update Project
        </button>
      </form>
    </main>
  );
}

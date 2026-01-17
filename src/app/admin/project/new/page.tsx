"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

export default function NewProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tech, setTech] = useState("");
  const [live, setLive] = useState("");
  const [github, setGithub] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        description,
        image,
        tech: tech.split(",").map((t) => t.trim()),
        content,
        live,
        github,
      }),
    });

    if (res.ok) {
      alert("Project saved successfully");
    } else {
      alert("Error saving project");
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Add New Project</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="w-full border rounded-lg px-4 py-3 mb-4"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg px-4 py-3 mb-4"
          placeholder="Short description (for card)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full border rounded-lg px-4 py-3 mb-4"
          placeholder="Cover Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          className="w-full border rounded-lg px-4 py-3 mb-6"
          placeholder="Tech stack (comma separated)"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />

        <div className="mb-6">
          <label className="font-medium mb-2 block">
            Project Content (Markdown)
          </label>

          <MDEditor
            value={content}
            onChange={(val) => setContent(val || "")}
            height={400}
          />
        </div>

        <input
          className="w-full border rounded-lg px-4 py-3 mb-4"
          placeholder="Live Demo URL"
          value={live}
          onChange={(e) => setLive(e.target.value)}
        />

        <input
          className="w-full border rounded-lg px-4 py-3 mb-6"
          placeholder="GitHub Repo URL"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Save Project
        </button>
      </form>
    </main>
  );
}

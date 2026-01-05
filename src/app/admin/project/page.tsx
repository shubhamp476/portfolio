"use client";

import { useState } from "react";

export default function AdminProjectsPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const project = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      image: formData.get("image"),
      live: formData.get("live"),
      github: formData.get("github"),
      tech: (formData.get("tech") as string)
        .split(",")
        .map((t) => t.trim()),
    };

    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });

    setLoading(false);
    form.reset();
    alert("✅ Project added successfully");
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Add Project</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input name="title" placeholder="Title" required className="input" />
        <input name="slug" placeholder="Slug (unique)" required className="input" />
        <input name="image" placeholder="Image URL" required className="input" />
        <textarea
          name="description"
          placeholder="Description"
          required
          className="input h-32"
        />
        <input
          name="tech"
          placeholder="Tech (comma separated)"
          required
          className="input"
        />
        <input name="live" placeholder="Live Demo URL" className="input" />
        <input name="github" placeholder="GitHub URL" className="input" />

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Saving..." : "Add Project"}
        </button>
      </form>
    </main>
  );
}

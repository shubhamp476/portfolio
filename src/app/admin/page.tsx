import Link from "next/link";

type Blog = {
  _id: string;
  title: string;
  status: "draft" | "published";
  views: number;
};

type Project = {
  _id: string;
  title: string;
  status: "draft" | "published";
};

async function getBlogs(): Promise<Blog[]> {
  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

const res = await fetch(
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?admin=true`,
  { cache: "no-store" }
);

  if (!res.ok) return [];
  return res.json();
}

async function getProjects(): Promise<Project[]> {
  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/projects`, {
  cache: "no-store",
});

  if (!res.ok) return [];
  return res.json();
}

export default async function AdminDashboard() {
  const blogs = await getBlogs();
  const projects = await getProjects();
  

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Admin Dashboard</h1>
      
<div className="flex gap-4 mb-10">
  <Link
    href="/admin/blogs/new"
    className="bg-black text-white px-5 py-3 rounded-lg text-sm font-medium"
  >
    + New Blog
  </Link>

  <Link
    href="/admin/project/new"
    className="bg-neutral-200 text-black px-5 py-3 rounded-lg text-sm font-medium"
  >
    + New Project
  </Link>
</div>




      {/* BLOGS */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">Blogs</h2>

        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b">
                <td className="p-3">{blog.title}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>

                <td className="p-3 flex gap-4">
                  <Link
                    href={`/admin/blogs/${blog._id}/edit`}
                    className="underline"
                  >
                    Edit
                  </Link>

                  <button className="text-red-600">Delete</button>
                </td>
                <td className="text-sm text-neutral-500">
  👀 {blog.views ?? 0}
</td>

                
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* PROJECTS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>

        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-b">
                <td className="p-3">{project.title}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      project.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>

                <td className="p-3 flex gap-4">
                  <Link
                    href={`/admin/project/${project._id}/edit`}
                    className="underline"
                  >
                    Edit
                  </Link>

                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

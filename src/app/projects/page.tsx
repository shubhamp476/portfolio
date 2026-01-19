import ProjectCard from "@/components/ProjectCard";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3001";

async function getProjects() {

  const res = await fetch(`${baseUrl}/api/projects`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12">Projects</h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: any) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </main>
  );
}

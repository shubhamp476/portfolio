import ReactMarkdown from "react-markdown";

type Project = {
  title: string;
  image: string;
  
  description: string;
  tech: string[];
  content: string;
  live: string;
  github: string;
};

async function getProject(slug: string): Promise<Project | null> {
  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/projects/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return <h1 className="text-3xl p-10">Project not found</h1>;
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

      <img
        src={project.image}
        alt={project.title}
        className="rounded-2xl mb-10"
      />

      <div className="prose prose-neutral dark:prose-invert max-w-none mb-10">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </div>


      <div className="flex flex-wrap gap-2 mb-10">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-sm"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-6">
        <a href={project.live} target="_blank" className="underline">
          Live Demo →
        </a>
        <a href={project.github} target="_blank" className="underline">
          GitHub →
        </a>
      </div>
    </article>
  );
}

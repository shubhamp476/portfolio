import Link from "next/link";

type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  live: string;
  github: string;
  slug: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="
        group overflow-hidden rounded-2xl border
        bg-gray-200 dark:bg-neutral-900
        border-neutral-200 dark:border-neutral-800
        transition hover:shadow-lg
      "
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
          {project.title}
        </h2>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
          {project.description}
        </p>


        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((item) => (
            <span
              key={item}
              className="
                rounded-full px-3 py-1 text-sm
                bg-neutral-100 dark:bg-neutral-800
                text-neutral-700 dark:text-neutral-300
              "
            >
              {item}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between text-sm">
          <a
            href={project.github}
            target="_blank"
            className="text-neutral-500 dark:text-neutral-400 hover:underline"
          >
            GitHub →
          </a>
          <a
            href={project.live}
            target="_blank"
            className="text-neutral-500 dark:text-neutral-400 font-medium hover:underline"
          >
            Live Demo →
          </a>
          <Link
  href={`/projects/${project.slug}`}
  className="text-neutral-500 dark:text-neutral-400 font-medium hover:underline"
>
  Read More →
</Link>
        </div>
      </div>
    </article>
  );
}

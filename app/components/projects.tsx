interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project One',
    description: 'A modern web application built with Next.js and React.',
    tags: ['Next.js', 'React', 'TypeScript'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: 'project-2',
    title: 'Project Two',
    description: 'Full-stack application with API and database integration.',
    tags: ['Node.js', 'MongoDB', 'React'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: 'project-3',
    title: 'Project Three',
    description:
      'Design system and component library for enterprise applications.',
    tags: ['Design System', 'Component Library', 'Storybook'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
];

export function Projects() {
  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group relative border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-md dark:hover:shadow-xl transition-all duration-200"
        >
          <div className="mb-4">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-neutral-700 dark:group-hover:text-neutral-50 transition-colors">
              {project.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-200 dark:border-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
              >
                <span>Visit</span>
                <span className="ml-1 transform group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
              >
                <span>GitHub</span>
                <span className="ml-1 transform group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

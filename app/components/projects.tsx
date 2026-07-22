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
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
        >
          <div className="mb-3">
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            <p className="text-neutral-700 dark:text-neutral-400 text-sm">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-3 py-1 rounded text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
              >
                Visit →
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

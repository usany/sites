'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface LocalizedText {
  en: string;
  ko: string;
}

interface Project {
  id: string;
  title: string;
  description: LocalizedText;
  subdescription?: LocalizedText;
  tags: string[];
  link?: string;
  github?: string;
  document?: string;
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'KHUSAN-쿠우산',
    description: {
      en: 'KHU umbrella sharing platform',
      ko: 'KHU 우산 공유 플랫폼',
    },
    tags: ['Next.js', 'React', 'TypeScript'],
    link: 'https://khusan.co.kr',
    document: 'https://begin.khusan.co.kr',
    github: 'https://github.com',
  },
  {
    id: 'project-2',
    title: 'KHUBUS-쿠우버스',
    description: {
      en: 'KHU bus arrival information service',
      ko: 'KHU 버스 도착 정보 서비스',
    },
    tags: ['Node.js', 'MongoDB', 'React'],
    link: 'https://bus.khusan.co.kr',
    github: 'https://github.com',
  },
  {
    id: 'project-3',
    title: 'KHUKIE-쿠우키',
    description: {
      en: 'KHU restaurant information service',
      ko: 'KHU 메뉴 정보 서비스',
    },
    tags: ['Design System', 'Component Library', 'Storybook'],
    link: 'https://cookie.khusan.co.kr',
    github: 'https://github.com',
  },
  {
    id: 'project-4',
    title: 'KHUSAN Guides-쿠우산 가이드',
    description: {
      en: 'KHUSAN guide documentation',
      ko: '쿠우산 가이드 문서',
    },
    tags: ['Next.js', 'React', 'TypeScript'],
    link: 'https://begin.khusan.co.kr',
    github: 'https://github.com',
  },
  {
    id: 'project-5',
    title: 'Screenshots Capture-스크린샷 캡처',
    description: {
      en: 'Project Reinventing the Wheels [Code Name: Cinnamon]',
      ko: '프로젝트 바퀴의 재발명 [코드명: Cinnamon]',
    },
    subdescription: {
      en: 'There are many screen capture SaaS. However this one is mine.',
      ko: '많은 스크린샷 캡처 SaaS가 있습니다. 하지만 이것은 제 것입니다.',
    },
    tags: ['Next.js', 'React', 'TypeScript'],
    link: 'https://admin.khusan.co.kr',
    github: 'https://github.com',
  }
];

export function Projects() {
  const [language, setLanguage] = useState<'en' | 'ko'>('en');
  const pathname = usePathname();

  useEffect(() => {
    const pathLang = pathname.split('/')[1];
    if (pathLang === 'en' || pathLang === 'ko') {
      setLanguage(pathLang);
    } else {
      try {
        const stored = localStorage.getItem('language');
        if (stored === 'en' || stored === 'ko') {
          setLanguage(stored);
        }
      } catch {
        // localStorage unavailable
      }
    }
  }, [pathname]);

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
              {project.description[language]}
            </p>
            {project.subdescription && (
              <p className="text-neutral-500 dark:text-neutral-500 text-sm leading-relaxed mt-2">
                {project.subdescription[language]}
              </p>
            )}
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
            {project.document && (
              <a
                href={project.document}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
              >
                <span>Document</span>
                <span className="ml-1 transform group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

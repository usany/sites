"use client";

import Link from "next/link";
import { FiGithub, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { GitHubLink } from "settings/navigation";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
};

function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 p-2"
      title="Toggle dark mode"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <FiSun className="w-5 h-5" />
      ) : (
        <FiMoon className="w-5 h-5" />
      )}
    </button>
  );
}

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
      <div className="flex flex-row items-center gap-2">
        {GitHubLink.href && (
          <Link
            href={GitHubLink.href}
            className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 p-2"
            target="_blank"
            rel="noopener noreferrer"
            title="View the repository on GitHub"
            aria-label="View the repository on GitHub"
          >
            <FiGithub className="w-5 h-5" />
          </Link>
        )}
        <ModeToggle />
        <button>practice</button>
      </div>
    </aside>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

const themeConfig = {
  light: { icon: FiSun, name: "Light" },
  dark: { icon: FiMoon, name: "Dark" },
  system: { icon: FiMonitor, name: "System" },
};

export function ThemeDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  if (!mounted) return null;

  const currentTheme = (theme || "system") as keyof typeof themeConfig;
  const CurrentIcon = themeConfig[currentTheme]?.icon || FiSun;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 text-sm transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
        aria-label="Toggle theme menu"
        aria-expanded={isOpen}
      >
        <CurrentIcon className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-40 border border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-neutral-950 shadow-lg z-50"
        >
          {(["system", "light", "dark"] as Array<keyof typeof themeConfig>).map(
            (t) => {
              const Icon = themeConfig[t].icon;
              const isActive = currentTheme === t;

              return (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-all ${
                    isActive
                      ? "bg-neutral-100 dark:bg-neutral-800 font-medium"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  } ${
                    t !== "system"
                      ? "border-b border-neutral-200 dark:border-neutral-800"
                      : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{themeConfig[t].name}</span>
                  {isActive && (
                    <span className="ml-auto text-neutral-600 dark:text-neutral-400">
                      ✓
                    </span>
                  )}
                </button>
              );
            },
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const languages = {
  en: { name: "English", nativeName: "English" },
  ko: { name: "Korean", nativeName: "한국어" },
};

export function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<keyof typeof languages>("en");
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    // Get language from pathname (route takes priority)
    const pathLang = pathname.split("/")[1];

    if (pathLang && pathLang in languages) {
      setCurrentLanguage(pathLang as keyof typeof languages);
    } else {
      // Fallback to stored value or default
      const stored = localStorage.getItem("language") as keyof typeof languages | null;
      if (stored && stored in languages) {
        setCurrentLanguage(stored);
      }
    }
  }, [pathname]);

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

  const handleLanguageChange = (lang: keyof typeof languages) => {
    localStorage.setItem("language", lang);
    setCurrentLanguage(lang);
    setIsOpen(false);

    // Update URL path if it includes language segment
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments[0] in languages) {
      pathSegments[0] = lang;
    } else {
      pathSegments.unshift(lang);
    }
    router.push("/" + pathSegments.join("/"));
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 text-sm transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
        aria-label="Toggle language menu"
        aria-expanded={isOpen}
        title={languages[currentLanguage].nativeName}
      >
        <span>{currentLanguage.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg z-50"
        >
          {(Object.entries(languages) as Array<[keyof typeof languages, typeof languages[keyof typeof languages]]>).map(
            ([lang, { name, nativeName }]) => {
              const isActive = currentLanguage === lang;

              return (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-all ${
                    isActive
                      ? "bg-neutral-100 dark:bg-neutral-800 font-medium"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  }`}
                >
                  <span className="w-4 text-center font-medium">{lang.toUpperCase()}</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">{name}</span>
                    <span>{nativeName}</span>
                  </div>
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

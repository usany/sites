"use client";

import Link from "next/link";
import { FiGithub } from "react-icons/fi";

import { Anchor } from "@/components/anchor";
import { Logo } from "@/components/navigation/logo";
import { Search } from "@/components/navigation/search";
import { SheetLeft } from "@/components/sidebar";
import { SheetClose } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { GitHubLink, Navigations } from "@/settings/navigation";
import styles from "./navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.nav} data-navbar>
      <div className={styles.leftSection}>
        <SheetLeft />
        <Logo />
        <div className={styles.menuContainer}>
          <NavMenu />
        </div>
      </div>

      <div className={styles.rightSection}>
        <Search />
        <div className={styles.buttons}>
          {GitHubLink.href && (
            <Link
              href={GitHubLink.href}
              className={styles.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              title="View the repository on GitHub"
              aria-label="View the repository on GitHub"
            >
              <FiGithub className={styles.githubIcon} />
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export function NavMenu({ isSheet = false }) {
  return (
    <>
      {Navigations.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            absolute
            activeClassName={styles.active}
            className={styles.navLink}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
          >
            {item.title}{" "}
            {item.external && (
              <LuArrowUpRight className={styles.externalIcon} strokeWidth={3} />
            )}
          </Anchor>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}

/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { theme } from "@/lib/theme";
import { Breakpoints } from "@/lib/utils/breakpoints";

const styles = {
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: theme.maxWidth,
    padding: "24px",
    margin: "0 auto",
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "rgba(13, 13, 13, 0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid ${theme.colors.border}`,
    [Breakpoints.sm]: {
      flexWrap: "wrap",
      gap: 16,
    },
  }),
  logo: css({
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: "0.2em",
    color: theme.colors.text,
    textTransform: "uppercase",
  }),
  nav: css({
    display: "flex",
    gap: 32,
    listStyle: "none",
    margin: 0,
    padding: 0,
    [Breakpoints.sm]: {
      order: 3,
      width: "100%",
      justifyContent: "center",
      gap: 20,
      flexWrap: "wrap",
    },
  }),
  navLink: css({
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: theme.colors.textMuted,
    transition: "color 0.2s ease",
    ":hover": {
      color: theme.colors.accent,
    },
  }),
  navLinkActive: css({
    color: theme.colors.accent,
  }),
  connectBtn: css({
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: theme.colors.accent,
    border: `1px solid ${theme.colors.accent}`,
    borderRadius: 4,
    padding: "10px 20px",
    transition: "background-color 0.2s ease, color 0.2s ease",
    ":hover": {
      backgroundColor: theme.colors.accent,
      color: theme.colors.bg,
    },
  }),
};

const homeNavItems = [
  { name: "Work", href: "/#work" },
  { name: "Expertise", href: "/#expertise" },
  { name: "About", href: "/#about" },
];

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header css={styles.header}>
      <Link href="/" css={styles.logo}>
        TechMeister
      </Link>

      <nav>
        <ul css={styles.nav}>
          {isHome ? (
            homeNavItems.map(({ name, href }) => (
              <li key={name}>
                <a css={styles.navLink} href={href}>
                  {name}
                </a>
              </li>
            ))
          ) : (
            <>
              <li>
                <Link
                  href="/"
                  css={css([styles.navLink, pathname === "/" && styles.navLinkActive])}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  css={css([
                    styles.navLink,
                    pathname === "/contact" && styles.navLinkActive,
                  ])}
                >
                  Contact
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Link href="/contact" css={styles.connectBtn}>
        Connect
      </Link>
    </header>
  );
};

export default Header;

/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { SocialLinkItem } from "@/lib/types";
import { theme } from "@/lib/theme";
import { Breakpoints } from "@/lib/utils/breakpoints";

const styles = {
  footer: css({
    width: "100%",
    borderTop: `1px solid ${theme.colors.border}`,
    marginTop: 48,
  }),
  inner: css({
    maxWidth: theme.maxWidth,
    margin: "0 auto",
    padding: "40px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    [Breakpoints.sm]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }),
  logo: css({
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: theme.colors.text,
  }),
  socials: css({
    display: "flex",
    gap: 24,
    listStyle: "none",
    margin: 0,
    padding: 0,
    flexWrap: "wrap",
    justifyContent: "center",
  }),
  socialLink: css({
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: theme.colors.textMuted,
    transition: "color 0.2s ease",
    ":hover": {
      color: theme.colors.accent,
    },
  }),
  copyright: css({
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: theme.colors.textDim,
    textAlign: "right",
    [Breakpoints.sm]: {
      textAlign: "center",
    },
  }),
};

function resolveHref(link: string, iconName: string): string {
  const normalized = iconName.toLowerCase();

  if (
    (normalized.includes("email") || normalized.includes("envelope")) &&
    !link.startsWith("mailto:")
  ) {
    return `mailto:${link}`;
  }

  return link;
}

interface Props {
  socialLinks: SocialLinkItem[];
}

const Footer = ({ socialLinks }: Props) => {
  const year = new Date().getFullYear();

  return (
    <footer css={styles.footer}>
      <div css={styles.inner}>
        <div css={styles.logo}>TechMeister</div>

        <ul css={styles.socials}>
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={resolveHref(link.link, link.iconName)}
                css={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        <div css={styles.copyright}>
          &copy; {year} TechMeister Architecture. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

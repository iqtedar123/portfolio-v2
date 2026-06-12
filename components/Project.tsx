/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import Link from "next/link";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { ProjectItem } from "@/lib/types";
import { theme } from "@/lib/theme";
import { Breakpoints } from "@/lib/utils/breakpoints";

const layoutPatterns = [
  css({
    gridColumn: "1 / 8",
    gridRow: "span 2",
    [Breakpoints.md]: { gridColumn: "1", gridRow: "auto" },
  }),
  css({
    gridColumn: "8 / 13",
    gridRow: "span 1",
    [Breakpoints.md]: { gridColumn: "1", gridRow: "auto" },
  }),
  css({
    gridColumn: "1 / 6",
    gridRow: "span 1",
    [Breakpoints.md]: { gridColumn: "1", gridRow: "auto" },
  }),
  css({
    gridColumn: "6 / 13",
    gridRow: "span 2",
    [Breakpoints.md]: { gridColumn: "1", gridRow: "auto" },
  }),
];

const accentOverlays = [
  "rgba(79, 209, 197, 0.08)",
  "rgba(107, 70, 193, 0.1)",
  "rgba(79, 209, 197, 0.06)",
  "rgba(79, 209, 197, 0.14)",
];

const styles = {
  card: css({
    position: "relative",
    backgroundColor: theme.colors.surfaceElevated,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 4,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    minHeight: 180,
    transition: "border-color 0.25s ease, transform 0.25s ease",
    ":hover": {
      borderColor: theme.colors.accent,
      transform: "translateY(-2px)",
    },
  }),
  overlay: css({
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  }),
  image: css({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.25,
    pointerEvents: "none",
  }),
  category: css({
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: theme.colors.accent,
    marginBottom: 12,
    position: "relative",
    zIndex: 1,
  }),
  title: css({
    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
    fontWeight: 700,
    color: theme.colors.text,
    position: "relative",
    zIndex: 1,
    textAlign: "left",
  }),
  linkBtn: css({
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: theme.colors.text,
    color: theme.colors.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: theme.colors.accent,
    },
  }),
};

function getCategory(keywords?: string[]): string {
  if (!keywords?.length) {
    return "Systems";
  }

  const cloud = ["gcp", "azure", "terraform", "cloud"];
  const infra = ["node", "nestjs", "graphql"];
  const ui = ["react", "next", "gatsby", "aurelia", "angular"];

  const lower = keywords.map((k) => k.toLowerCase());

  if (lower.some((k) => cloud.some((c) => k.includes(c)))) {
    return "Cloud";
  }

  if (lower.some((k) => infra.some((i) => k.includes(i)))) {
    return "Infrastructure";
  }

  if (lower.some((k) => ui.some((u) => k.includes(u)))) {
    return "Frontend";
  }

  return keywords[0];
}

interface Props {
  project: ProjectItem;
  index: number;
}

const Project = ({ project, index }: Props) => {
  const layout = layoutPatterns[index % layoutPatterns.length];
  const isLarge = index % 4 === 0 || index % 4 === 3;
  const category = getCategory(project.keywords);

  return (
    <article css={css([styles.card, layout])}>
      <div
        css={styles.overlay}
        style={{ background: accentOverlays[index % accentOverlays.length] }}
      />
      {project.image && (
        <img src={project.image} alt="" css={styles.image} loading="lazy" />
      )}
      <div>
        <div css={styles.category}>{category}</div>
        <h3 css={styles.title}>{project.title}</h3>
      </div>
      {isLarge && (
        <Link
          href={`/project/${project.slug}`}
          css={styles.linkBtn}
          aria-label={`View ${project.title}`}
        >
          <NorthEastRoundedIcon fontSize="small" />
        </Link>
      )}
    </article>
  );
};

export default Project;

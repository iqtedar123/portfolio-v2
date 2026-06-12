/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { useMemo } from "react";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import { ProjectItem } from "@/lib/types";
import { theme } from "@/lib/theme";
import { Breakpoints } from "@/lib/utils/breakpoints";

const styles = {
  section: css({
    width: "100%",
    maxWidth: theme.maxWidth,
    margin: "0 auto",
    padding: theme.sectionPadding,
  }),
  grid: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 64,
    alignItems: "start",
    [Breakpoints.md]: {
      gridTemplateColumns: "1fr",
      gap: 48,
    },
  }),
  heading: css({
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 800,
    color: theme.colors.text,
    marginBottom: 12,
    textAlign: "left",
  }),
  description: css({
    fontSize: 14,
    color: theme.colors.textMuted,
    textAlign: "left",
    marginBottom: 36,
    lineHeight: 1.7,
  }),
  skill: css({
    marginBottom: 24,
  }),
  skillHeader: css({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  }),
  skillName: css({
    fontSize: 13,
    fontWeight: 600,
    color: theme.colors.text,
  }),
  skillValue: css({
    fontSize: 13,
    fontWeight: 600,
    color: theme.colors.accent,
  }),
  skillTrack: css({
    height: 4,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 2,
    overflow: "hidden",
  }),
  skillFill: css({
    height: "100%",
    backgroundColor: theme.colors.accent,
    borderRadius: 2,
    transition: "width 0.6s ease",
  }),
  cardsGrid: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    [Breakpoints.sm]: {
      gridTemplateColumns: "1fr",
    },
  }),
  card: css({
    backgroundColor: theme.colors.surfaceElevated,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 4,
    padding: 20,
    textAlign: "left",
    transition: "border-color 0.2s ease",
    ":hover": {
      borderColor: theme.colors.accent,
    },
  }),
  cardIcon: css({
    color: theme.colors.accent,
    marginBottom: 12,
    fontSize: 22,
  }),
  cardTitle: css({
    fontSize: 14,
    fontWeight: 700,
    color: theme.colors.text,
    marginBottom: 6,
  }),
  cardDesc: css({
    fontSize: 12,
    color: theme.colors.textMuted,
    lineHeight: 1.6,
  }),
};

const skillBars = [
  { name: "Full-Stack Engineering", value: 90 },
  { name: "Cloud Architecture", value: 85 },
  { name: "Cyber Security", value: 95 },
];

const expertiseCards = [
  {
    icon: WebOutlinedIcon,
    title: "UI Systems",
    description: "React, Next.js, and component-driven design systems at scale.",
  },
  {
    icon: CloudOutlinedIcon,
    title: "Cloud Ops",
    description: "GCP, Azure, and Terraform deployments for production workloads.",
  },
  {
    icon: MemoryOutlinedIcon,
    title: "API Design",
    description: "GraphQL, NestJS, and Node.js backends with robust contracts.",
  },
  {
    icon: SpeedOutlinedIcon,
    title: "Performance",
    description: "Testing, CI/CD, and optimization for high-traffic applications.",
  },
];

function aggregateKeywords(projects: ProjectItem[]): string[] {
  const counts = new Map<string, number>();

  for (const project of projects) {
    for (const keyword of project.keywords ?? []) {
      const normalized = keyword.trim();
      counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([keyword]) => keyword);
}

interface Props {
  projects: ProjectItem[];
}

const Expertise = ({ projects }: Props) => {
  const topKeywords = useMemo(() => aggregateKeywords(projects), [projects]);
  const keywordSummary = topKeywords.slice(0, 4).join(", ");

  return (
    <section id="expertise" css={styles.section}>
      <div css={styles.grid}>
        <div>
          <h2 css={styles.heading}>Architectural Expertise</h2>
          <p css={styles.description}>
            Deep experience across the full stack — from UI systems and API
            design to cloud infrastructure and production reliability.
            {keywordSummary && (
              <>
                {" "}
                Core technologies include {keywordSummary}.
              </>
            )}
          </p>

          {skillBars.map(({ name, value }) => (
            <div key={name} css={styles.skill}>
              <div css={styles.skillHeader}>
                <span css={styles.skillName}>{name}</span>
                <span css={styles.skillValue}>{value}%</span>
              </div>
              <div css={styles.skillTrack}>
                <div css={styles.skillFill} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div css={styles.cardsGrid}>
          {expertiseCards.map(({ icon: Icon, title, description }) => (
            <div key={title} css={styles.card}>
              <Icon css={styles.cardIcon} />
              <div css={styles.cardTitle}>{title}</div>
              <div css={styles.cardDesc}>{description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;

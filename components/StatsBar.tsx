/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { theme } from "@/lib/theme";
import { Breakpoints } from "@/lib/utils/breakpoints";

const styles = {
  bar: css({
    width: "100%",
    maxWidth: theme.maxWidth,
    margin: "0 auto",
    padding: "0 24px 48px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 24,
    borderTop: `1px solid ${theme.colors.border}`,
    borderBottom: `1px solid ${theme.colors.border}`,
    paddingTop: 40,
    paddingBottom: 40,
    [Breakpoints.md]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [Breakpoints.sm]: {
      gridTemplateColumns: "1fr",
      gap: 32,
    },
  }),
  stat: css({
    textAlign: "center",
    [Breakpoints.sm]: {
      textAlign: "left",
    },
  }),
  value: css({
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
    fontWeight: 800,
    color: theme.colors.text,
    lineHeight: 1,
    marginBottom: 8,
  }),
  label: css({
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: theme.colors.textDim,
  }),
};

interface Props {
  projectCount: number;
}

const StatsBar = ({ projectCount }: Props) => {
  const stats = [
    { value: "12+", label: "Years experience" },
    { value: String(projectCount).padStart(2, "0"), label: "Global projects" },
    { value: "08", label: "Industry awards" },
    { value: "100%", label: "System uptime" },
  ];

  return (
    <div css={styles.bar}>
      {stats.map(({ value, label }) => (
        <div key={label} css={styles.stat}>
          <div css={styles.value}>{value}</div>
          <div css={styles.label}>{label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;

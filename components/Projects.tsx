/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { useCallback, useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { ProjectItem } from "@/lib/types";
import { theme } from "@/lib/theme";
import { Breakpoints } from "@/lib/utils/breakpoints";
import Project from "./Project";

const PAGE_SIZE = 4;

const styles = {
  section: css({
    width: "100%",
    maxWidth: theme.maxWidth,
    margin: "0 auto",
    padding: theme.sectionPadding,
  }),
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 40,
    gap: 24,
    [Breakpoints.sm]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  }),
  heading: css({
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 800,
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: "left",
  }),
  subtext: css({
    fontSize: 14,
    color: theme.colors.textMuted,
    textAlign: "left",
    maxWidth: 400,
  }),
  navButtons: css({
    display: "flex",
    gap: 8,
    flexShrink: 0,
  }),
  navBtn: css({
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "border-color 0.2s ease, color 0.2s ease",
    ":hover:not(:disabled)": {
      borderColor: theme.colors.accent,
      color: theme.colors.accent,
    },
    ":disabled": {
      opacity: 0.3,
      cursor: "not-allowed",
    },
  }),
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(3, minmax(180px, 200px))",
    gap: 16,
    [Breakpoints.md]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "repeat(4, minmax(180px, 200px))",
    },
  }),
};

interface Props {
  projects: ProjectItem[];
}

const Projects = ({ projects }: Props) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const visibleProjects = projects.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  const goPrev = useCallback(() => {
    setPage((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setPage((current) => Math.min(totalPages - 1, current + 1));
  }, [totalPages]);

  return (
    <section id="work" css={styles.section}>
      <div css={styles.header}>
        <div>
          <h2 css={styles.heading}>Previous Projects</h2>
          <p css={styles.subtext}>
            A selection of enterprise-scale applications delivered across
            retail, fintech, and cloud infrastructure.
          </p>
        </div>

        {totalPages > 1 && (
          <div css={styles.navButtons}>
            <button
              type="button"
              css={styles.navBtn}
              onClick={goPrev}
              disabled={page === 0}
              aria-label="Previous projects"
            >
              <ArrowBackRoundedIcon fontSize="small" />
            </button>
            <button
              type="button"
              css={styles.navBtn}
              onClick={goNext}
              disabled={page >= totalPages - 1}
              aria-label="Next projects"
            >
              <ArrowForwardRoundedIcon fontSize="small" />
            </button>
          </div>
        )}
      </div>

      <div css={styles.grid}>
        {visibleProjects.map((project, index) => (
          <Project project={project} index={index} key={project.id} />
        ))}
      </div>
    </section>
  );
};

export default Projects;

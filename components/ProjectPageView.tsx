/** @jsxImportSource @emotion/react */

"use client";

import { ComponentType } from "react";
import { css } from "@emotion/react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import Link from "next/link";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import { ProjectItem, SocialLinkItem } from "@/lib/types";
import { theme } from "@/lib/theme";
import { Breakpoints } from "@/lib/utils/breakpoints";
import Footer from "./Footer";

const styles = {
  page: css({
    width: "100%",
  }),
  section: css({
    width: "100%",
    maxWidth: theme.maxWidth,
    margin: "0 auto",
    padding: "0 24px",
  }),
  hero: css({
    paddingTop: 32,
    paddingBottom: 48,
  }),
  backLink: css({
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: theme.colors.textDim,
    marginBottom: 32,
    transition: "color 0.2s ease",
    ":hover": {
      color: theme.colors.accent,
    },
  }),
  heroGrid: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 48,
    alignItems: "start",
    marginBottom: 40,
    [Breakpoints.md]: {
      gridTemplateColumns: "1fr",
      gap: 24,
    },
  }),
  title: css({
    fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.text,
    textAlign: "left",
  }),
  titleAccent: css({
    color: theme.colors.accent,
  }),
  heroSummary: css({
    fontSize: 15,
    lineHeight: 1.75,
    color: theme.colors.textMuted,
    textAlign: "left",
    paddingTop: 8,
  }),
  imageCard: css({
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.surfaceElevated,
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 4,
      background: theme.colors.accent,
      zIndex: 1,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      width: 4,
      background: "#6B46C1",
      zIndex: 1,
    },
  }),
  heroImage: css({
    width: "100%",
    height: "auto",
    display: "block",
    aspectRatio: "16 / 9",
    objectFit: "cover",
  }),
  imagePlaceholder: css({
    width: "100%",
    aspectRatio: "16 / 9",
    background: theme.gradients.card,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.textDim,
    fontSize: 14,
  }),
  externalLink: css({
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: theme.colors.accent,
    color: theme.colors.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    transition: "opacity 0.2s ease",
    ":hover": {
      opacity: 0.85,
    },
  }),
  twoCol: css({
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: 48,
    paddingTop: 48,
    paddingBottom: 48,
    borderTop: `1px solid ${theme.colors.border}`,
    [Breakpoints.md]: {
      gridTemplateColumns: "1fr",
      gap: 40,
    },
  }),
  sectionLabel: css({
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13,
    fontWeight: 700,
    color: theme.colors.accent,
    marginBottom: 20,
    textAlign: "left",
  }),
  briefText: css({
    fontSize: 14,
    lineHeight: 1.8,
    color: theme.colors.textMuted,
    textAlign: "left",
    marginBottom: 16,
    ":last-of-type": {
      marginBottom: 0,
    },
  }),
  tagCloud: css({
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  }),
  tag: css({
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: theme.colors.text,
    backgroundColor: theme.colors.surfaceElevated,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 6,
    padding: "8px 14px",
  }),
  featuresSection: css({
    paddingTop: 48,
    paddingBottom: 48,
    borderTop: `1px solid ${theme.colors.border}`,
  }),
  featuresWrapper: css({
    position: "relative",
  }),
  featuresHeading: css({
    fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
    fontWeight: 800,
    color: theme.colors.text,
    marginBottom: 24,
    textAlign: "left",
  }),
  featuresGrid: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    position: "relative",
    zIndex: 1,
    [Breakpoints.sm]: {
      gridTemplateColumns: "1fr",
    },
  }),
  featureCard: css({
    backgroundColor: theme.colors.surfaceElevated,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 8,
    padding: 20,
    textAlign: "left",
  }),
  featureIcon: css({
    color: theme.colors.accent,
    fontSize: 22,
    marginBottom: 12,
  }),
  featureTitle: css({
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: theme.colors.text,
    marginBottom: 8,
  }),
  featureDesc: css({
    fontSize: 12,
    lineHeight: 1.6,
    color: theme.colors.textMuted,
  }),
  scalability: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 48,
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 64,
    borderTop: `1px solid ${theme.colors.border}`,
    [Breakpoints.md]: {
      gridTemplateColumns: "1fr",
    },
  }),
  scalabilityHeading: css({
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 800,
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: "left",
  }),
  scalabilityText: css({
    fontSize: 14,
    lineHeight: 1.8,
    color: theme.colors.textMuted,
    textAlign: "left",
    marginBottom: 32,
  }),
  scalabilityHighlights: css({
    display: "flex",
    gap: 48,
    flexWrap: "wrap",
  }),
  highlight: css({
    textAlign: "left",
  }),
  highlightValue: css({
    fontSize: 16,
    fontWeight: 700,
    color: theme.colors.accent,
    marginBottom: 4,
  }),
  highlightLabel: css({
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: theme.colors.textDim,
  }),
  scalabilityImage: css({
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    opacity: 0.35,
    [Breakpoints.md]: {
      display: "none",
    },
  }),
  scalabilityImg: css({
    width: "100%",
    height: "auto",
    display: "block",
    aspectRatio: "4 / 3",
    objectFit: "cover",
    filter: "grayscale(30%)",
  }),
  projectNav: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 24,
    padding: "40px 24px",
    maxWidth: theme.maxWidth,
    margin: "0 auto",
    borderTop: `1px solid ${theme.colors.border}`,
    [Breakpoints.sm]: {
      flexDirection: "column",
    },
  }),
  projectNavLink: css({
    display: "flex",
    flexDirection: "column",
    gap: 8,
    transition: "opacity 0.2s ease",
    ":hover": {
      opacity: 0.8,
    },
  }),
  projectNavLinkRight: css({
    textAlign: "right",
    alignItems: "flex-end",
    [Breakpoints.sm]: {
      textAlign: "left",
      alignItems: "flex-start",
    },
  }),
  projectNavLabel: css({
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: theme.colors.textDim,
  }),
  projectNavTitle: css({
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    fontWeight: 700,
    color: theme.colors.text,
  }),
};

function parseTitle(title: string): { main: string; accent?: string } {
  const match = title.match(/^(.+?)\s*(\([^)]+\))\s*$/);

  if (match) {
    return { main: match[1].trim(), accent: match[2].trim() };
  }

  return { main: title };
}

function splitDescription(description: string): {
  summary: string;
  brief: string[];
} {
  const paragraphs = description.split(/\n\n+/).filter(Boolean);

  if (paragraphs.length >= 2) {
    return { summary: paragraphs[0], brief: paragraphs.slice(1) };
  }

  const sentences = description.match(/[^.!?]+[.!?]+/g);

  if (sentences && sentences.length >= 2) {
    return {
      summary: sentences[0].trim(),
      brief: [sentences.slice(1).join(" ").trim()],
    };
  }

  return { summary: description, brief: [description] };
}

type Feature = {
  title: string;
  description: string;
  icon: ComponentType<SvgIconProps>;
};

function deriveFeatures(keywords: string[] = []): Feature[] {
  const lower = keywords.map((k) => k.toLowerCase());
  const features: Feature[] = [];

  const checks: { match: string[]; feature: Feature }[] = [
    {
      match: ["react", "redux", "next", "gatsby", "angular", "aurelia"],
      feature: {
        title: "Advanced Cart",
        description: "Complex logic for multi-item plans and dynamic pricing flows.",
        icon: ShoppingCartOutlinedIcon,
      },
    },
    {
      match: ["nestjs", "node", "graphql", "api"],
      feature: {
        title: "Booking Engine",
        description: "Real-time scheduling integrated with local store APIs.",
        icon: CalendarTodayOutlinedIcon,
      },
    },
    {
      match: ["gcp", "azure", "cloud", "terraform"],
      feature: {
        title: "Location Finder",
        description: "Geospatial services for finding nearby retail locations.",
        icon: LocationOnOutlinedIcon,
      },
    },
    {
      match: ["typescript", "jest", "testing", "cypress"],
      feature: {
        title: "Trade-In Estimator",
        description: "Dynamic calculation engine for device valuation.",
        icon: SwapHorizOutlinedIcon,
      },
    },
  ];

  for (const { match, feature } of checks) {
    if (lower.some((k) => match.some((m) => k.includes(m)))) {
      features.push(feature);
    }
  }

  if (features.length < 4) {
    const defaults: Feature[] = [
      {
        title: "UI Systems",
        description: "Component-driven interfaces built for scale and maintainability.",
        icon: SpeedOutlinedIcon,
      },
      {
        title: "API Design",
        description: "Robust backend contracts with GraphQL and REST orchestration.",
        icon: MemoryOutlinedIcon,
      },
    ];

    for (const fallback of defaults) {
      if (features.length >= 4) break;
      if (!features.some((f) => f.title === fallback.title)) {
        features.push(fallback);
      }
    }
  }

  return features.slice(0, 4);
}

function deriveScalabilityHighlights(keywords: string[] = []): {
  primary: { value: string; label: string };
  secondary: { value: string; label: string };
} {
  const lower = keywords.map((k) => k.toLowerCase());

  const cloud = keywords.find((k) =>
    ["gcp", "azure", "aws", "cloud"].some((c) => k.toLowerCase().includes(c))
  );
  const iac = keywords.find((k) =>
    ["terraform", "pulumi", "cloudformation"].some((c) =>
      k.toLowerCase().includes(c)
    )
  );

  return {
    primary: {
      value: cloud ?? (lower.length ? keywords[0] : "GCP"),
      label: "Cloud Platform",
    },
    secondary: {
      value: iac ?? "Terraform",
      label: "IaC Mastery",
    },
  };
}

interface Props {
  project: ProjectItem;
  prevProject: ProjectItem | null;
  nextProject: ProjectItem | null;
  socialLinks: SocialLinkItem[];
}

const ProjectPageView = ({
  project,
  prevProject,
  nextProject,
  socialLinks,
}: Props) => {
  const { main, accent } = parseTitle(project.title);
  const { summary, brief } = splitDescription(project.description);
  const features = deriveFeatures(project.keywords);
  const scalabilityHighlights = deriveScalabilityHighlights(project.keywords);

  return (
    <main css={styles.page}>
      <section css={css([styles.section, styles.hero])}>
        <Link href="/#work" css={styles.backLink}>
          <ArrowBackRoundedIcon sx={{ fontSize: 14 }} />
          Back to projects
        </Link>

        <div css={styles.heroGrid}>
          <h1 css={styles.title}>
            {main}
            {accent && (
              <>
                {" "}
                <span css={styles.titleAccent}>{accent}</span>
              </>
            )}
          </h1>
          <p css={styles.heroSummary}>{summary}</p>
        </div>

        <div css={styles.imageCard}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              css={styles.heroImage}
            />
          ) : (
            <div css={styles.imagePlaceholder}>No preview available</div>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              css={styles.externalLink}
              aria-label={`Visit ${project.title}`}
            >
              <NorthEastRoundedIcon fontSize="small" />
            </a>
          )}
        </div>
      </section>

      <section css={css([styles.section, styles.twoCol])}>
        <div>
          <div css={styles.sectionLabel}>
            <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />
            Project Brief
          </div>
          {brief.map((paragraph, index) => (
            <p key={index} css={styles.briefText}>
              {paragraph}
            </p>
          ))}
        </div>

        <div>
          <div css={styles.sectionLabel}>
            <LayersOutlinedIcon sx={{ fontSize: 18 }} />
            Stack
          </div>
          <div css={styles.tagCloud}>
            {(project.keywords ?? []).map((keyword) => (
              <span key={keyword} css={styles.tag}>
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section css={css([styles.section, styles.featuresSection])}>
        <div css={styles.featuresWrapper}>
          <MemoryOutlinedIcon
            sx={{ fontSize: 200, opacity: 0.04, position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)", pointerEvents: "none", color: theme.colors.accent }}
          />
          <h2 css={styles.featuresHeading}>Engineered Features</h2>
          <div css={styles.featuresGrid}>
            {features.map(({ title, description, icon: Icon }) => (
              <div key={title} css={styles.featureCard}>
                <Icon css={styles.featureIcon} />
                <div css={styles.featureTitle}>{title}</div>
                <div css={styles.featureDesc}>{description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section css={styles.section}>
        <div css={styles.scalability}>
          <div>
            <h2 css={styles.scalabilityHeading}>Architecting Scalability</h2>
            <p css={styles.scalabilityText}>{project.description}</p>
            <div css={styles.scalabilityHighlights}>
              <div css={styles.highlight}>
                <div css={styles.highlightValue}>
                  {scalabilityHighlights.primary.value}
                </div>
                <div css={styles.highlightLabel}>
                  {scalabilityHighlights.primary.label}
                </div>
              </div>
              <div css={styles.highlight}>
                <div css={styles.highlightValue}>
                  {scalabilityHighlights.secondary.value}
                </div>
                <div css={styles.highlightLabel}>
                  {scalabilityHighlights.secondary.label}
                </div>
              </div>
            </div>
          </div>

          {project.image && (
            <div css={styles.scalabilityImage}>
              <img
                src={project.image}
                alt=""
                css={styles.scalabilityImg}
                aria-hidden
              />
            </div>
          )}
        </div>
      </section>

      <nav css={styles.projectNav} aria-label="Project navigation">
        {prevProject ? (
          <Link href={`/project/${prevProject.slug}`} css={styles.projectNavLink}>
            <span css={styles.projectNavLabel}>
              <ArrowBackRoundedIcon
                sx={{ fontSize: 12, verticalAlign: "middle", mr: 0.5 }}
              />
              Previous project
            </span>
            <span css={styles.projectNavTitle}>{prevProject.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            href={`/project/${nextProject.slug}`}
            css={css([styles.projectNavLink, styles.projectNavLinkRight])}
          >
            <span css={styles.projectNavLabel}>
              Next project
              <ArrowForwardRoundedIcon
                sx={{ fontSize: 12, verticalAlign: "middle", ml: 0.5 }}
              />
            </span>
            <span css={styles.projectNavTitle}>{nextProject.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>

      <Footer socialLinks={socialLinks} />
    </main>
  );
};

export default ProjectPageView;

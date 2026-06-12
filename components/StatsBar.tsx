/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { theme } from "@/lib/theme";
import { Breakpoints } from "@/lib/utils/breakpoints";

const styles = {
  bar: css({
    width: "100%",
    maxWidth: theme.maxWidth,
    margin: "0 auto",
    padding: "0 24px 48px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
    borderTop: `1px solid ${theme.colors.border}`,
    borderBottom: `1px solid ${theme.colors.border}`,
    paddingTop: 40,
    paddingBottom: 40,
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

const CAREER_START_YEAR = 2016;
const SYSTEM_UPTIME = 90;
const COUNT_UP_DURATION_MS = 1400;

type StatConfig = {
  label: string;
  target: number;
  suffix?: string;
  padStart?: number;
};

function getYearsExperience(startYear: number): number {
  return new Date().getFullYear() - startYear;
}

function useCountUp(target: number, enabled: boolean, duration = COUNT_UP_DURATION_MS) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let startTime: number | null = null;
    let frame = 0;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    setValue(0);
    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [target, enabled, duration]);

  return value;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

function formatStatValue(
  value: number,
  { suffix = "", padStart: padLength }: Pick<StatConfig, "suffix" | "padStart">
) {
  const formatted = padLength
    ? String(value).padStart(padLength, "0")
    : String(value);

  return `${formatted}${suffix}`;
}

interface AnimatedStatProps extends StatConfig {
  shouldAnimate: boolean;
  isInView: boolean;
  prefersReducedMotion: boolean;
}

function AnimatedStat({
  label,
  target,
  suffix,
  padStart,
  shouldAnimate,
  isInView,
  prefersReducedMotion,
}: AnimatedStatProps) {
  const value = useCountUp(target, shouldAnimate);
  const displayValue = !isInView ? 0 : prefersReducedMotion ? target : value;

  return (
    <div css={styles.stat}>
      <div css={styles.value}>
        {formatStatValue(displayValue, { suffix, padStart })}
      </div>
      <div css={styles.label}>{label}</div>
    </div>
  );
}

interface Props {
  projectCount: number;
}

const StatsBar = ({ projectCount }: Props) => {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const shouldAnimate = isInView && !prefersReducedMotion;

  const stats: StatConfig[] = [
    {
      label: "Years experience",
      target: getYearsExperience(CAREER_START_YEAR),
      suffix: "+",
    },
    {
      label: "Global projects",
      target: projectCount,
      padStart: 2,
    },
    {
      label: "System uptime",
      target: SYSTEM_UPTIME,
      suffix: "%",
    },
  ];

  return (
    <div ref={ref} css={styles.bar}>
      {stats.map((stat) => (
        <AnimatedStat
          key={stat.label}
          {...stat}
          shouldAnimate={shouldAnimate}
          isInView={isInView}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  );
};

export default StatsBar;

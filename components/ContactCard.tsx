/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import Link from "next/link";
import { ContactInformationContent } from "@/lib/types";
import { theme } from "@/lib/theme";
import { Breakpoints } from "@/lib/utils/breakpoints";

const styles = {
  section: css({
    width: "100%",
    maxWidth: theme.maxWidth,
    margin: "0 auto",
    padding: theme.sectionPadding,
  }),
  banner: css({
    background: theme.gradients.cta,
    borderRadius: 4,
    padding: "64px 48px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 28,
    [Breakpoints.sm]: {
      padding: "48px 24px",
    },
  }),
  title: css({
    fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
    fontWeight: 800,
    color: theme.colors.text,
    lineHeight: 1.2,
    maxWidth: 560,
  }),
  subtext: css({
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.85)",
    maxWidth: 440,
    lineHeight: 1.6,
  }),
  button: css({
    display: "inline-block",
    backgroundColor: theme.colors.text,
    color: theme.colors.bg,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "14px 32px",
    borderRadius: 4,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
    },
  }),
};

interface Props {
  contact: ContactInformationContent;
}

const ContactCard = ({ contact }: Props) => {
  return (
    <section css={styles.section}>
      <div css={styles.banner}>
        <h2 css={styles.title}>{contact.title}</h2>
        <p css={styles.subtext}>{contact.subHeading}</p>
        <Link href="/contact" css={styles.button}>
          Start Project
        </Link>
      </div>
    </section>
  );
};

export default ContactCard;

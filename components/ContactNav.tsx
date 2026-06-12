/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import NavIcon from "./NavIcon";
import { SocialLinkItem } from "@/lib/types";

const styles = {
  wrapper: css({
    display: "flex",
    gap: 8,
  }),
};

const iconMap: Record<string, IconDefinition> = {
  linkedin: faLinkedin,
  github: faGithub,
  twitter: faTwitter,
  email: faEnvelope,
  envelope: faEnvelope,
};

function resolveIcon(iconName: string): IconDefinition {
  return iconMap[iconName.toLowerCase()] ?? faEnvelope;
}

function resolveHref(link: string, iconName: string): string {
  const normalizedIcon = iconName.toLowerCase();

  if (
    (normalizedIcon === "email" || normalizedIcon === "envelope") &&
    !link.startsWith("mailto:")
  ) {
    return `mailto:${link}`;
  }

  return link;
}

interface Props {
  socialLinks: SocialLinkItem[];
}

const ContactNav = ({ socialLinks }: Props) => (
  <div css={styles.wrapper}>
    {socialLinks.map((socialLink) => (
      <NavIcon
        key={socialLink.id}
        href={resolveHref(socialLink.link, socialLink.iconName)}
        icon={resolveIcon(socialLink.iconName)}
      />
    ))}
  </div>
);

export default ContactNav;

import { HeadingLevel } from "@/lib/utils/Headings";

export type ProjectItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  keywords?: string[];
  link?: string;
  rank?: number;
};

export type SocialLinkItem = {
  id: string;
  title: string;
  link: string;
  iconName: string;
};

export type BannerContent = {
  title: string;
  subHeading: string;
  subHeadingLevel: HeadingLevel;
  navText: string;
};

export type ContactInformationContent = {
  title: string;
  subHeading: string;
  socialLinks: SocialLinkItem[];
};

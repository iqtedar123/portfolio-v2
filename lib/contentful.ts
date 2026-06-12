import { Asset, createClient, Entry } from "contentful";
import {
  BannerContent,
  ContactInformationContent,
  ProjectItem,
  SocialLinkItem,
} from "./types";
import { HeadingLevel } from "./utils/Headings";

type BannerFields = {
  title: string;
  subHeading: string;
  subHeadingLevel?: number;
  navText: string;
};

type ContactInformationFields = {
  title: string;
  subHeading: string;
  socialLinks?: Entry[];
};

type SocialLinkFields = {
  title: string;
  link: string;
  iconName: string;
};

type ProjectFields = {
  title: string;
  description: string;
  screen?: Asset;
  keywords?: string[];
  link?: string;
  slug: string;
  rank?: number;
};

function getClient() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";

  if (!spaceId || !accessToken) {
    throw new Error(
      "Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN environment variables."
    );
  }

  return createClient({
    space: spaceId,
    accessToken,
    environment,
  });
}

function assetUrl(asset: Asset | undefined): string {
  if (!asset?.fields?.file) {
    return "";
  }

  const file = asset.fields.file as { url?: string };
  const url = file.url;

  if (!url) {
    return "";
  }

  return url.startsWith("//") ? `https:${url}` : url;
}

function toHeadingLevel(level: number | undefined): HeadingLevel {
  if (level && level >= 1 && level <= 6) {
    return level as HeadingLevel;
  }

  return 4;
}

function mapSocialLink(entry: Entry): SocialLinkItem {
  const fields = entry.fields as SocialLinkFields;

  return {
    id: entry.sys.id,
    title: fields.title,
    link: fields.link,
    iconName: fields.iconName,
  };
}

export async function getBanner(): Promise<BannerContent> {
  const client = getClient();
  const response = await client.getEntries({
    content_type: "banner",
    limit: 1,
  });

  const entry = response.items[0];

  if (!entry) {
    throw new Error("Banner entry not found in Contentful.");
  }

  const fields = entry.fields as BannerFields;

  return {
    title: fields.title,
    subHeading: fields.subHeading,
    subHeadingLevel: toHeadingLevel(fields.subHeadingLevel),
    navText: fields.navText,
  };
}

export async function getContactInformation(): Promise<ContactInformationContent> {
  const client = getClient();
  const response = await client.getEntries({
    content_type: "contactInformation",
    include: 2,
    limit: 1,
  });

  const entry = response.items[0];

  if (!entry) {
    throw new Error("ContactInformation entry not found in Contentful.");
  }

  const fields = entry.fields as ContactInformationFields;
  const socialLinks = (fields.socialLinks ?? [])
    .filter((link): link is Entry => Boolean(link?.fields))
    .map(mapSocialLink);

  return {
    title: fields.title,
    subHeading: fields.subHeading,
    socialLinks,
  };
}

export async function getProjects(): Promise<ProjectItem[]> {
  const client = getClient();
  const response = await client.getEntries({
    content_type: "portfolioProject",
    order: ["fields.rank"],
    include: 2,
  });

  return response.items.map((entry) => {
    const fields = entry.fields as ProjectFields;

    return {
      id: entry.sys.id,
      slug: fields.slug,
      title: fields.title,
      description: fields.description,
      image: assetUrl(fields.screen),
      keywords: fields.keywords,
      link: fields.link,
      rank: fields.rank,
    };
  });
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectItem | null> {
  const client = getClient();
  const response = await client.getEntries({
    content_type: "portfolioProject",
    "fields.slug": slug,
    limit: 1,
    include: 2,
  });

  const entry = response.items[0];

  if (!entry) {
    return null;
  }

  const fields = entry.fields as ProjectFields;

  return {
    id: entry.sys.id,
    slug: fields.slug,
    title: fields.title,
    description: fields.description,
    image: assetUrl(fields.screen),
    keywords: fields.keywords,
    link: fields.link,
    rank: fields.rank,
  };
}

export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((project) => project.slug);
}

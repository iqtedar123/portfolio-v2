import ProjectPageView from "@/components/ProjectPageView";
import {
  getAdjacentProjects,
  getContactInformation,
  getProjectBySlug,
  getProjectSlugs,
  getProjects,
} from "@/lib/contentful";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const slugs = await getProjectSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.warn("Skipping project static params:", error);
    return [];
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [project, projects, contact] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
    getContactInformation(),
  ]);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(projects, slug);

  return (
    <ProjectPageView
      project={project}
      prevProject={prev}
      nextProject={next}
      socialLinks={contact.socialLinks}
    />
  );
}

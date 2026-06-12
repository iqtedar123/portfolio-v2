import ProjectPageView from "@/components/ProjectPageView";
import { getProjectBySlug, getProjectSlugs } from "@/lib/contentful";
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
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPageView project={project} />;
}

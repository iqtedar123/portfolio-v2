import ContactCard from "@/components/ContactCard";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import {
  getBanner,
  getContactInformation,
  getProjects,
} from "@/lib/contentful";

export const revalidate = 3600;

export default async function HomePage() {
  const [banner, contact, projects] = await Promise.all([
    getBanner(),
    getContactInformation(),
    getProjects(),
  ]);

  return (
    <>
      <Intro banner={banner} />
      <Projects projects={projects} />
      <ContactCard contact={contact} />
    </>
  );
}

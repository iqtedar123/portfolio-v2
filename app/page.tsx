import ContactCard from "@/components/ContactCard";
import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import StatsBar from "@/components/StatsBar";
import {
  getBanner,
  getContactInformation,
  getProfilePictureUrl,
  getProjects,
} from "@/lib/contentful";

export const revalidate = 3600;

export default async function HomePage() {
  const [banner, contact, projects, profileImageUrl] = await Promise.all([
    getBanner(),
    getContactInformation(),
    getProjects(),
    getProfilePictureUrl(),
  ]);

  return (
    <main style={{ width: "100%" }}>
      <Intro banner={banner} profileImageUrl={profileImageUrl} />
      <StatsBar projectCount={projects.length} />
      <Projects projects={projects} />
      <Expertise projects={projects} />
      <ContactCard contact={contact} />
      <Footer socialLinks={contact.socialLinks} />
    </main>
  );
}

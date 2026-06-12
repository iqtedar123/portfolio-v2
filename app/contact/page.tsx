import ContactCard from "@/components/ContactCard";
import { getContactInformation } from "@/lib/contentful";

export const revalidate = 3600;

export default async function ContactPage() {
  const contact = await getContactInformation();

  return <ContactCard contact={contact} />;
}

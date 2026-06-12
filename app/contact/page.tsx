import ContactPageView from "@/components/ContactPageView";
import { getContactInformation } from "@/lib/contentful";

export const revalidate = 3600;

export default async function ContactPage() {
  const contact = await getContactInformation();

  return <ContactPageView contact={contact} />;
}

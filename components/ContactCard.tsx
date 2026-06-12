/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { Gradients } from "@/lib/utils/Gradients";
import { ContactInformationContent } from "@/lib/types";
import Card from "./Card";
import ContactNav from "./ContactNav";

const styles = {
  wrapper: css({
    display: "flex",
    flex: 1,
  }),
};

interface Props {
  contact: ContactInformationContent;
}

const ContactCard = ({ contact }: Props) => {
  return (
    <section css={styles.wrapper}>
      <Card
        title={contact.title}
        subHeading={contact.subHeading}
        titleHeadingLevel={2}
        subHeadingLevel={4}
        gradient={Gradients.greenBlue}
        renderNav={() => <ContactNav socialLinks={contact.socialLinks} />}
      />
    </section>
  );
};

export default ContactCard;

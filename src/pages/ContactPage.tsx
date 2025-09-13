/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import ContactCard from "../shared/components/ContactCard";

const styles = {
  wrapper: css({
    maxWidth: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
};

const ContactPage = () => {
  return (
    <div css={styles.wrapper}>
      <ContactCard />
    </div>
  );
};

export default ContactPage;

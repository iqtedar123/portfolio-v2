/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { Gradients } from "../utils/Gradients";
import Card from "./Card";
import ContactNav from "./ContactNav";
import { useTheme } from "../contexts/ThemeContext";

const styles = {
  wrapper: css({
    display: "flex",
    flex: 1,
  }),
};

const ContactCard = () => {
  const { theme } = useTheme();

  return (
    <section css={styles.wrapper}>
      <Card
        title={"Lets build something together!"}
        subHeading={
          "Feel free to reach out for collaborations or just a friendly hello."
        }
        titleHeadingLevel={2}
        subHeadingLevel={4}
        gradient={
          theme === "dark"
            ? Gradients.purplePurplePurpleGreen
            : Gradients.greenBlue
        }
        renderNav={() => <ContactNav />}
      />
    </section>
  );
};

export default ContactCard;

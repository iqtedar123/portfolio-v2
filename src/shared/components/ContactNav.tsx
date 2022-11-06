/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import NavIcon from "./NavIcon";

const styles = {
  wrapper: css({
    display: "flex",
    gap: 8,
  }),
};

const ContactNav = () => (
  <div css={styles.wrapper}>
    <NavIcon
      href={"https://www.linkedin.com/in/mohammad-chowdhry-74baba10a/"}
      icon={faLinkedin}
    />
    <NavIcon href={"https://github.com/iqtedar123"} icon={faGithub} />
    <NavIcon href={"https://twitter.com/iQtedar_C"} icon={faTwitter} />
    <NavIcon href={"mailto:mohammedchowdhry@gmail.com"} icon={faEnvelope} />
  </div>
);

export default ContactNav;

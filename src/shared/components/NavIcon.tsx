/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconDefinition, IconName } from "@fortawesome/fontawesome-svg-core";

interface Props {
  icon: IconDefinition;
  href: string;
}

const styles = {
  wrapper: css({
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
};

const NavIcon = ({ icon, href }: Props) => {
  return (
    <a href={href} css={styles.wrapper} target="_">
      <FontAwesomeIcon icon={icon} />
    </a>
  );
};

export default NavIcon;

/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useLocation } from "react-router";

const styles = {
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    borderRadius: "133.44px",
    zIndex: 3000,
    height: 75,
    width: "100%",
    maxWidth: "80%",
  }),
  circle: css({
    borderRadius: "50%",
    backgroundColor: "#be94e9",
    width: 50,
    height: 50,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  }),
  logo: css({
    display: "flex",
    alignItems: "center",
  }),
  logoLink: css({}),
  nav: css({
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "18px",
    letterSpacing: "-0.01em",
    textTransform: "capitalize",
    listStyle: "none",
    display: "flex",
    gap: 24,
  }),
  inactiveLink: css({
    fontWeight: 500,
    opacity: 0.5,
  }),
};

const navItems = [
  {
    name: "Home",
    url: "/",
    key: "Home",
  },
];

const Header = () => {
  const currentURL = window.location.pathname;
  return (
    <header css={styles.header}>
      <a css={styles.logoLink} href="/">
        <div css={styles.logo}>
          <div css={styles.circle}>MC</div>
        </div>
      </a>
      <nav css={styles.nav}>
        {navItems.map(({ name, url, key }) => (
          <li key={key}>
            <a href={url} css={currentURL !== url ? styles.inactiveLink : ""}>
              {name}
            </a>
          </li>
        ))}
      </nav>
    </header>
  );
};

export default Header;

/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useTheme } from "../contexts/ThemeContext";

const styles = {
  toggleButton: css({
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    width: "40px",
    height: "40px",
    fontSize: "18px",

    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      transform: "scale(1.1)",
    },

    '[data-theme="dark"] &': {
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    },

    '[data-theme="light"] &': {
      color: "#000000",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    },
  }),
};

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      css={styles.toggleButton}
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;

/** @jsxImportSource @emotion/react */

import "./App.css";
import { css } from "@emotion/react";
import Header from "./shared/components/Header";
import { ThemeProvider } from "./shared/contexts/ThemeContext";

const styles = {
  wrapper: css({
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
};

type Props = {
  children?: React.ReactNode;
};

const App: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider>
      <div css={styles.wrapper}>
        <Header />
        {children}
      </div>
    </ThemeProvider>
  );
};

export default App;

/** @jsxImportSource @emotion/react */

import "./App.css";
import { css } from "@emotion/react";
import Header from "./shared/components/Header";

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
    <div css={styles.wrapper}>
      <Header />
      {children}
    </div>
  );
};

export default App;

/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { ProjectItem } from "../types";

const styles = {
  keyword: css({
    borderRadius: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 300,
    padding: 8,
    backgroundColor: "#3e85ef",
  }),
  wrapper: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
  }),
};

interface Props {
  keywords: ProjectItem["keywords"];
}

const Keywords = ({ keywords }: Props) => {
  return (
    <div css={styles.wrapper}>
      {keywords?.map((keyword) => (
        <div key={keyword} css={styles.keyword}>
          {keyword}
        </div>
      ))}
    </div>
  );
};

export default Keywords;

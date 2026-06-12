/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { ProjectItem } from "@/lib/types";
import Card from "./Card";
import { Gradients } from "@/lib/utils/Gradients";
import Keywords from "./Keywords";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { Breakpoints } from "@/lib/utils/breakpoints";

const styles = {
  description: css({
    overflowWrap: "break-word",
    textAlign: "start",
    color: "white",
  }),
  wrapper: css({
    maxWidth: "70%",
    [Breakpoints.sm]: {
      maxWidth: "fit-content",
    },
  }),
  keywords: css({
    color: "white",
  }),
};

interface Props {
  project: ProjectItem;
}

const ProjectPageView = ({ project }: Props) => {
  return (
    <div css={styles.wrapper}>
      <h1>{project.title}</h1>
      <section>
        <Card
          title={project.description}
          className={styles.description}
          gradient={Gradients.green}
        />
        <Card
          title="Keywords"
          renderNav={() => <Keywords keywords={project.keywords} />}
          className={styles.keywords}
        />
        <Card image={project.image} />
        <Card
          title="Visit"
          url={project.link}
          className={styles.keywords}
          Icon={NorthEastRoundedIcon}
        />
      </section>
    </div>
  );
};

export default ProjectPageView;

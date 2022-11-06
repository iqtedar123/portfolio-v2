/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { ProjectItem } from "../types";
import { Gradients } from "../utils/Gradients";
import Card from "./Card";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { Breakpoints } from "../utils/breakpoints";

const styles = {
  project: css({
    width: `calc(40%)`,
    height: 400,
    alignItems: "baseline",
    color: "white",
    [Breakpoints.sm]: {
      width: "auto",
      height: "auto",
    },
  }),
};

const Project = ({ project }: { project: ProjectItem }) => {
  const gradientKeys = Object.keys(Gradients);
  const index = Math.floor(Math.random() * gradientKeys.length);
  const gradient = gradientKeys[index];
  return (
    <Card
      title={project.title}
      gradient={Gradients[gradient]}
      image={project.image}
      className={styles.project}
      Icon={NorthEastRoundedIcon}
      url={`/project/${project.id}`}
    />
  );
};

export default Project;

/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { ProjectItem } from "@/lib/types";
import Project from "./Project";

const styles = {
  grid: css({
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
  }),
};

interface Props {
  projects: ProjectItem[];
}

const Projects = ({ projects }: Props) => {
  return (
    <section css={styles.grid}>
      {projects.map((project) => (
        <Project project={project} key={project.id} />
      ))}
    </section>
  );
};

export default Projects;

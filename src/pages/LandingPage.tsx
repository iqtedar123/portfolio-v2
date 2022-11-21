/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import Intro from "../shared/components/Intro";
import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { ProjectItem } from "../shared/types";
import { db } from "../main";
import Projects from "../shared/components/Projects";
import { css } from "@emotion/react";
import Card from "../shared/components/Card";
import ContactCard from "../shared/components/ContactCard";

const fetchProjects = async (setProjects: {
  (value: React.SetStateAction<ProjectItem[]>): void;
  (arg0: ProjectItem[]): void;
}) => {
  const projectsRef = collection(db, "Projects");
  try {
    const projects: ProjectItem[] = [];
    const q = query(projectsRef, orderBy("rank"));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      const project = doc.data() as ProjectItem;
      project.id = doc.id;
      projects.push(project);
    });

    setProjects(projects);
  } catch (error) {
    console.log("error", error);
  }
};

const styles = {
  wrapper: css({
    maxWidth: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
};

const LandingPage = () => {
  const [projects, setProjects] = useState([] as ProjectItem[]);

  useEffect(() => {
    if (projects.length <= 0) {
      fetchProjects(setProjects);
    }
  }, []);

  return (
    <div css={styles.wrapper}>
      <Intro />
      <h2>Previous Projects</h2>
      <Projects projects={projects} />
      <ContactCard />
    </div>
  );
};

export default LandingPage;

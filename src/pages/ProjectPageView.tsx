/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import { useParams } from "react-router";
import { getDoc, doc } from "firebase/firestore/lite";
import { ProjectItem } from "../shared/types";
import { db } from "../main";
import { useEffect, useState } from "react";
import Card from "../shared/components/Card";
import { Gradients } from "../shared/utils/Gradients";
import Keywords from "../shared/components/Keywords";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { Breakpoints } from "../shared/utils/breakpoints";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const fetchProject = async (
  id: string,
  setProject: {
    (value: React.SetStateAction<ProjectItem | undefined>): void;
    (arg0: ProjectItem): void;
  }
) => {
  const projectsRef = doc(db, "Projects", id);
  try {
    const snapshot = await getDoc(projectsRef);
    if (snapshot.exists()) {
      setProject(snapshot.data() as ProjectItem);
    }
  } catch (error) {
    console.log("error", error);
  }
};

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
  image: css({
    width: "100%",
    borderRadius: 8,
  }),
  keywords: css({
    color: "white",
  }),
  header: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }),
  backButton: css({
    border: "none",
    cursor: "pointer",
    color: "black",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 0,
    margin: 0,
    ":hover": {
      color: "red",
    },
  }),
  title: css({
    flex: 1,
  }),
};

const ProjectPageView = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectItem | undefined>();
  useEffect(() => {
    if (id) {
      fetchProject(id, setProject);
    }
  }, []);

  return (
    <div css={styles.wrapper}>
      <button css={styles.backButton} onClick={() => window.history.back()}>
        <ArrowBackRoundedIcon />
        Back to Projects
      </button>
      <h1 css={styles.title}>{project?.title}</h1>
      <section>
        <Card
          title={project?.description!}
          className={styles.description}
          gradient={Gradients.green}
        />
        <Card
          title={"Keywords"}
          renderNav={() => <Keywords keywords={project?.keywords} />}
          className={styles.keywords}
        />
        <Card image={project?.image} />
        <Card
          title={"Visit"}
          url={project?.link}
          className={styles.keywords}
          Icon={NorthEastRoundedIcon}
        />
      </section>
    </div>
  );
};

export default ProjectPageView;

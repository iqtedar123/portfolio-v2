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
  }),
  image: css({
    width: "100%",
    borderRadius: 8,
  }),
  keywords: css({
    color: "white",
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
      <h1>{project?.title}</h1>
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

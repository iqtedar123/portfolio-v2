import { useParams } from "react-router";
import { getDoc, doc } from "firebase/firestore/lite";
import { ProjectItem } from "../shared/types";
import { db } from "../main";
import { useEffect, useState } from "react";
import { Heading } from "../shared/utils/Headings";

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

const ProjectPageView = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectItem | undefined>();
  useEffect(() => {
    if (id) {
      // fetchProject(id, setProject);
    }
  }, []);

  return <>{project?.title}</>;
};

export default ProjectPageView;

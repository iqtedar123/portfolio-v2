import { Suspense } from "react";
import ProjectPageView from "./ProjectPageView";

const ProjectPage = () => {
  return (
    <Suspense fallback={"Loading...."}>
      <ProjectPageView />
    </Suspense>
  );
};

export default ProjectPage;

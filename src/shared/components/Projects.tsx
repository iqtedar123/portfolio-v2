/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { ProjectItem } from "../types";
import Project from "./Project";
import { Gradients } from "../utils/Gradients";
import { useMemo } from "react";

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
  // Generate gradient sequence ensuring no two adjacent projects have the same gradient
  // Considers both horizontal (same row) and vertical (same column) adjacency in 2-column grid
  const gradientSequence = useMemo(() => {
    const gradientKeys = Object.keys(Gradients);
    const sequence: string[] = [];

    // Helper function to get adjacent project indices in 2-column grid
    const getAdjacentIndices = (index: number): number[] => {
      const adjacent: number[] = [];

      // Horizontal adjacency (same row, left/right)
      if (index % 2 === 1) {
        // Right column - check left neighbor
        adjacent.push(index - 1);
      } else if (index % 2 === 0 && index + 1 < projects.length) {
        // Left column - check right neighbor
        adjacent.push(index + 1);
      }

      // Vertical adjacency (same column, up/down)
      if (index >= 2) {
        // Check project above (same column)
        adjacent.push(index - 2);
      }
      if (index + 2 < projects.length) {
        // Check project below (same column)
        adjacent.push(index + 2);
      }

      return adjacent;
    };

    for (let i = 0; i < projects.length; i++) {
      if (i === 0) {
        // First project gets a random gradient
        const randomIndex = Math.floor(Math.random() * gradientKeys.length);
        sequence.push(gradientKeys[randomIndex]);
      } else {
        // Get indices of adjacent projects
        const adjacentIndices = getAdjacentIndices(i);

        // Get gradients used by adjacent projects
        const usedGradients = adjacentIndices
          .map((idx) => sequence[idx])
          .filter((gradient) => gradient !== undefined);

        // Filter out gradients used by adjacent projects
        const availableGradients = gradientKeys.filter(
          (key) => !usedGradients.includes(key)
        );

        // If no gradients available (shouldn't happen with enough gradients), fallback to any gradient
        const gradientsToChooseFrom =
          availableGradients.length > 0 ? availableGradients : gradientKeys;

        const randomIndex = Math.floor(
          Math.random() * gradientsToChooseFrom.length
        );
        sequence.push(gradientsToChooseFrom[randomIndex]);
      }
    }

    return sequence;
  }, [projects.length]);

  return (
    <section css={styles.grid}>
      {projects.map((project, index) => (
        <Project
          project={project}
          gradient={gradientSequence[index]}
          key={project.id}
        />
      ))}
    </section>
  );
};

export default Projects;

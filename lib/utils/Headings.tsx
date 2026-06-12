import React from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
  className?: string;
}

interface HeadingProps extends Props {
  headingLevel: HeadingLevel;
  children?: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  className,
  headingLevel,
  children,
}) => {
  return React.createElement(
    `h${headingLevel}`,
    {
      className,
    },
    children
  );
};

/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useMemo } from "react";
import { Breakpoints } from "../utils/breakpoints";
import { Gradients } from "../utils/Gradients";
import { Heading, HeadingLevel } from "../utils/Headings";

const getStyles = ({ gradient }: { gradient: string }) => ({
  wrapper: css({
    translate: "none",
    rotate: "none",
    scale: "none",
    transform: "translate(0px, 0px)",
    zIndex: 10,
    opacity: 1,
    maxWidth: "700px",
    paddingRight: "100px",
    borderRadius: "25px",
    margin: "10px",
    padding: "40px",
    position: "relative",
    overflow: "hidden",
    flexDirection: "column",
    display: "flex",
    background: gradient,
    width: 280,
    [Breakpoints.sm]: {
      width: "auto",
    },
  }),
  image: css({
    borderRadius: 8,
  }),
});

interface Props {
  imageSrc: string;
  gradient?: string;
}

const ProfilePictureCard = ({ imageSrc, gradient = Gradients.pink }: Props) => {
  const styles = useMemo(() => getStyles({ gradient }), [gradient]);
  return (
    <div css={styles.wrapper}>
      <img src={imageSrc} width={"100%"} height={"100%"} css={styles.image} />
    </div>
  );
};

export default ProfilePictureCard;

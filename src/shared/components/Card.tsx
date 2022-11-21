/** @jsxImportSource @emotion/react */

import { ClassNames, css, SerializedStyles } from "@emotion/react";
import { ReactNode, useMemo } from "react";
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
    paddingRight: "100px",
    borderRadius: "25px",
    margin: "10px",
    padding: "40px",
    position: "relative",
    overflow: "hidden",
    flexDirection: "column",
    display: "flex",
    background: gradient,
    transformOrigin: "0 0",
    transition: " transform .25s, visibility .25s ease-in",
    ":hover": {
      opacity: 0.5,
      img: {
        transform: "scale(1.005)",
      },
    },
    ":focus": {
      opacity: 0.5,
    },
  }),
  iconWrapper: css({
    borderRadius: "50%",
    backgroundColor: "white",
    width: 50,
    height: 50,
    position: "absolute",
    top: 16,
    right: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    [Breakpoints.sm]: {
      width: 30,
      height: 30,
    },
  }),
  image: css({
    transformOrigin: "0 0",
    transition: " transform .25s, visibility .25s ease-in",
    display: "inline-flex",
    height: "auto",
    alignSelf: "center",
    borderRadius: 8,
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    overflow: "hidden",
  }),
  content: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    width: "100%",
    height: "100%",
    [Breakpoints.sm]: {
      display: "block",
      h1: {
        fontSize: 32,
      },
      h3: {
        fontSize: 24,
      },
    },
  }),
});

interface Props {
  title?: string;
  titleHeadingLevel?: HeadingLevel;
  subHeading?: string;
  subHeadingLevel?: HeadingLevel;
  gradient?: string;
  image?: string;
  className?: SerializedStyles;
  Icon?: any;
  url?: string;
  renderNav?: () => ReactNode;
  linkTarget?: string;
}

const Card = ({
  title,
  titleHeadingLevel = 3,
  subHeading,
  subHeadingLevel = 3,
  gradient = Gradients.blue,
  image,
  className,
  Icon,
  url,
  renderNav,
  linkTarget = "_",
}: Props) => {
  const styles = useMemo(() => getStyles({ gradient }), [gradient]);
  return (
    <ClassNames>
      {({ css, cx }) => (
        <div css={cx(css(styles.wrapper), css(className))}>
          {Icon && (
            <a css={styles.iconWrapper} href={url} target={linkTarget}>
              <Icon />
            </a>
          )}
          <div css={styles.content}>
            {title && (
              <Heading headingLevel={titleHeadingLevel}>{title}</Heading>
            )}
            {subHeading && (
              <Heading headingLevel={subHeadingLevel}>{subHeading}</Heading>
            )}
            {image && <img src={image} css={styles.image} />}
          </div>
          {renderNav && renderNav()}
        </div>
      )}
    </ClassNames>
  );
};

export default Card;

/** @jsxImportSource @emotion/react */

import Card from "./Card";
import { css } from "@emotion/react";
import ProfilePictureCard from "./ProfilePictureCard";
import imgUrl from "../../assets/profilePicture.jpg";
import { Breakpoints } from "../utils/breakpoints";

const styles = {
  wrapper: css({
    display: "flex",
    maxHeight: 500,
    width: "100%",
    justifyContent: "center",
    color: "white",
    [Breakpoints.sm]: {
      flexDirection: "column-reverse",
      maxHeight: "fit-content",
    },
  }),
  firstCard: css({
    width: "60%",
    [Breakpoints.sm]: {
      width: "auto",
    },
  }),
};

const Intro = () => {
  return (
    <section css={styles.wrapper}>
      <Card
        title={"Hi, I am Mohammad. AKA TechMeister."}
        titleHeadingLevel={1}
        subHeading={
          "I'm an experienced Full Stack Developer with high-level proficiency in many Front End and Back End technologies including some Mobile Development."
        }
        subHeadingLevel={4}
        className={styles.firstCard}
      />
      <ProfilePictureCard imageSrc={imgUrl} />
    </section>
  );
};

export default Intro;

/** @jsxImportSource @emotion/react */

import Card from "./Card";
import { css } from "@emotion/react";
import ProfilePictureCard from "./ProfilePictureCard";
import imgUrl from "../../assets/profilePicture.jpg";
import { Breakpoints } from "../utils/breakpoints";
import { Gradients } from "../utils/Gradients";

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
    textAlign: "left",
    width: "60%",
    [Breakpoints.sm]: {
      width: "auto",
    },
  }),
  paragraph: css({
    marginTop: 0,
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
        gradient={Gradients.green}
        renderNav={() => (
          <p css={styles.paragraph}>
            I am proficient with Web Application Architecture and have worked
            with a good number of successful development teams to deploy various
            web/mobile applications to the cloud. Please check out some of my
            past public projects.
          </p>
        )}
      />
      <ProfilePictureCard imageSrc={imgUrl} />
    </section>
  );
};

export default Intro;

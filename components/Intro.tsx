/** @jsxImportSource @emotion/react */

"use client";

import Card from "./Card";
import { css } from "@emotion/react";
import { Breakpoints } from "@/lib/utils/breakpoints";
import { Gradients } from "@/lib/utils/Gradients";
import { BannerContent } from "@/lib/types";

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

interface Props {
  banner: BannerContent;
}

const Intro = ({ banner }: Props) => {
  return (
    <section css={styles.wrapper}>
      <Card
        title={banner.title}
        titleHeadingLevel={1}
        subHeading={banner.subHeading}
        subHeadingLevel={banner.subHeadingLevel}
        className={styles.firstCard}
        gradient={Gradients.green}
        renderNav={() => <p css={styles.paragraph}>{banner.navText}</p>}
      />
    </section>
  );
};

export default Intro;

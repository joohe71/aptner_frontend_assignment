import { css } from "@emotion/react";
import { colorsTheme } from "./colors";

export const globalStyle = css`
  html {
    background-color: ${colorsTheme.gray[0]};
  }

  body {
    background-color: ${colorsTheme.gray[0]};
    font-family: "NanumGothic";
  }
`;

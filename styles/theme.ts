import { MantineThemeColors, MantineThemeOverride } from "@mantine/core";
import { colorsTheme } from "./colors";
import { fontFamilyTheme, fontHeadingTheme, fontSizesTheme } from "./typography";

export const theme: MantineThemeOverride & {
  colors: MantineThemeColors;
} = {
  white: "white",
  black: "black",
  colors: colorsTheme,
  primaryShade: 5,
  primaryColor: "primary",
  fontFamily: fontFamilyTheme,
  headings: {
    sizes: fontHeadingTheme,
  },
  fontSizes: fontSizesTheme,
};

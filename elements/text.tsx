import { theme } from "@/styles/theme";
import { Text as MantineText, Title as MantineTitle, TextProps } from "@mantine/core";

interface IPropsStyle extends TextProps {
  children?: React.ReactNode | string;
  color?: string;
  /** normal | semi-bold | bold */
  weight?: "normal" | "semi-bold" | "bold" | "inherit";
  /** header1 | header2 | header3 | header4 | header5 | header6 | body1 | body2 | body3 | body4 | body5 | body6 | detail */
  size?:
    | "header1"
    | "header2"
    | "header3"
    | "header4"
    | "header5"
    | "header6"
    | "body1"
    | "body2"
    | "body3"
    | "body4"
    | "body5"
    | "body6"
    | "detail";
}

const Text = ({
  size,
  color = theme.colors.gray[9],
  weight = "inherit",
  lineClamp,
  children,
  ...props
}: IPropsStyle) =>
  size === "header1" ||
  size === "header2" ||
  size === "header3" ||
  size === "header4" ||
  size === "header5" ||
  size === "header6" ? (
    <MantineTitle
      size={
        {
          header1: "h1",
          header2: "h2",
          header3: "h3",
          header4: "h4",
          header5: "h5",
          header6: "h6",
        }[size]
      }
      color={color}
      {...props}
    >
      {children}
    </MantineTitle>
  ) : (
    <MantineText
      lineClamp={lineClamp}
      size={
        size
          ? {
              body1: "xl",
              body2: "lg",
              body3: "1.125rem",
              body4: "md",
              body5: "sm",
              body6: "xs",
              detail: "0.6875rem",
            }[size]
          : "inherit"
      }
      weight={{ bold: 700, "semi-bold": 500, normal: 400, inherit: "inherit" }[weight]}
      color={color}
      {...props}
    >
      {children}
    </MantineText>
  );

export default Text;

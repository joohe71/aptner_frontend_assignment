import type { AppProps } from "next/app";
import { theme } from "@/styles/theme";
import { MantineProvider } from "@mantine/core";
import { globalStyle } from "@/styles/global";
import { Global } from "@emotion/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withCSSVariables theme={theme}>
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

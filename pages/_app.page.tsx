import type { AppProps } from "next/app";
import { theme } from "@/styles/theme";
import { MantineProvider } from "@mantine/core";
import { globalStyle } from "@/styles/global";
import { Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withCSSVariables theme={theme}>
        <Global styles={globalStyle} />
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

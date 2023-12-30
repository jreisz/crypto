import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export default function App({ Component, pageProps }) {
  const styles = {
    global: (props) => ({
      body: {
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("gray.100", "#0000")(props),
      },
    }),
  };

  const components = {
    Alert: {
      variants: {
        error: {
          container: {
            bg: "#F14A5A",
          },
        },
        success: {
          container: {
            bg: "#1ED86E",
          },
        },
      },
    },
    Drawer: {
      baseStyle: (props) => ({
        dialog: {
          bg: mode("white", "#141214")(props),
        },
      }),
    },
  };

  const theme = extendTheme({
    components,
    styles,
  });

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

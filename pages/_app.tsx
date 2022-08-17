import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, red, yellow } from "@mui/material/colors";
import { Toaster } from "react-hot-toast";
import { getSession } from "@/store/slices/userSlice";

function MyApp({ Component, pageProps }: AppProps) {
  const drawerWidth = 240;

  const theme = createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'url("/static/img/background_menu.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            width: drawerWidth,
          },
        },
      },
    },
    typography: {
      fontFamily: "Roboto",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
    spacing: 8,
    palette: {
      primary: blue,
      background: {
        default: "#FFF",
      },
    },
  });

  React.useEffect(() => {
    store.dispatch(getSession());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

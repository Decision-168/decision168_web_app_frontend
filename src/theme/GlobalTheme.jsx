import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      contrastText: "#1A1A1A",
      dark: "#B9CF17",
      light: "#D8EB47",
      main: "#C7DF19",
    },
    secondary: {
      contrastText: "#D9D9D9",
      dark: "#1A1A1A",
      light: "#F2F2F2",
      main: "#383838",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#383838", // Customize the background color
        },
      },
    },
  },
});

export default function GlobalTheme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

// {
//   lighter: "#E6F28C",
//   light: "#D8EB47",
//   main: "#C7DF19",
//   dark: "#B9CF17",
//   darker: "#A5B814",
// }

// {
//   lighter: "#F2F2F2",
//       light: "#D9D9D9",
//       main: "#383838",
//       dark: "#262626",
//       darker: "#1A1A1A",
// }

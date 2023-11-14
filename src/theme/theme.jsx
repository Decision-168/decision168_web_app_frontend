import { createTheme } from "@mui/material/styles";

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
  typography: {
    h2: {
      fontSize: "1.5rem", // Set the default font size
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width:900px)": {
        fontSize: "3rem",
      },
      "@media (min-width:1200px)": {
        fontSize: "3.5rem",
      },
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "black",
          color: "white",
          "& .MuiTooltip-arrow": {
            color: "black", // Change the arrow color to black
          },
          maxWidth: "320px", // Set the desired maximum width
          padding: "10px",
          "@media (max-width:600px)": {
            maxWidth: "325px",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#1A1A1A",
            color: "#F2F2F2",
          },
          "&:hover .MuiListItemIcon-root": {
            color: "#F2F2F2",
          },
          "&.Mui-selected ": {
            color: "#C7DF19",
            backgroundColor: "#1A1A1A",
          },
          "&.Mui-selected .MuiListItemIcon-root": {
            color: "#C7DF19",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            boxShadow: "none",
          },
          // borderRadius: "50px",
          textTransform: "capitalize",
          color: "#383838",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          padding: "0px",
          textAlign: "center",
          color: "#1A1A1A",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
            color: "#383838",
            padding: "7px 10px",
            border: "none",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          // padding: "0", // But it is changing the style for date picker field
        },
        // input: {
        //   padding: "7px 10px",
        //   font: "revert",
        // },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#C7DF19",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          // height: "55px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
        label: {
          fontSize: "13px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            padding: "0px",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          marginTop: "8px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "11px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: "25px",
        },
      },
    },
  },
});

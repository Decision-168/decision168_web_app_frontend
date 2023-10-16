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
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: "#383838",
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#1A1A1A',
                        color: '#F2F2F2',
                    },
                    '&:hover .MuiListItemIcon-root': {
                        color: '#F2F2F2',
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
                    borderRadius: "50px",
                    textTransform: "capitalize",
                    color: "#383838"
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
    },
});

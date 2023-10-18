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
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginTop:0,
                    '& .MuiInputBase-input': {
                        backgroundColor: '#FFFFFF',
                        borderRadius: "5px",
                        color: '#383838',
                        height: '30px',
                        padding: '5px 10px',
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#C7DF19',
                }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    backgroundColor: '#383838', // Background color
                    height: '60px', // Height
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'red', // Text color

                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF', // Background color
                    padding: '20px 0px',
                    height: '30px', // Height
                    '&:hover': {
                        backgroundColor: '#FFFFFF'
                    },
                },
            },
        },
    },


});

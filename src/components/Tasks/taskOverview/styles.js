import { useTheme } from "@mui/material/styles";

export const taskOverviewStyles = () => {
    const theme = useTheme();

    const label = {
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.secondary.dark,
        textAlign: "start",
        mt: 2
    };
    const labelText = {
        fontSize: 13,
        color: theme.palette.secondary.main,
        whiteSpace: "pre-wrap",
        textAlign: "start",
        p: 1,
    };
    const notesControl = {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "40px"
    };
    const noteslabel = {
        fontSize: 13,
        fontWeight: 500,
        color: "theme.palette.secondary.main",
        textAlign: "start",
    };
    const noteslabelText = {
        fontSize: 12,
        color: theme.palette.secondary.main,
        whiteSpace: "pre-wrap",
        textAlign: "start",
        p: 1,
    };

    const noteIcon = {
        color: "#707070",
        mr: 1
    }

    const projectOverviewLink = {
        textDecoration: "none",
        color: theme.palette.secondary.dark,
        fontSize: "13px",
        fontWeight: "500",
        ml: 1,
        "&:hover": {
            color: theme.palette.primary.dark,
        }
    }
    return { label, labelText, notesControl, noteslabel, noteslabelText, noteIcon, projectOverviewLink };
};
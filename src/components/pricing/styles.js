import { useTheme } from "@mui/material/styles";

export const pricingStyles = () => {
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
        height: "40px",
        margin: "0 20px",
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
    const subtaskLinkWrapper = {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "40px",
    };
    const subtaskLinkText = {
        fontSize: 13,
        color: theme.palette.secondary.main,
        whiteSpace: "pre-wrap",
        textAlign: "start",
        cursor: "pointer",
        p: 1,
        "&:hover": {
            color: theme.palette.primary.dark,
        }

    };
    const subtaskIcon = {
        color: theme.palette.primary.dark,
        mr: 1
    }

    const ribbonContainer = {
        position: 'relative',
        height: "100px",
        // backgroundColor:"gray",
        margin: "-16px"
    }

    const ribbon = {
        position: "absolute",
        left: "-0.7rem",
        top: "50%",
        width: "90%",
        height: "3rem",
        lineHeight: "3rem",
        background: '#006E3E',
        color: "#FFFFFF",
        fontWeight: 700,
        overflow: "hidden", // Corrected typo here
        borderRadius: "2rem",
        borderTopLeftRadius: 0,
        transform: "translateY(-50%)",
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    };

    const ribbonTail = {
      position: "absolute",
      left: "-0.7rem",
      bottom: "4.6rem",
      width: "0.7rem",
      height: "1.5rem",
      background: "#006E3E",
      borderTopLeftRadius: "1rem",
    };


    const ThumbUpIcon = {
      color: theme.palette.primary.light,
      alignSelf: "center",
      marginLeft: "5px",
      height: "20px",
      marginBottom: "4px",
    };



    return { ribbonContainer, ribbon, ribbonTail,ThumbUpIcon, label, labelText, notesControl, noteslabel, noteslabelText, noteIcon, projectOverviewLink, subtaskLinkWrapper, subtaskLinkText, subtaskIcon };
};
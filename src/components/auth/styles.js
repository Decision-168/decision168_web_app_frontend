import AuthBackgroundImage from "../../assets/images/auth-back-image.png";
import { useTheme } from "@mui/material/styles";

export const AuthStyles = () => {
  const theme = useTheme();

  const backGroundImage = {
    backgroundImage: `url(${AuthBackgroundImage})`,
    backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%", // Set a fixed height to cover the entire viewport vertically
    overflow: "hidden",
  };

  const ribbon = {
    width: "55%",
    height: "40px",
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    top: "15%",
    left: "-15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:before": {
      content: '""',
      position: "absolute",
      top: "-15px",
      left: "0",
      borderLeft: "7.5px solid transparent",
      borderRight: `7.5px solid ${theme.palette.primary.dark}`,
      borderTop: "7.5px solid transparent",
      borderBottom: `7.5px solid ${theme.palette.primary.dark}`,
    },
    "&:after": {
      content: '""',
      position: "absolute",
      top: 0,
      right: "-40px",
      borderLeft: `20px solid ${theme.palette.primary.main}`,
      borderRight: "20px solid transparent",
      borderTop: "20px solid transparent",
      borderBottom: "20px solid transparent",
    },
  };
  return { backGroundImage, ribbon };
};

import { Paper, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CoverImageAndAvatar from "../../common/CoverImageAndAvatar";

export default function ProfileCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper elevation={0} sx={{ minHeight: isSmallScreen ? "450px" : "400px" }}>
      <CoverImageAndAvatar clientName="Arshad Khan" clientPosition="Project Manager" />
      <h1>Form</h1>
    </Paper>
  );
}

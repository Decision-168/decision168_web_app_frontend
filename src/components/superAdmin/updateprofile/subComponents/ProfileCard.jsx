import { Avatar, Box, Grid, Paper } from "@mui/material";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { useTheme } from "@mui/material/styles";
import Client from "../../common/Client";
import CoverImage from "../../common/CoverImage";

import { useForm } from "react-hook-form";
import UpdateProfileForm from "./UpdateProfileForm";

export default function ProfileCard() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12}>
          <CoverImage />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box px={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", marginTop: "-50px" }}>
            <Avatar {...stringAvatar("Arshad Khan")} sx={{ width: "100px", height: "100px", backgroundColor: theme.palette.primary.main, border: "5px solid white" }} />
            <Client clientName="Arshad Khan" clientPosition="Project Manager" />
          </Box>
        </Grid>

        {/* Form */}
        <UpdateProfileForm />
        
      </Grid>
    </Paper>
  );
}

import { Grid, Paper } from "@mui/material";
import CoverImage from "../../common/CoverImage";
import { useForm } from "react-hook-form";
import UpdateProfileForm from "./UpdateProfileForm";
import CardAvatar from "../../common/CardAvatar";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { useSelector } from "react-redux";

export default function ProfileCard() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectUserDetails);
  const fullName = `${user?.first_name} ${user?.middle_name} ${user?.last_name} `;
  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12}>
          <CoverImage />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CardAvatar fullName={fullName} photo={user?.photo} designation={user?.designation} />
        </Grid>

        {/* Form */}
        <UpdateProfileForm />
      </Grid>
    </Paper>
  );
}

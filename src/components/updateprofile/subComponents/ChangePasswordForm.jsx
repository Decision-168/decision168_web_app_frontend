import { Box, Button, Grid } from "@mui/material";
import React, {useState} from "react";
import CustomPasswordField from "../../auth/subComponents/CustomPasswordField";
import { useForm } from "react-hook-form";
import { authValidations } from "../../auth/authValidations";
import { useTheme } from "@mui/material/styles";
import { updateAuthUserPassword } from "../../../api/modules/authModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";

export default function ChangePasswordForm({ handleClose }) {
  const theme = useTheme();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUserDetails);
  const userId = user?.reg_id;
;
  const onSubmit = async (data) => {
    alert(JSON.stringify(data));

    try {
      setLoading(true);
      const response = await updateAuthUserPassword(userId, data?.confirmPasswordAuthUser)
      handleClose();
      navigate("/");
      toast.success(response.message);
    } catch (error) {
      console.error(error);
      toast.error(`${error.response?.data?.error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Box sx={{ height: "65px" }}>
        <CustomPasswordField
          showTooltip={false}
          name="currentPassword"
          placeholder="Current Password"
          register={register}
          errors={errors}
          validation={authValidations.currentPassword} // Pass the validation rules as a prop
        />
      </Box>
      <Box sx={{ height: "65px" }}>
        <CustomPasswordField
          showTooltip={true}
          name="newPassword"
          placeholder="New Password"
          register={register}
          errors={errors}
          validation={authValidations.newPassword} // Pass the validation rules as a prop
        />
      </Box>
      <Box sx={{ height: "65px" }}>
        <CustomPasswordField
          showTooltip={false}
          name="confirmPasswordAuthUser"
          placeholder="Confirm Password"
          register={register}
          errors={errors}
          validation={authValidations.confirmPasswordAuthUser} // Pass the validation rules as a prop
        />
      </Box>
      <Grid item xs={12} sm={12} py={2} textAlign="end">
        <Button size="small" type="submit" variant="contained" sx={{ mr: 1 }}>
          Change Password
        </Button>
        <Button
          onClick={handleClose}
          size="small"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.light,
            "&:hover": { backgroundColor: theme.palette.secondary.dark },
          }}
        >
          Cancel
        </Button>
      </Grid>
    </Box>
  );
}

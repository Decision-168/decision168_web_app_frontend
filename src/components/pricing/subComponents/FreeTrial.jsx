import React, { memo, useState } from "react";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { useForm } from "react-hook-form";
import { DialogActions, DialogContent, Grid, Button, Box } from "@mui/material";
import { closeModal } from "../../../redux/action/modalSlice";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { AddFreeTrialAccountAccess } from "../../../api/modules/upgradeplanModule";
import { toast } from "react-toastify";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { useSelector } from "react-redux";

const items = [
  { value: "choose", text: "Choose", selected: true },
  { value: "0-10", text: "0-10", selected: false },
  { value: "11-50", text: "11-50", selected: false },
  { value: "51-250", text: "51-250", selected: false },
  { value: "250-500", text: "250-500", selected: false },
  { value: "500+", text: "500+", selected: false },
];

const FreeTrial = () => {
  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  //get user id
  const dispatch = useDispatch();
  const theme = useTheme();

  const [formFreeTrialValues, setFormFreeTrialValues] = useState({
    code: "",
    user_id: user_id,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (fieldName) => (event) => {
    setFormFreeTrialValues({
      ...formFreeTrialValues,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = { ...formFreeTrialValues };

      const response = await AddFreeTrialAccountAccess(data);
      if (response.message == "Enjoy free trial!") {
        toast.success(`${response.message}`);
        dispatch(closeModal("free-trial"));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(`${response.message}`);
      }
    } catch (error) {
      // Handling error
      toast.error(`${error.response?.error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container p={2}>
            <Grid item xs={12}>
              <CustomLabelTextField
                label="Code/Coupon"
                name="code"
                required={true}
                placeholder="Enter Code/Coupon"
                value={formFreeTrialValues.code}
                onChange={handleChange("code")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item xs={12} sm={12} px={2} py={2} textAlign="end">
              <Button
                onClick={() => dispatch(closeModal())}
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.light,
                  "&:hover": { backgroundColor: theme.palette.secondary.dark },
                }}
              >
                Close
              </Button>

              <Button
                size="small"
                type="submit"
                variant="contained"
                sx={{ ml: 1 }}
              >
                Apply
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Box>
    </>
  );
};
export default memo(FreeTrial);

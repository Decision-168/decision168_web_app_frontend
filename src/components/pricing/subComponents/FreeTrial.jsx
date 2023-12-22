import React, { memo } from "react";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { useForm } from "react-hook-form";
import { DialogActions, DialogContent, Grid, Button } from "@mui/material";
import { closeModal } from "../../../redux/action/modalSlice";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";

const items = [
  { value: "choose", text: "Choose", selected: true },
  { value: "0-10", text: "0-10", selected: false },
  { value: "11-50", text: "11-50", selected: false },
  { value: "51-250", text: "51-250", selected: false },
  { value: "250-500", text: "250-500", selected: false },
  { value: "500+", text: "500+", selected: false },
];

const FreeTrial = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [value, setValue] = React.useState("choose");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <DialogContent dividers>
        <Grid container p={2}>
          <Grid item xs={12}>
            <CustomLabelTextField
              label="Code/Coupon"
              name="code_coupon"
              required={false}
              placeholder="Enter Code/Coupon"
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
    </>
  );
};
export default memo(FreeTrial);

import React, { memo } from "react";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { useForm } from "react-hook-form";
import { globalValidations } from "../../../utils/GlobalValidation";
import CustomNumberField from "../../common/CustomNumberField";
import CustomSelect from "../../common/CustomSelect";
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

const ContactSaleForm = () => {
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
              label="Name"
              name="name"
              required={true}
              placeholder="Enter Name"
            />
          </Grid>
          <Grid item xs={12}>
            <CustomLabelTextField
              label="Email"
              name="email"
              required={true}
              placeholder="Enter Email Address"
            />
          </Grid>
          <Grid item xs={12} pt={2}>
            <CustomNumberField
              label="Phone"
              name="phoneNo"
              required={true}
              placeholder="Enter Phone No"
            />
          </Grid>
          <Grid item xs={12} pt={2}>
            <CustomSelect
              items={items}
              label="How many users are you exploring DECISION 168 for?"
              labelColor=""
              required={true}
              handleChange={handleChange}
              value={value}
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
              Send
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};
export default memo(ContactSaleForm);

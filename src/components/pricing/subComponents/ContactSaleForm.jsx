import React, { memo, useState } from "react";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { useForm } from "react-hook-form";
import { globalValidations } from "../../../utils/GlobalValidation";
import CustomNumberField from "../../common/CustomNumberField";
import CustomSelect from "../../common/CustomSelect";
import { DialogActions, DialogContent, Grid, Button, Box } from "@mui/material";
import { closeModal } from "../../../redux/action/modalSlice";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { AddContactSales } from "../../../api/modules/upgradeplanModule";

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

  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  //get user id

  const [formContactSalesValues, setFormContactSalesValues] = useState({
    name: `${user.first_name} ${user.last_name}`,
    email: user.email_address,
    phone: user.phone_number,
    pass_total_users: "",
    user_id: user_id,
  });
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("choose");

  const handleChange = (fieldName) => (event) => {
    setFormContactSalesValues({
      ...formContactSalesValues,
      [fieldName]: event.target.value,
    });
  };

  const handleChangeDD = (event) => {
    setValue(event.target.value);
    let total_users = "";
    if (event.target.value != "choose") {
      total_users = event.target.value;
    }
    setFormContactSalesValues({
      ...formContactSalesValues,
      pass_total_users: total_users,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = { ...formContactSalesValues };
      const { pass_total_users, user_id } = data;
      const NewData = {
        pass_total_users,
        user_id,
      };
      if (NewData.pass_total_users != "") {
        const response = await AddContactSales(data);
        dispatch(closeModal("contact-sales"));
        toast.success(`${response.message}`);
      } else {
        toast.error(`Please select options`);
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
                label="Name"
                name="name"
                required={true}
                placeholder="Enter Name"
                value={formContactSalesValues.name}
                onChange={handleChange("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomLabelTextField
                label="Email"
                name="email"
                required={true}
                placeholder="Enter Email Address"
                value={formContactSalesValues.email}
                onChange={handleChange("email")}
              />
            </Grid>
            <Grid item xs={12} pt={2}>
              <CustomNumberField
                label="Phone"
                name="phone"
                required={true}
                placeholder="Enter Phone No"
                value={formContactSalesValues.phone}
                onChange={handleChange("phone")}
              />
            </Grid>
            <Grid item xs={12} pt={2}>
              <CustomSelect
                items={items}
                label="How many users are you exploring DECISION 168 for?"
                name="pass_total_users"
                labelColor=""
                required={true}
                handleChange={handleChangeDD}
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
      </Box>
    </>
  );
};
export default memo(ContactSaleForm);

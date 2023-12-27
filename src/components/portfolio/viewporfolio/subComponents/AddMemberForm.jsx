import React from "react";
import { Box, Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { insertProjectPortfolioMember } from "../../../../api/modules/porfolioModule";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import CircularLoader from "../../../common/CircularLoader";
import { useTheme } from "@mui/material/styles";

export default function AddMemberForm({ handleClose }) {
  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const user = useSelector(selectUserDetails);
  const [loading, setLoading] = React.useState(false);

  const [inputFields, setInputFields] = React.useState([
    {
      email: "",
      error: false,
    },
  ]);

  const theme = useTheme();

  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index].email = event.target.value;
    values[index].error = false;
    setInputFields(values);
  };

  const handleAddClick = () => {
    setInputFields([...inputFields, { email: "", error: false }]);
  };

  const handleRemoveClick = (index) => {
    const values = [...inputFields];
    if (values.length > 1) {
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  const isEmailValid = (email) => {
    // Add your custom email validation pattern here
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for empty email fields and invalid email pattern
    const updatedFields = inputFields.map((field) => {
      if (!field.email.trim()) {
        return { ...field, error: "Email cannot be empty" };
      } else if (!isEmailValid(field.email)) {
        return { ...field, error: "Invalid email format" };
      }
      return { ...field, error: false };
    });

    setInputFields(updatedFields);

    // If there are errors, prevent form submission
    if (updatedFields.some((field) => field.error)) {
      return;
    }

    const emailArray = updatedFields.map((item) => item.email);
    const data = {
      portfolio_id: storedPorfolioId,
      imemail: emailArray,
      sent_from: user?.reg_id,
    };

    try {
      setLoading(true);
      const response = await insertProjectPortfolioMember(data);
      handleClose();
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in inserting portfolio member:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container>
        {inputFields.map((inputField, index) => (
          <Grid container key={index} spacing={5}>
            <Grid item xs={10} py={2} textAlign="start">
              <TextField
                fullWidth
                name="email"
                onChange={(event) => handleInputChange(event, index)}
                placeholder="Enter email to invite portfolio member..."
                variant="outlined"
                error={inputField.error}
                helperText={inputField.error}
              />
            </Grid>
            <Grid item xs={2} py={2}>
              <Stack direction="row" justifyContent="end" alignItems="center">
                <IconButton onClick={handleAddClick}>
                  <AddCircleRoundedIcon />
                </IconButton>

                {inputFields.length > 1 && (
                  <IconButton onClick={() => handleRemoveClick(index)}>
                    <RemoveCircleRoundedIcon />
                  </IconButton>
                )}
              </Stack>
            </Grid>
          </Grid>
        ))}

        <Grid item xs={12} sm={12} py={1} textAlign="end">
          <Button
            onClick={handleClose}
            size="small"
            variant="contained"
            sx={{
              mr: 1,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.light,
              "&:hover": { backgroundColor: theme.palette.secondary.dark },
            }}>
            Close
          </Button>
          <Button size="small" type="submit" variant="contained">
            {loading ? <CircularLoader /> : "Add"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

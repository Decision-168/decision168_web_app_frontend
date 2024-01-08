/* eslint-disable react/prop-types */
import { Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import CustomLabelTextField from "./../../common/CustomLabelTextField";
import { globalValidations } from "./../../../../utils/GlobalValidation";
import CustomMultilineTextField from "./../../common/CustomMultilineTextField";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../redux/action/modalSlice";
import { addQuote } from "../../../../api/super-admin-modules/quotesModule";
import { toast } from "react-toastify";

export default function AddQuoteForm({ editMode }) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  // const onSubmit = (formData) => {
  //   alert(JSON.stringify(formData));
  // };

  const onSubmit = async (formData) => {
    try {
      const response = await addQuote(formData);
      toast.success(response.message);
    } catch (error) {
      toast.error(`${error.response?.data?.error}`);
    } finally {
      dispatch(closeModal());
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12} px="20px">
        <CustomLabelTextField
          label="Author"
          labelColor={theme.palette.primary.main}
          name="writer"
          required={true}
          placeholder="Enter Author Name..."
          register={register}
          errors={errors}
          validation={globalValidations.authorName} // Pass the validation rules as a prop
        />
      </Grid>
      <CustomMultilineTextField
        label="Quote"
        labelColor={theme.palette.primary.main}
        name="quote"
        required={true}
        placeholder="Enter Quote..."
        register={register}
        errors={errors}
        validation={globalValidations.quote} // Pass the validation rules as a prop
      />

      <Box textAlign="right" padding="0 20px 20px">
        <Button size="small" type="button" variant="contained" color="secondary" onClick={() => dispatch(closeModal())} sx={{ mr: 1, color: "#fff" }}>
          Close
        </Button>
        <Button size="small" type="submit" variant="contained">
          {editMode ? "Save Changes" : "Add"}
        </Button>
      </Box>
    </Box>
  );
}

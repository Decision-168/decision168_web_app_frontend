/* eslint-disable react/prop-types */
import { Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "./../../../../common/CustomLabelTextField";
import { globalValidations } from "./../../../../../utils/GlobalValidation";
import CustomMultilineTextField from "./../../../../common/CustomMultilineTextField";
import { closeModal } from "../../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";

export default function AddEditCategoryForm({ editMode }) {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} py={2} borderTop="1px solid #dadada">
      <Grid item xs={12} px="20px">
        <CustomLabelTextField
          label="Title"
          labelColor=""
          name="Title"
          required={true}
          placeholder="Enter Title..."
          register={register}
          errors={errors}
          validation={globalValidations.title} // Pass the validation rules as a prop
        />
      </Grid>
      <CustomMultilineTextField
        label="Description"
        labelColor=""
        name="Description"
        required={true}
        placeholder="Enter Description..."
        register={register}
        errors={errors}
        validation={globalValidations.description} // Pass the validation rules as a prop
      />

      <Box textAlign="right" padding="16px 20px 0" borderTop="1px solid #dadada">
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

import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { globalValidations } from "../../../utils/GlobalValidation";
import CustomLabelTextArea from "../../common/CustomLabelTextArea";
import { useTheme } from "@mui/material/styles";
import CustomMultilineTextField from "../../common/CustomMultilineTextField";

export default function QuoteForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h6" variant="h6" color={theme.palette.primary.main} mb={4}>
        Submit A Quote
      </Typography>

      <CustomLabelTextField
        label="Author"
        labelColor={theme.palette.primary.main}
        name="AuthorName"
        required={true}
        placeholder="Enter Author Name..."
        register={register}
        errors={errors}
        validation={globalValidations.authorName} // Pass the validation rules as a prop
      />

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

      <Box textAlign="left" >
        <Button size="small" type="submit" variant="contained" sx={{ mr: 1 }}>
          Send Request
        </Button>
      </Box>
    </Box>
  );
}

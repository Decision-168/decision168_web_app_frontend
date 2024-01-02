import { useState } from "react";
import { Box, Button, Stack, InputLabel, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import CustomSelect from "../../../common/CustomSelect";
import { closeModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";

const items = [
  { value: "solo", text: "Solo", selected: true },
  { value: "professional", text: "Professional", selected: false },
  { value: "business", text: "Business", selected: false },
  { value: "enterprise", text: "Enterprise", selected: false },
];

export default function UploadAdForm() {
  const [value, setValue] = useState("solo");
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} borderTop="1px solid #dadada">
      <Grid item xs={12} pt={2} px={2}>
        <Stack direction={"column"} spacing={1}>
          <InputLabel sx={{ fontSize: "14px", textAlign: "left" }}>
            Image
            <span style={{ color: theme.palette.error.main }}> * (Size : 500px x 60px)</span>
          </InputLabel>
          <TextField type="file" fullWidth inputProps={{ accept: "image/*" }} {...register("File", { required: true })} />
        </Stack>
      </Grid>
      {errors.File && <span style={{ color: theme.palette.error.main }}>Please select a File!</span>}

      <Grid item xs={12} pt={2} px={2}>
        <CustomSelect items={items} label="Link Package" labelColor="" required={true} handleChange={handleChange} value={value} />
      </Grid>

      <Box textAlign="right" padding="20px 20px">
        <Button size="small" type="button" variant="contained" color="secondary" onClick={() => dispatch(closeModal())} sx={{ mr: 1, color: "#fff" }}>
          Close
        </Button>
        <Button size="small" type="submit" variant="contained">
          Add
        </Button>
      </Box>
    </Box>
  );
}

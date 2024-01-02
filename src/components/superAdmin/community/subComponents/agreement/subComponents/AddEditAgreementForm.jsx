/* eslint-disable react/prop-types */
import { Box, Button, Grid, InputLabel, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "./../../../../common/CustomLabelTextField";
import { globalValidations } from "./../../../../../utils/GlobalValidation";
import { closeModal } from "../../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function AddEditAgreementForm({ editMode }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const editorOptions = {
    height: 200,
    buttonList: [
      ["undo", "redo"],
      ["bold", "underline", "italic", "strike", "font", "fontSize"],
      ["removeFormat", "link"],
      ["fontColor", "hiliteColor"],
      ["align", "horizontalRule", "list"],
      ["fullScreen", "showBlocks", "codeView"],
      ["preview", "print"],
    ],
    font: [
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
      "Comic Sans MS",
      "Courier New",
      "Impact",
      "Georgia",
      "Tahoma",
      "Trebuchet MS",
      "Verdana",
      "Logical",
      "Salesforce Sans",
      "Garamond",
      "Times New Roman",
    ],
    fontSize: [12, 14, 16, 18, 20],
    colorList: [
      ["#828282", "#FF5400", "#676464", "#F1F2F4", "#FF9B00", "#F00", "#fa6e30", "#000", "#FF6600", "#0099FF", "#74CC6D", "#FF9900", "#CCCCCC"],
    ],
  };

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
      <Grid item xs={12} px="20px" textAlign={"left"} py={1.5}>
        <InputLabel sx={{ fontSize: "14px", whiteSpace: "normal", mb: 1 }}>
          Description
          <span style={{ color: theme.palette.error.main }}> *</span>
        </InputLabel>
        <SunEditor
          height="280px"
          setDefaultStyle="font-family: Roboto; font-size: 16px"
          placeholder="Enter Description..."
          setOptions={editorOptions}
        />
      </Grid>

      <Box textAlign="right" padding="20px 20px 0" borderTop="1px solid #dadada">
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

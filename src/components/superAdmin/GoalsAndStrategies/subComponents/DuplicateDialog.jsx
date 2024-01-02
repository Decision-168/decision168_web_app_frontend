import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "./CustomLabelTextField";
import Duration from "./Duration";
import { globalValidations } from "../../../utils/GlobalValidation";
import TabSection from "../goals-overview/subComponents/GoalTabSection";
const DuplicateDialog = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      <DialogContent dividers>
        <Box
          sx={{ flexGrow: 1, width: "100%", background: "white", p: 2 }}
          mb={2}
        >
          <Grid container spacing={2}>
            <CustomLabelTextField
              label="Objective/Goal"
              name="Objective"
              required={true}
              placeholder="Enter Objective/Goal..."
              register={register}
              errors={errors}
              validation={globalValidations.Objective}
            />
            <Duration label="Duration " labelColor="" required={true} />
            <Grid item xs={12}>
              <Box p={2} sx={{ background: "#f5f5f5" }}>
                <Typography
                  sx={{ fontSize: 15, fontWeight: "600", textAlign: "start" }}
                >
                  Import Options
                </Typography>
                <TabSection />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="small">
          Duplicate
        </Button>
      </DialogActions>
    </>
  );
};

export default DuplicateDialog;

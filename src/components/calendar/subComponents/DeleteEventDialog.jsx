import React from "react";
import { FormControlLabel, Radio, RadioGroup, Typography, Box, Grid } from "@mui/material";
import SecondaryButton from "../../common/SecondaryButton";
import PrimaryButton from "../../common/PrimaryButton";
import CustomDialog from "../../common/CustomDialog";
import { useTheme } from "@mui/material/styles";

export default function DeleteEventDialog({ type, setDeleteDialogOpen, isDeleteDialogOpen }) {
  const theme = useTheme();

  const handleClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    alert("Deleted");
    setDeleteDialogOpen(false);
  };

  return (
    <CustomDialog handleClose={() => setDeleteDialogOpen(false)} open={isDeleteDialogOpen} modalTitle={`Delete ${type}`} modalSize="xs">
      <Box sx={{ minHeight: "100px" }}>
        <RadioGroup>
          <FormControlLabel
            value="deleteOnlyThis"
            control={<Radio size="small" />}
            label={
              <Typography component="h4" sx={{ fontSize: "12px", fontWeight: "400", color: theme.palette.secondary.main }}>
                Delete only this !
              </Typography>
            }
          />
        </RadioGroup>
      </Box>

      {/* Dialog Actions */}
      <Grid container spacing={1} justifyContent={"end"}>
        <Grid item>
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
        </Grid>
        <Grid item>
          <PrimaryButton onClick={handleDelete}>Delete</PrimaryButton>
        </Grid>
      </Grid>
    </CustomDialog>
  );
}

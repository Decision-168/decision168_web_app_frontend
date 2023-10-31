import { Paper, Grid, Typography, IconButton, Box, Divider, Stack, ButtonBase } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import LockIcon from "@mui/icons-material/Lock";
import AssignmentIcon from "@mui/icons-material/Assignment";
import React from "react";
import { useTheme } from "@mui/material/styles";
import CustomDailog from "../../common/CustomDailog";
import ChangePasswordForm from "./ChangePasswordForm";
import PlanTable from "./PlanTable";

export default function ViewCard() {
  const theme = useTheme();
  const [selectedView, setSelectedView] = React.useState("grid");

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  //Change password Dailog code
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = React.useState(false);

  const handleOpenChangePasswordDailog = () => {
    setOpenChangePasswordDialog(true);
  };
  const handleCloseChangePasswordDailog = () => {
    setOpenChangePasswordDialog(false);
  };

  //Plan  Dailog code
  const [openPlanDialog, setOpenPlanDialog] = React.useState(false);

  const handleOpenPlanDailog = () => {
    setOpenPlanDialog(true);
  };
  const handleClosePlanDailog = () => {
    setOpenPlanDialog(false);
  };

  return (
    <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.primary.main}` }}>
      <Grid container>
        <Grid item xs={12} p={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" p={1}>
            <Typography variant="subtitle2">View :</Typography>

            <Box>
              <IconButton onClick={() => handleViewChange("list")} sx={{ backgroundColor: selectedView === "list" ? theme.palette.primary.main : "transparent", marginRight: 2 }}>
                <ViewListIcon />
              </IconButton>
              <IconButton onClick={() => handleViewChange("grid")} sx={{ backgroundColor: selectedView === "grid" ? theme.palette.primary.main : "transparent" }}>
                <GridViewIcon />
              </IconButton>
            </Box>
          </Stack>

          <Divider />

          <Box py={1}>
            <ButtonBase onClick={handleOpenChangePasswordDailog} sx={{ width: "100%", display: "flex", justifyContent: "left", alignItems: "center" }}>
              <IconButton>
                <LockIcon />
              </IconButton>
              <Typography variant="subtitle2">Change Password</Typography>
            </ButtonBase>

            <CustomDailog handleClose={handleCloseChangePasswordDailog} open={openChangePasswordDialog} modalTitle="Change Password" showModalButton={false} modalSize="xs">
              <ChangePasswordForm handleClose={handleCloseChangePasswordDailog} />
            </CustomDailog>
          </Box>

          <Divider />

          <Box py={1}>
            <ButtonBase onClick={handleOpenPlanDailog} sx={{ width: "100%", display: "flex", justifyContent: "left", alignItems: "center" }}>
              <IconButton>
                <AssignmentIcon />
              </IconButton>
              <Typography variant="subtitle2">My Plan</Typography>
            </ButtonBase>

            <CustomDailog handleClose={handleClosePlanDailog} open={openPlanDialog} modalTitle="My Plan Details" showModalButton={false} modalSize="md">
              <PlanTable />
            </CustomDailog>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

import React, { memo, useState } from "react";
import {
  Grid,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from "@mui/material";
import {
  AssignmentTurnedInOutlined,
  VisibilityOutlined,
  ExpandMore,
} from "@mui/icons-material";
import ViewProjectPopup from "../../../subComponents/ViewProjectPopup";
import CustomDialog from "../../../../common/CustomDialog";
import { useNavigate } from "react-router";
import LinearProgressWithLabel from "../../../../common/LinearProgressWithLabel";

const KPIChildAccordion = ({ project }) => {
  const [openProject, setOpenProject] = useState(false);
  const navigate = useNavigate();
  const handleProjectClose = () => {
    setOpenProject(false);
  };
  const handleProjectOpen = () => {
    setOpenProject(true);
  };
  const handleViewTasks = () => {
    navigate("/project-tasks-list");
  };
  return (
    <Accordion elevation={0} sx={{ border: "1px solid #f3f3f3" }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ bgcolor: "#f3f3f3" }}
      >
        <Typography sx={{ fontSize: 13, display: "inline", fontWeight: "700" }}>
          PROJECT:
          <Typography
            sx={{
              fontSize: 13,
              mx: 1,

              display: "inline",
            }}
          >
            {project.pname}
          </Typography>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          p={1}
          spacing={1}
          sx={{ borderBottom: "1px solid #f5f5f5" }}
        >
          <Grid item xs={7} textAlign={"left"}>
            <Typography sx={{ fontSize: 12 }}>
              {project?.pdes ? project?.pdes : "No Description!"}
            </Typography>
          </Grid>
          <Grid xs={3} alignSelf={"center"}>
            <LinearProgressWithLabel value={project?.progressRes} />
          </Grid>
          <Grid
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Tooltip title="View All Tasks" placement="top">
              <IconButton
                aria-label="view"
                size="small"
                onClick={handleViewTasks}
              >
                <AssignmentTurnedInOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Preview Project" placement="top">
              <IconButton
                aria-label="view"
                size="small"
                onClick={handleProjectOpen}
              >
                <VisibilityOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </AccordionDetails>
      <CustomDialog
        handleClose={handleProjectClose}
        open={openProject}
        modalTitle="Dashboard Module"
        redirectPath={`/projects-overview/${project?.pid}`}
        showModalButton={true}
        modalSize="md"
      >
        <ViewProjectPopup pid={project?.pid} refreshData={project} />
      </CustomDialog>
    </Accordion>
  );
};
export default memo(KPIChildAccordion);

import { Box, Button, Grid, Typography } from "@mui/material";
import React, { Fragment, memo, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import ProjectAccordion from "./ProjectAccordion";
import { Add } from "@mui/icons-material";
import CustomSearchField from "../../../common/CustomSearchField";
import ReduxDialog from "../../../common/ReduxDialog";
import CreateProject from "../../../project/Dialogs/CreateProject";
import { openModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import { getStrategyDetail } from "../../../../api/modules/goalkpiModule";
const ProjectSection = ({kpi_id}) => {
    const dispatch = useDispatch();

    const [kpiProDetails, setkpiProDetails] = useState([]);
    const [goalId, setGoalId] = useState(null);

    useEffect(() => {
      const fetchAllData = async () => {
        try {
          const response = await getStrategyDetail(kpi_id);
          setkpiProDetails(response.projectRes);
          setGoalId(response.goalId);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchAllData();
    }, [kpi_id]);

  return (
    <PerfectScrollbar>
      <Box
        sx={{
          width: "100%",
          background: "white",
          p: 2,
          borderRadius: 1,
        }}
        mb={2}
      >
        <Grid container>
          <Grid item xs={8} alignSelf={"center"}>
            <Typography
              sx={{
                color: "#495057",
                fontSize: 15,
                fontWeight: "600",
                ml: 0.5,
              }}
            >
              Projects
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <CustomSearchField />
          </Grid>
          <Grid item xs={12} mt={2}>
            {kpiProDetails?.map((item, index) => {
              return (
                <Fragment key={index}>
                  <ProjectAccordion project={item}/>
                </Fragment>
              );
            })}
          </Grid>
          <Box mt={1} textAlign={"start"}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Add />}
              onClick={() => dispatch(openModal("create-project"))}
            >
              Add Project
            </Button>
          </Box>
        </Grid>
        <ReduxDialog
          value="create-project"
          modalTitle="Create New Project"
          showModalButton={false}
          modalSize="md"
        >
          <CreateProject flag="add" gid={goalId} sid={kpi_id} passPID={"0"}/>
        </ReduxDialog>
      </Box>
    </PerfectScrollbar>
  );
};

export default memo(ProjectSection);

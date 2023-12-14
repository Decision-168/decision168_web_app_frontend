import { Box, Button, Grid, Typography } from "@mui/material";
import React, { Fragment, memo, useEffect, useState } from "react";
import KPIAccordion from "./subComponents/KPIAccordion";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Add } from "@mui/icons-material";
import ReduxDialog from "../../../common/ReduxDialog";
import { openModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import KPIs from "../../portfolio-goals/create-goals/subComponents/KPIs";
import CustomSearchField from "../../../common/CustomSearchField";
import { getGoalsAllStrategiesList } from "../../../../api/modules/goalkpiModule";
const KPISection = ({goalID}) => {
  
  const [Goalkpidetails, setGoalkpidetails] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await getGoalsAllStrategiesList(goalID); 
        setGoalkpidetails(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllData();
  }, []);

  const [inputFields, setInputFields] = useState([]);

  const handleAddClick = () => {
    setInputFields([...inputFields, { KPI: "", Description: "" }]);
  };
  const dispatch = useDispatch();
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
              KPIs
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <CustomSearchField />
          </Grid>
          <Grid item xs={12} mt={2}>
            {Goalkpidetails.map((item, index) => {
              return (
                <Fragment key={index}>
                  <KPIAccordion kpi={item}/>
                </Fragment>
              );
            })}
          </Grid>
          <Box mt={1} textAlign={"start"}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Add />}
              onClick={() => dispatch(openModal("create-kpis"))}
            >
              Add KPIs
            </Button>
          </Box>
        </Grid>
        <ReduxDialog
          value="create-kpis"
          modalTitle="Add KPIs"
          showModalButton={false}
          modalSize="sm"
        >
          <KPIs
            individual={true}
            inputFields={inputFields}
            setInputFields={setInputFields}
            handleAddClick={handleAddClick}
          />
        </ReduxDialog>
      </Box>
    </PerfectScrollbar>
  );
};

export default memo(KPISection);

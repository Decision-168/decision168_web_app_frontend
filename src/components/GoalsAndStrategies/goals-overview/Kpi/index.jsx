import { Box, Button, Grid, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import CustomSearchField from "../../subComponents/CustomSearchField";
import KPIAccordion from "./subComponents/KPIAccordion";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Add } from "@mui/icons-material";
import ReduxDialog from "../../../common/ReduxDialog";
import { openModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import KPIs from "../../portfolio-goals/create-goals/subComponents/KPIs";
const KPISection = () => {
  const data = [1, 2];
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
            {data.map((item, index) => {
              return (
                <Fragment key={index}>
                  <KPIAccordion />
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

export default KPISection;

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
import { SearchWithFuse } from "../../../../helpers/SearchWithFuse";
const KPISection = ({ goalID }) => {
  const [Goalkpidetails, setGoalkpidetails] = useState([]);
  const [getGoalInfo, setGoalInfo] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await getGoalsAllStrategiesList(goalID);
        console.log(response);
        setGoalInfo(response.goalRes);
        setGoalkpidetails(response.listResults);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllData();
  }, [goalID]);

  const [inputFields, setInputFields] = useState([{ sname: "", sdes: "" }]);

  const handleAddClick = () => {
    setInputFields([...inputFields, { sname: "", sdes: "" }]);
  };
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const newResults = SearchWithFuse(["sname"], query, Goalkpidetails);

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
          <Grid item xs={12} sm={6} md={8} lg={8} alignSelf={"center"}>
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
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <CustomSearchField query={query} setQuery={setQuery} />
          </Grid>
          <Grid item xs={12} mt={2}>
            {newResults?.map((item, index) => {
              return (
                <Fragment key={index}>
                  <KPIAccordion kpi={item} />
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
            passGID={getGoalInfo?.gid}
            passGDEPT={getGoalInfo?.gdept}
          />
        </ReduxDialog>
      </Box>
    </PerfectScrollbar>
  );
};

export default memo(KPISection);

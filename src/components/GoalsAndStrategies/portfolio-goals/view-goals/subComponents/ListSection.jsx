// ListSection.js
import React, { lazy, memo, useEffect, useMemo, useState } from "react";
import { Box, Grid } from "@mui/material";
import { selectUserDetails } from "../../../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import { getAllGoalList } from "../../../../../api/modules/goalkpiModule";
const GoalsAndStrategiesTable = lazy(() => import("./GoalsAndStrategiesTable"));

const ListSection = ({ handleGoalOpen, handlePendingGoalOpen, value }) => {
  console.log(value);
  const user = useSelector(selectUserDetails);
  const id = user?.reg_id;

  const [AllGoalData, setAllGoalData] = useState([]);


  //console.log(AllGoalData);
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await getAllGoalList("1", "2");
        console.log(response.acceptedData);
        setAllGoalData(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllData();
  }, []);


  const tableData = {
    all: [
      { title: "Created Goals", data: AllGoalData?.createData },
      { title: "Accepted Goals", data: AllGoalData?.acceptedData },
      { title: "Pending Requests", data: AllGoalData?.pendingRequest },
      { title: "More Info Requests", data: AllGoalData?.moreInfoRequest },
    ],
    "created-goals": [{ title: "Created Goals", data: AllGoalData.createData }],
    "accepted-goals": [{ title: "Accepted Goals", data: AllGoalData.acceptedData }],
    "pending-requests": [{ title: "Pending Requests", data: AllGoalData.pendingRequest }],
    "more-info-requests": [
      { title: "More Info Requests", data: AllGoalData.moreInfoRequest },
    ],
  };

  //console.log(tableData["accepted-goals"][0]);

  const tablesToRender = tableData[value][0] || [];
  console.log(tablesToRender);

  return (
    <Box sx={{ flexGrow: 1 }} mb={2} mt={2}>
      {/* <Grid container spacing={4}>
        {tablesToRender?.map((table, index) => (
          <Grid item xs={12} lg={12} key={index}>
            <GoalsAndStrategiesTable
              title={table[0]?.title}
              handleOpen={handleGoalOpen}
              handlePendingGoalOpen={handlePendingGoalOpen}
              data={table[0]?.data}
            />
          </Grid>
        ))}
      </Grid> */}
    </Box>
  );
};

export default memo(ListSection);

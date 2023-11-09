import React, { lazy, memo } from "react";
import { Box, Grid } from "@mui/material";
const FilterTable = lazy(() => import("./FilterTable"));
import {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6,
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
} from "../../../helpers/tableData";

const tableData = {
  "all": [
    {
      data: data1,
      columns: columns1,
    },
  ],
  "goal": [
    {
      data: data2,
      columns: columns2,
    },
  ],
  "kpi": [
    {
      data: data3,
      columns: columns3,
    },
  ],
  "project": [
    {
      data: data4,
      columns: columns4,
    },
  ],
  "task": [
    {
      data: data5,
      columns: columns5,
    },
  ],
  "content": [
    {
      data: data6,
      columns: columns6,
    },
  ],
};

const TrashData = ({ value }) => {
  const tablesToRender = tableData[value] || [];
  return (
    <Box sx={{ flexGrow: 1 }} mb={2} mt={2}>
      <Grid container spacing={4}>
        {tablesToRender.map((table, index) => (
          <Grid item xs={12} lg={12} key={index}>
            <FilterTable
              array_data={table.data}
              array_columns={table.columns}
              value={value}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default memo(TrashData);
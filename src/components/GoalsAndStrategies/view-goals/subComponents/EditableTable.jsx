import { Avatar, Box, Paper, Typography } from "@mui/material";
import MaterialTable from "material-table";
import { memo, useState } from "react";

const EditableTable = ({ tableTile }) => {
  const [columns, setColumns] = useState([
    {
      title: "Goals",
      field: "goals",
      width: 150,
      editable: "always",
      render: (rawdata, index) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={rawdata.imageUrl}
            style={{ width: 40, borderRadius: "50%" }}
            alt="Avatar"
          />
          <Typography style={{ marginLeft: 10 }}>{rawdata.goals}</Typography>
        </Box>
      ),
    },
    {
      title: "Progress",
      field: "progress",
      width: 150,
      editable: "never",
    },
    {
      title: "Start Date",
      field: "startDate",
      width: 150,
      editable: "never",
    },
    {
      title: "End Date",
      field: "endDate",
      width: 150,
      editable: "never",
    },
  ]);

  const [data, setData] = useState([
    {
      imageUrl: "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4",
      goals: "XYZ Goal",
      progress: "Baran",
      startDate: "2023-02-15",
      endDate: "2023-04-30",
    },
    {
      imageUrl: "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4",
      goals: "Zerya Betül",
      progress: "Baran",
      startDate: "2023-02-15",
      endDate: "2023-04-30",
    },
  ]);

  return (
    <MaterialTable
      title={tableTile}
      columns={columns}
      data={data}
      components={{
        Container: (props) => (
          <Paper {...props} elevation={0} sx={{p:2}} />
        ),
      }}
      cellEditable={{
        cellStyle: {},
        onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
          return new Promise((resolve, reject) => {
            console.log("newValue: " + newValue);
            setTimeout(resolve, 4000);
          });
        },
      }}
    />
  );
};

export default memo(EditableTable);

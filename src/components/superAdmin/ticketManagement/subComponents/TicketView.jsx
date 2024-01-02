/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import AllTicketsTable from "./ReactTable/AllTicketsTable";
import { getAllTickets } from "./../../../../api/super-admin-modules/ticketManagementModule";

const TicketView = ({ value }) => {
  const [allTicketsData, setAllTicketsData] = useState([]);

  // get ticket list
  const fetchAllTickets = async () => {
    try {
      const response = await getAllTickets();
      setAllTicketsData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  const tableData = {
    all: [{ title: "All", data: allTicketsData }],
    open: [
      {
        title: "Open",
        data: allTicketsData?.filter((i) => i.status === "open"),
      },
    ],
    assigned: [
      {
        title: "Assigned",
        data: allTicketsData?.filter((i) => i.status === "assigned"),
      },
    ],
    in_progress: [
      {
        title: "In Progress",
        data: allTicketsData?.filter((i) => i.status === "in progress"),
      },
    ],
    in_review: [
      {
        title: "In Review",
        data: allTicketsData?.filter((i) => i.status === "in review"),
      },
    ],
    pending: [
      {
        title: "Pending",
        data: allTicketsData?.filter((i) => i.status === "pending"),
      },
    ],
    resolved: [
      {
        title: "Resolved",
        data: allTicketsData?.filter((i) => i.status === "resolved"),
      },
    ],
    closed: [
      {
        title: "Closed",
        data: allTicketsData?.filter((i) => i.status === "closed"),
      },
    ],
    cancelled: [
      {
        title: "Cancelled",
        data: allTicketsData?.filter((i) => i.status === "cancelled"),
      },
    ],
  };

  const tablesToRender = tableData[value] || [];
  return (
    <Box sx={{ flexGrow: 1 }} mb={2} mt={2}>
      <Grid container spacing={4}>
        {tablesToRender.map((table, ind) => (
          <Grid item xs={12} lg={12} key={ind}>
            <AllTicketsTable title={table.title} data={table.data} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default memo(TicketView);

import { useCallback, useState } from "react";
import { Box, Grid } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import CustomFilter from "../common/CustomFilter";
import TicketView from "./subComponents/TicketView";

const filterOption = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "assigned", label: "Assigned" },
  { value: "in_progress", label: "In Progress" },
  { value: "in_review", label: "In Review" },
  { value: "pending", label: "Pending" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
  { value: "cancelled", label: "Cancelled" },
];

const Index = () => {
  const [value, setValue] = useState("all");

  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} mt="-20px" mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12} mb={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}>
            <BasicBreadcrumbs currentPage="ticket management" />
            <CustomFilter value={value} handleChange={handleChangeRadio} filterOption={filterOption} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <TicketView value={value} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Index;

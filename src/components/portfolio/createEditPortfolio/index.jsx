import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import CompanyForm from "./subComponents/CompanyForm";
import IndividualForm from "./subComponents/IndividualForm";
import CustomSelect from "../../common/CustomSelect";
import { useLocation } from "react-router-dom";

const items = [
  { value: "company", text: "Company", selected: true },
  { value: "individual", text: "Individual", selected: false },
];

export default function CreateEditPortfolio() {
  const [value, setValue] = React.useState("company");
  const location = useLocation();
  const isEditPath = location.pathname === "/portfolio-edit";

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage={isEditPath ? "Edit" : "Create"} showBackButton={true} />

      <Paper elevation={0}>
        <Grid container p={2}>
          <Grid item xs={12} sm={4} px={2} py={1}>
            <CustomSelect items={items} label="Portfolio Type" labelColor="" required={true} handleChange={handleChange} value={value} />
          </Grid>

          <Grid item xs={12}>
            {value === "company" ? <CompanyForm isEditPath={isEditPath} /> : <IndividualForm isEditPath={isEditPath} />}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

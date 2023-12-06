import React, { useEffect } from "react";
import { Box, Grid, Paper } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import CompanyForm from "./subComponents/CompanyForm";
import IndividualForm from "./subComponents/IndividualForm";
import CustomSelect from "../../common/CustomSelect";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getPortfolioDeparmentsAsync,
  selectPorfolioDepartments,
  selectPorfolioDetails,
} from "../../../redux/action/portfolioSlice";

const items = [
  { value: "company", text: "Company", selected: true },
  { value: "individual", text: "Individual", selected: false },
];

export default function CreateEditPortfolio() {
  const [value, setValue] = React.useState("company");
  const details = useSelector(selectPorfolioDetails);
  const { id } = useParams();
  const isEditPath = !!id; // Check if id is defined or not
  const departments = useSelector(selectPorfolioDepartments);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if(details?.portfolio_user){
      setValue(details?.portfolio_user);
    }else{
      setValue("company");
    }
  
  }, [isEditPath]);

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage={isEditPath ? "Edit" : "Create"} showBackButton={true} />

      <Paper elevation={0}>
        <Grid container p={2}>
          <Grid item xs={12} sm={4} px={2} py={1}>
            <CustomSelect
              items={items}
              label="Portfolio Type"
              labelColor=""
              required={true}
              handleChange={handleChange}
              value={value}
              disabled={isEditPath}
            />
          </Grid>

          <Grid item xs={12}>
            {value === "company" ? (
              <CompanyForm isEditPath={isEditPath} depts={departments ? departments : []} />
            ) : (
              <IndividualForm isEditPath={isEditPath} depts={departments ? departments : []} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

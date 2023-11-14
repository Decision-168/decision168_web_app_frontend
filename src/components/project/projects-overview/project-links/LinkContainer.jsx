import { Add } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import LinksList from "./LinksList";
import {
  CustomTabPanel,
  a11yProps,
} from "../../../GoalsAndStrategies/subComponents/style-functions";

const links = [
  {
    link: "http://localhost:5173/dashboard",
    screen: "dashboard link",
    type: "link",
  },
  {
    link: "http://localhost:5173/portfolio-view",
    screen: "portfolio link",
    type: "link",
  },
  {
    link: "http://localhost:5173/portfolio-tasks-list",
    screen: "task link",
    type: "task-link",
  },
  {
    link: "http://localhost:5173/goal-overview",
    screen: "goal-overview link",
    type: "subtask-link",
  },
];
const LinkContainer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1, width: "100%", background: "white", p: 2 }} mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            <Typography sx={{ fontSize: 15, fontWeight: "600" }}>
              Add Links
            </Typography>
            <Tooltip arrow title="Add Links" placement="right">
              <IconButton
                aria-label="add"
                color="primary"
                // onClick={() => dispatch(openModal("add-team-members"))}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Links" {...a11yProps(0)} />
                <Tab label="Tasks Links" {...a11yProps(1)} />
                <Tab label="Subtasks Links" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {links.filter((i) => i.type === "link").length > 0 ? (
                links
                  .filter((i) => i.type === "link")
                  .map((item, index) => (
                    <Fragment key={index}>
                      <LinksList item={item} />
                    </Fragment>
                  ))
              ) : (
                <Typography sx={{ fontSize: 13, color: "#74788D" }}>
                  No Links!
                </Typography>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {links.filter((i) => i.type === "task-link").length > 0 ? (
                links
                  .filter((i) => i.type === "task-link")
                  .map((item, index) => (
                    <Fragment key={index}>
                      <LinksList item={item} />
                    </Fragment>
                  ))
              ) : (
                <Typography sx={{ fontSize: 13, color: "#74788D" }}>
                  No Task Links!
                </Typography>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              {links.filter((i) => i.type === "subtask-link").length > 0 ? (
                links
                  .filter((i) => i.type === "subtask-link")
                  .map((item, index) => (
                    <Fragment key={index}>
                      <LinksList item={item} />
                    </Fragment>
                  ))
              ) : (
                <Typography sx={{ fontSize: 13, color: "#74788D" }}>
                  No Subtask Links!
                </Typography>
              )}
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LinkContainer;

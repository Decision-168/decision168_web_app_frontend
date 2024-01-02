import React, { memo, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Tabs,
  Tab,
  useTheme,
  Box,
} from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import {
  CustomTabPanel,
  a11yProps,
} from "../../../subComponents/style-functions";

const GoalTabSection = ({}) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const info = [
    {
      text: " Import all KPI Details",
      alert: "",
    },
    {
      text: " Import all Projects & Contents of KPI",
      alert: "",
    },
    {
      text: " Request Send to Project Manager",
      alert: "(* If Any!)",
    },
    {
      text: " Request Send to Team Members",
      alert: "(* Not Suggested Members!)",
    },
    {
      text: "Planned Content details with Assignee's",
      alert: "",
    },
    {
      text: " Task details with Assignee's",
      alert: "",
    },
    {
      text: "Subtask details with Assignee's",
      alert: "",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ width: "100%" }}
        >
          <Tab label="Everything" sx={{ width: "50%" }} {...a11yProps(0)} />
          <Tab label="Custom" sx={{ width: "50%" }} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {info.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <KeyboardDoubleArrowRight
                sx={{ color: "#c7df19", fontSize: 15, mr: 1 }}
              />
              <Typography sx={{ fontSize: 13, display: "inline" }}>
                {item.text}
                <Typography
                  sx={{
                    fontSize: 13,
                    mx: 1,
                    fontWeight: "700",
                    display: "inline",
                    color: "#F46A6A",
                  }}
                >
                  {item.alert}
                </Typography>
              </Typography>
            </Box>
          );
        })}
        <Typography
          sx={{
            color: "#F46A6A",
            display: "inline",
            fontSize: 13,
            mx: 1,
            fontWeight: "700",
          }}
        >
          * Any Files and Comments will not copy!
        </Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Typography sx={{ fontSize: 13, display: "inline" }}>
          Select option to import with
          <Typography
            sx={{ fontSize: 13, mx: 1, fontWeight: "700", display: "inline" }}
          >
            KPI Details:
          </Typography>
        </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="importKpi"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="importKpiProject"
              control={<Radio />}
              label="Import KPI with Projects Only"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: 13,
                fontWeight: "500",
              }}
            />
            <FormControlLabel
              value="importAll"
              control={<Radio />}
              label=" Import KPI with Projects, Planned Content, Task & Its Subtask"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: 13,
                fontWeight: "500",
              }}
            />
          </RadioGroup>
        </FormControl>
        <Typography sx={{ color: "#F46A6A", fontSize: 13 }}>
          * Request not Send to Team Member and Manager! Planned Content, Task &
          Its Subtask Without Assignee's!
        </Typography>
      </CustomTabPanel>
    </Box>
  );
};
export default memo(GoalTabSection);

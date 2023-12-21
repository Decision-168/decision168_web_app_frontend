import React, { memo } from "react";
import { FormControlLabel, Checkbox,  useTheme, Typography, Box, Tab, Tabs } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { CustomTabPanel, a11yProps } from "../../GoalsAndStrategies/subComponents/style-functions";

const DuplicateTaskTabSection = ({tabvalue, setTabValue, isChecked, setIsChecked}) => {

  const theme = useTheme();
  const info = [
    {
      text: "Import all Task Details with Assignee's",
      alert: "",
    },
    {
      text: "Its Subtask details with Assignee's",
      alert: "",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabvalue} onChange={ (event, newValue) => {
    setTabValue(newValue);
  }} aria-label="basic tabs example" sx={{ width: "100%" }}>
          <Tab label="Everything" sx={{ width: "50%" }} {...a11yProps(0)} />
          <Tab label="Custom" sx={{ width: "50%" }} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabvalue} index={0}>
        {info.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}>
              <KeyboardDoubleArrowRight sx={{ color: "#c7df19", fontSize: 15, mr: 1 }} />
              <Typography sx={{ fontSize: 13, display: "inline" }}>
                {item.text}
                <Typography
                  sx={{
                    fontSize: 13,
                    mx: 1,
                    fontWeight: "700",
                    display: "inline",
                    color: "#F46A6A",
                  }}>
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
          }}>
          &nbsp; &nbsp; * Any Files will not copy!
        </Typography>
      </CustomTabPanel>
      <CustomTabPanel value={tabvalue} index={1}>
        <Typography sx={{ fontSize: 13, display: "inline" }}>
          Select items to import with
          <Typography sx={{ fontSize: 13, mx: 1, fontWeight: "700", display: "inline" }}>Task Details</Typography>
          <Typography sx={{ color: "#F46A6A", display: "inline", fontSize: 13 }}>(* without Assignee and Subtask!):</Typography>
        </Typography>

        <FormControlLabel
          control={<Checkbox checked={isChecked === "2"}  size="small" onChange={() => setIsChecked(isChecked === "1" ? "2" : "1")} />}
          label={
            <Typography
              component="p"
              variant="caption"
              textAlign="left"
              sx={{
                color: theme.palette.secondary.main,
              }}>
              Task with Subtask
              <Box component="span" sx={{ color: "#F46A6A", fontSize: 13, px: 1 }}>
                (* without Assignee!)
              </Box>
            </Typography>
          }
        />
      </CustomTabPanel>
    </Box>
  );
};
export default memo(DuplicateTaskTabSection);

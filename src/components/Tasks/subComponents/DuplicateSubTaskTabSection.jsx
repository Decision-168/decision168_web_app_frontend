import React, { memo} from "react";
import { useTheme, Typography, Box, Tab, Tabs } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { CustomTabPanel, a11yProps } from "../../GoalsAndStrategies/subComponents/style-functions";

const DuplicateSubTaskTabSection = ({ tabvalue, setTabValue }) => {
  const theme = useTheme();
  const info = [
    {
      text: "Import all Subtask Details with Assignee's",
      alert: "(Any Files will not copy!)",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabvalue}
          onChange={(event, newValue) => {
            setTabValue(newValue);
          }}
          aria-label="basic tabs example"
          sx={{ width: "100%" }}
        >
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
              }}
            >
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
                  }}
                >
                  {item.alert}
                </Typography>
              </Typography>
            </Box>
          );
        })}
      </CustomTabPanel>
      <CustomTabPanel value={tabvalue} index={1}>
        <Typography sx={{ fontSize: 13, display: "inline" }}>
          Import all Subtask Details without Assignee's
          <Typography sx={{ color: "#F46A6A", display: "inline", fontSize: 13 }}> (*Any Files will not copy!) </Typography>
        </Typography>
      </CustomTabPanel>
    </Box>
  );
};
export default memo(DuplicateSubTaskTabSection);

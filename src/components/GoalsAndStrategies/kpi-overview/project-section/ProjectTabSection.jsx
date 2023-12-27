import React, { memo, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  useTheme,
  Tabs,
  Tab,
  Typography,
  Box,
} from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { CustomTabPanel, a11yProps } from "../../subComponents/style-functions";

const ProjectTabSection = ({ formValues, setFormValues }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    let copy_detail_val = "everything";
    let cust_project_val = "";
    if (newValue === 1) {
      copy_detail_val = "custom";
    }
    setFormValues({
      ...formValues,
      copy_detail: copy_detail_val,
      cust_project: cust_project_val,
    });
  };
  const [checked, setChecked] = useState(true);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked === true) {
      const newRadioValue = event.target.value;
      setFormValues({
        ...formValues,
        cust_project: newRadioValue,
      });
    }
  };

  const info = [
    {
      text: "Import all Project Details",
      alert: "",
    },
    {
      text: "Request Send to Project Manager",
      alert: "(* If Any!)",
    },
    {
      text: "Request Send to Team Members",
      alert: "(* Not Suggested Members!)",
    },
    {
      text: "Task details with Assignee's",
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
          Select items to import with
          <Typography
            sx={{ fontSize: 13, mx: 1, fontWeight: "700", display: "inline" }}
          >
            Project Details
          </Typography>
          <Typography
            sx={{ color: "#F46A6A", mx: 1, fontSize: 13, display: "inline" }}
          >
            (* Request not Send to Team Member and Manager!):
          </Typography>
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              value="1"
              onChange={(event) => handleCheckboxChange(event)}
            />
          }
          label="Task & Its Subtask without Assignee's"
          sx={{
            color: theme.palette.secondary.main,
            fontSize: 13,
            fontWeight: "500",
            display: "block",
          }}
        />
      </CustomTabPanel>
    </Box>
  );
};
export default memo(ProjectTabSection);

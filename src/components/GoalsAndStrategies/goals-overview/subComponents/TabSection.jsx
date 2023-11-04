import React,{memo, useState} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FormControl, FormControlLabel, Radio, RadioGroup, useTheme } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3,textAlign:'start'}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabSection=({})=> {
  const [value, setValue] = useState(0);
  const theme = useTheme()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        Everything
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Typography sx={{ fontSize: 13, display: "inline" }}>
          Select option to import with
          <Typography
            sx={{ fontSize: 13,mx:1, fontWeight: "700", display: "inline" }}
          >
            Goal Details
          </Typography>
          <Typography sx={{ color: "#F46A6A", display: "inline" }}>
            (* Request not Send to Team Member and Manager!):
          </Typography>
        </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="importKpi"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="importKpi"
              control={<Radio />}
              label="Import Only KPIs"
              sx={{ color: theme.palette.secondary.main }}
            />
            <FormControlLabel
              value="importKpiProject"
              control={<Radio />}
              label="Import KPIs with Projects Only"
              sx={{ color: theme.palette.secondary.main }}
            />
            <FormControlLabel
              value="importAll"
              control={<Radio />}
              label="Import KPIs with Projects, Planned Content, Task & Its Subtask"
              sx={{ color: theme.palette.secondary.main }}
            />
          </RadioGroup>
        </FormControl>
        <Typography>
          * Request not Send to Team Member and Manager! Planned Content, Task &
          Its Subtask Without Assignee's!
        </Typography>
      </CustomTabPanel>
    </Box>
  );
}
export default memo(TabSection)
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import OtherFeaturesData from "./OtherFeaturesData";
import PerfectScrollbar from "react-perfect-scrollbar";
import NoDataFound from "./NoDataFound";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography component="div" textAlign="left">{children}</Typography>
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

export default function Notes() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const Data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="My Notes" {...a11yProps(0)} sx={{ width: "50%", height: "55px" }} />
          <Tab label="Shared with me" {...a11yProps(1)} sx={{ width: "50%" }} />
        </Tabs>
      </Box>

      <Box sx={Data.length > 5 ? { height: "287px" } : ""}>
        <PerfectScrollbar>
          <CustomTabPanel value={value} index={0}>
            {Data.length > 0 ? Data.map((item, index) => <OtherFeaturesData key={index} text={`My Notes ${index + 1}`} type="Note" />) : <NoDataFound message="No Note" />}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {Data.length > 0 ? Data.map((item, index) => <OtherFeaturesData key={index} text={`Shared By Me ${index + 1}`} type="Note" />) : <NoDataFound message="No Shared Note" />}
          </CustomTabPanel>
        </PerfectScrollbar>
      </Box>
    </Box>
  );
}

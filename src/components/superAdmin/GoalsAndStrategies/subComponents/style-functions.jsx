import MuiAccordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { ArrowForwardIosSharp } from "@mui/icons-material";
import { Box, LinearProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";
export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:before": {
    display: "none",
    height: "0px",
  },
  borderLeft: "5px dotted #f5f5f5",
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <Box
        sx={{
          background: "#c7df19",
          borderRadius: "50%",
          width: 16,
          height: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: "slideRightToLeft 1s ease-in-out",
          "@keyframes slideRightToLeft": {
            from: {
              transform: "translateX(100%)",
            },
            to: {
              transform: "translateX(0)",
            },
          },
        }}
      >
        <ArrowForwardIosSharp sx={{ fontSize: 8, color: "white" }} />
      </Box>
    }
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  marginLeft: "-16px",
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));


export const CustomTabPanel=(props)=> {
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
        <Box sx={{  px: 1,py:2, textAlign: "start" }}>
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

export const a11yProps=(index)=> {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const LinearProgressWithLabel=(props)=> {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{ height: 10, borderRadius: 5 }}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {props?.value + "%"}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export const description = `MANAGEMENT, ACCOUNTABILITY, & PRODUCTIVITY

Use this platform to reclaim time, gain brand exposure, and to focus on what’s important for you to build an innovative business and manage your personal or professional life – or both.

The DECISION 168 team is on a mission to Empower Small Businesses, Entrepreneurs, and Individuals. Through the relationships and experience of our network, we will make a difference together.

Our goal is to help people across the world perform and function at their highest levels and utilize their unique talents, so that they may make an impact within their communities and beyond.`;

export const description1 = `Development of D168 Platform. Development is a process that creates growth, progress, positive change or the addition of physical, economic, environmental, social and demographic components.`;

export const description2 = `Account Creation Process such as
- Registration 
- Registration through Social Media 
- Login 
- Login through Social Media 
- Forgot password`;

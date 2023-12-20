import React, { memo, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ArrowForwardIosSharp, ArrowRightAlt } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../style-functions";
import moment from "moment";
import { getViewHistoryDateWiseGoal, getViewHistoryDateWiseStrategy } from "../../../../api/modules/goalkpiModule";
import { getViewHistoryDateWiseProject } from "../../../../api/modules/ProjectModule";

const RecentList = ({ data, id, type }) => {
  const inputDate = data.DateOnly;

  // Parse the input date using Moment.js
  const parsedDate = moment(inputDate);

  // Format the date as "Today - Thu, December 07, 2023"
  const formattedDate = parsedDate.calendar(null, {
    sameDay: "[Today] - ddd, MMMM DD, YYYY",
    lastDay: "[Yesterday] - ddd, MMMM DD, YYYY",
    lastWeek: "ddd, MMMM DD, YYYY",
    sameElse: "ddd, MMMM DD, YYYY",
  });
  const PassformattedDate = parsedDate.format("YYYY-MM-DD");
  const [recentHisDetails, setrecentHisDetails] = useState([]);

  if (type === "goal") {
    useEffect(() => {
      const dateParam = encodeURIComponent(PassformattedDate);
      const fetchRecentHistoryData = async () => {
        try {
          const response = await getViewHistoryDateWiseGoal(id, dateParam);
          setrecentHisDetails(response);
        } catch (error) {
          console.log(error);
        }
      };

      fetchRecentHistoryData();
    }, []);
  }
  
  if (type === "kpi") {
    useEffect(() => {
      const dateParam = encodeURIComponent(PassformattedDate);
      const fetchRecentHistoryData = async () => {
        try {
          const response = await getViewHistoryDateWiseStrategy(id, dateParam);
          setrecentHisDetails(response);
        } catch (error) {
          console.log(error);
        }
      };

      fetchRecentHistoryData();
    }, []);
  }
  
  if (type === "project") {
    useEffect(() => {
      const dateParam = encodeURIComponent(PassformattedDate);
      const fetchRecentHistoryData = async () => {
        try {
          const response = await getViewHistoryDateWiseProject(id, dateParam);
          setrecentHisDetails(response);
        } catch (error) {
          console.log(error);
        }
      };

      fetchRecentHistoryData();
    }, []);
  }

  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography sx={{ fontSize: 14, fontWeight: "600", color: "#212934" }}>
          {formattedDate}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {recentHisDetails.map((item, index) => {
          const formattedHDate = moment(item.h_date).format("HH:mm");
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  background: "white",
                  border: "1px solid #212934",
                  borderRadius: "100%",
                  p: 0.2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ArrowForwardIosSharp sx={{ fontSize: 8, color: "#212934" }} />
              </Box>
              <Typography sx={{ fontSize: 13, color: "#212934", mx: 0.5 }}>
                {formattedHDate}
              </Typography>
              <ArrowRightAlt sx={{ fontSize: 20, color: "#c7df19" }} />
              <Typography sx={{ fontSize: 13, color: "#212934", mx: 0.5 }}>
                {item.h_description}
              </Typography>
            </Box>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(RecentList);

import React, { memo, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ArrowForwardIosSharp, ArrowRightAlt } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../style-functions";
import moment from "moment";
import {
  getViewHistoryDateWiseGoal,
  getViewHistoryDateWiseStrategy,
} from "../../../../api/modules/goalkpiModule";

const HistoryList = ({ allhdata, type, id }) => {
  console.log("allhdata", allhdata);
  console.log("type", type);
  console.log("id", id);

  const allinputDate = allhdata.DateOnly;

  // Parse the input date using Moment.js
  const allparsedDate = moment(allinputDate);

  // Format the date as "Today - Thu, December 07, 2023"
  const allformattedDate = allparsedDate.calendar(null, {
    sameDay: "[Today] - ddd, MMMM DD, YYYY",
    lastDay: "[Yesterday] - ddd, MMMM DD, YYYY",
    lastWeek: "ddd, MMMM DD, YYYY",
    sameElse: "ddd, MMMM DD, YYYY",
  });

  const PassallformattedDate = allparsedDate.format("YYYY-MM-DD");
  const [allHisDetails, setallHisDetails] = useState([]);

  useEffect(() => {
    const alldateParam = encodeURIComponent(PassallformattedDate);
    const fetchAllHistoryDetails = async () => {
      try {
        let response;
        if (type === "goal") {
          response = await getViewHistoryDateWiseGoal(id, alldateParam);
        } else if (type === "kpi") {
          response = await getViewHistoryDateWiseStrategy(id, alldateParam);
        }
        setallHisDetails(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllHistoryDetails();
  }, [type, id, PassallformattedDate]);

  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography sx={{ fontSize: 14, fontWeight: "600", color: "#212934" }}>
          {allformattedDate}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {allHisDetails?.map((ohl_item, ohl_index) => {
          const formattedHDate = moment(ohl_item.h_date).format("HH:mm");
          return (
            <Box
              key={ohl_index}
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
                  borderRadius: "50%",
                  width: 14,
                  height: 14,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ArrowForwardIosSharp sx={{ fontSize: 8, color: "#212934" }} />
              </Box>
              <Typography sx={{ fontSize: 14, color: "#212934", mx: 1 }}>
                {formattedHDate}
              </Typography>
              <ArrowRightAlt sx={{ fontSize: 20, color: "#c7df19" }} />
              <Typography sx={{ fontSize: 14, color: "#212934", mx: 1 }}>
                {ohl_item.h_resource}
              </Typography>
              <ArrowRightAlt sx={{ fontSize: 20, color: "#c7df19" }} />
              <Typography sx={{ fontSize: 14, color: "#212934", mx: 1 }}>
                {ohl_item.h_description}
              </Typography>
            </Box>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(HistoryList);

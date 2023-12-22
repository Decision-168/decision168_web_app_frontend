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
import { getViewHistoryDateWiseProject } from "../../../../api/modules/ProjectModule";
import * as XLSX from "xlsx";
const HistoryList = ({ data, allhdata, type, id, name, setData }) => {
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
        setData((prevData) => [...prevData, ...response]);
        setallHisDetails(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllHistoryDetails();
  }, []);

  if (type === "project") {
    useEffect(() => {
      const dateParam = encodeURIComponent(PassformattedDate);
      const fetchAllHistoryDetails = async () => {
        try {
          const response = await getViewHistoryDateWiseProject(id, dateParam);
          setData((prevData) => [...prevData, ...response]);
          setallHisDetails(response);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAllHistoryDetails();
    }, []);
  }

  const handleExport = () => {
    const exportData = alldateParam.map((item) => ({
      Date: formatDate(item.h_date),
      Time: formatTime(item.h_date),
      Resource: item.h_resource,
      Activity: item.h_description,
    }));

    exportExcelData(exportData, `${name}.xlsx`);
  };

  const exportExcelData = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, filename);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

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

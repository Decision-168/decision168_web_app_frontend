import { Box, Button, DialogContent, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import HistoryList from "./HistoryList";

const OverallHistory = ({ allHist, name, type, id }) => {
  console.log(allHist)
  console.log(name)
  console.log(type)
  return (
    <DialogContent dividers>
      <Box
        sx={{ flexGrow: 1, width: "100%", background: "white", p: 2 }}
        mb={2}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ fontSize: 15, fontWeight: "600", color: "#212934" }}
          >
            {name}
          </Typography>
          <Button variant="contained" size="small">
            Export To Excel
          </Button>
        </Box>
        {allHist?.map((item, index) => {
          return (
            <Fragment key={index}>
              <HistoryList allhdata={item} type={type} id={id}/>
            </Fragment>
          );
        })}
      </Box>
    </DialogContent>
  );
};

export default OverallHistory;

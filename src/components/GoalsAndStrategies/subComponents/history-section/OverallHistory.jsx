import { Box, Button, DialogContent, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import HistoryList from "./HistoryList";

const OverallHistory = ({ allHist, name, type, id }) => {
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
        {allHist?.map((oh_item, oh_index) => {
          return (
            <Fragment key={oh_index}>
              <HistoryList allhdata={oh_item} type={type} id={id}/>
            </Fragment>
          );
        })}
      </Box>
    </DialogContent>
  );
};

export default OverallHistory;

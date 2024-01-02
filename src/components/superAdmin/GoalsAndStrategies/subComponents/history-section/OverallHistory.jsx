import { Box, Button, DialogContent, Typography } from "@mui/material";
import React, { Fragment } from "react";
import HistoryList from "./HistoryList";

const OverallHistory = () => {
  const data = [0, 1, 2, 3, 4, 5];
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
            KPI: ABC Strategy 3
          </Typography>
          <Button variant="contained" size="small">
            Export To Excel
          </Button>
        </Box>
        {data.map((item, index) => {
          return (
            <Fragment key={index}>
              <HistoryList />
            </Fragment>
          );
        })}
      </Box>
    </DialogContent>
  );
};

export default OverallHistory;

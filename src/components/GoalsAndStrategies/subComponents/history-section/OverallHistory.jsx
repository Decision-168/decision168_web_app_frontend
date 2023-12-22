import { Box, Button, DialogContent, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import HistoryList from "./HistoryList";

import CustomDialog from "../../../common/CustomDialog";
import ExportOptions from "./ExportOptions";

const OverallHistory = ({ allHist, name, type, id }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
          <Button variant="contained" size="small" onClick={handleOpen}>
            Export To Excel
          </Button>
        </Box>
        {allHist?.map((oh_item, oh_index) => (
          <Fragment key={oh_index}>
            <HistoryList
              allhdata={oh_item}
              type={type}
              id={id}
              name={name}
              setData={setData}
              data={data}
            />
          </Fragment>
        ))}
      </Box>
      <CustomDialog
        handleClose={handleClose}
        open={open}
        modalTitle="Select Any One Option"
        showModalButton={false}
        modalSize="sm"
      >
        <ExportOptions name={name} data={data} />
      </CustomDialog>
    </DialogContent>
  );
};

export default OverallHistory;

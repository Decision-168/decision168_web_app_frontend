import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CollapsibleRow from "./CollapsibleRow";

const ListSection = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container mt={2} sx={{ textAlign: "center" }}>
        <Grid item xs={12}>
          <CollapsibleRow />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListSection;

// <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
//   <IconButton>
//     <CommentIcon />
//   </IconButton>
//   <IconButton>
//     <AttachmentIcon />
//   </IconButton>
//   <IconButton>
//     <MoreVertIcon />
//   </IconButton>
// </Stack>;

import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dot from "../../common/Dot";

export default function KanbanColumnHeader({ status, color, count }) {
  return (
    <Box sx={{ pb: 1, borderBottom: `3px solid ${color}` }}>
      <Stack direction="row" justifyContent="left" alignItems="center" spacing={1}>
        <Dot color={color} size="10px" />
        <Typography component="h6" variant="subtitle2">
          {status}
        </Typography>
        <IconButton size="small" sx={{ width: "30px", height: "30px", backgroundColor: "#EBEBEB", display: "flex", justifyContent: "center", alignItems: "center", margin: "3px 7px" }}>
          <Typography component="h4" variant="subtitle2">
            {count}
          </Typography>
        </IconButton>
      </Stack>
    </Box>
  );
}

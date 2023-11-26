import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomLabelTextField from "../../../common/CustomLabelTextField";
import CustomMultilineTextField from "../../../common/CustomMultilineTextField";

export default function QuoteForm() {
  const theme = useTheme();

  return (
    <Box component="form" noValidate>
      <Typography component="h6" variant="h6" color={theme.palette.primary.main} mb={4}>
        Submit A Quote
      </Typography>

      <CustomLabelTextField label="Author" labelColor={theme.palette.primary.main} name="AuthorName" required={true} placeholder="Enter Author Name..." />

      <CustomMultilineTextField label="Quote" labelColor={theme.palette.primary.main} name="quote" required={true} placeholder="Enter Quote..." />

      <Box textAlign="left">
        <Button size="small" type="submit" variant="contained" sx={{ mr: 1 }}>
          Send Request
        </Button>
      </Box>
    </Box>
  );
}

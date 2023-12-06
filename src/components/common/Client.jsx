import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Client({ clientName, designation }) {
  const theme = useTheme();
  return (
    <Box>
      <Typography component="h6" variant="h6" >
        {clientName}
      </Typography>
      <Typography component="p" variant="caption" color={theme.palette.secondary.main} display="block" gutterBottom>
        {designation}
      </Typography>
    </Box>
  );
}

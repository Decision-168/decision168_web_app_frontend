import { Box, Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../redux/action/userSlice";

export default function PortfolioClient({ clientName, designation }) {
  const user = useSelector(selectUserDetails);
  const theme = useTheme();
  return (
    <Box>
      <Typography component="h6" variant="h6">
        {clientName ? clientName : <Skeleton variant="rounded" width={200} height={20} animation="wave" sx={{ my: 1 }} />}
      </Typography>

      {designation && (
        <Typography component="p" variant="caption" color={theme.palette.secondary.main} display="block" gutterBottom>
          {designation ? designation : <Skeleton variant="rounded" width={200} height={20} animation="wave" />}
        </Typography>
      )}
    </Box>
  );
}

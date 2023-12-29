import { Box, Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../redux/action/userSlice";

export default function Client({ clientName, designation }) {

  const user = useSelector(selectUserDetails);
  const theme = useTheme();
  return (
    <Box>
      <Typography component="h6" variant="h6">
        {user?.first_name ? `${user?.first_name} ${user?.last_name}`  : <Skeleton variant="rounded" width={200} height={20} animation="wave" sx={{ my: 1 }} />}
      </Typography>
      <Typography component="p" variant="caption" color={theme.palette.secondary.main} display="block" gutterBottom>
        {user?.designation ? user?.designation : <Skeleton variant="rounded" width={200} height={20} animation="wave"/>}
      </Typography>
    </Box>
  );
}

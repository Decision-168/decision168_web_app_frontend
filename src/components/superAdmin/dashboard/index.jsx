import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import DashboardProfileCard from './subComponents/DashboardProfileCard';

export default function Dashboard() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12} lg={8}>
            <DashboardProfileCard />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

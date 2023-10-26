import { Box, Paper, Typography, useMediaQuery, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BasicTable from "./BasicTable";

export default function PersonalInfo() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Adjust breakpoint as needed

  const data = [
    {
      label: "Full Name : ",
      value: "Arshad Khan",
    },
    {
      label: "E-mail Address : ",
      value: "arshad@oxcytech.com",
    },
  ];

  return (
    <Paper elevation={0}>
      <Box p={2}>
        <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark, fontWeight: "700" }} textAlign="left">
          Personal Information
        </Typography>
        {/* <BasicTable /> */}

        <Grid container mt={2}>
          {data.map((item, index) => (
            <Grid xs={12} item key={index}>
              <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" textAlign="left">
                    {item.label}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="caption" display="block" gutterBottom textAlign="left">
                    {item.value}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

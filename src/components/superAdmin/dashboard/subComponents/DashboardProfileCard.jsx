import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { stringAvatar } from "../../../../helpers/stringAvatar";
import { useTheme } from "@mui/material/styles";
import Client from "../../common/Client";
import CardFeatures from "../../common/CardFeatures";
import CoverImage from "../../common/CoverImage";
import { useEffect, useState } from "react";
import { getRegisteredUsersCount } from "../../../../api/super-admin-modules/dashboardModule";

export default function DashboardProfileCard() {
  const theme = useTheme();

  // get Registered Users Count
  const [registeredUsersCount, setRegisteredUsersCount] = useState(0);

  const fetchCount = async () => {
    try {
      const response = await getRegisteredUsersCount();
      setRegisteredUsersCount(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  const items = [
    {
      count: registeredUsersCount,
      label: "Registered Users",
      link: "/registered-users",
    },
  ];

  return (
    <>
      <Grid item xs={12} lg={12} mb={1}>
        <Typography
          component="h4"
          variant="subtitle2"
          sx={{
            color: theme.palette.secondary.dark,
            textTransform: "uppercase",
            fontWeight: "bold",
            mb: 2,
            fontSize: "16px",
          }}
        >
          welcome back !
        </Typography>
      </Grid>
      <Paper elevation={0}>
        <Grid container pb={2}>
          <Grid item xs={12}>
            <CoverImage />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box
              px={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                marginTop: "-50px",
              }}
            >
              <Avatar
                {...stringAvatar("Super Admin")}
                sx={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: theme.palette.primary.main,
                  border: "5px solid white",
                }}
              />
              <Client clientName="Super Admin" />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardFeatures items={items} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

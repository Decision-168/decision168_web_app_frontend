import React, { useEffect } from "react";
import { Box, Paper, Typography, Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { getPortfolioDetailsAsync, selectPorfolioDetails } from "../../../../redux/action/portfolioSlice";
import { useDispatch } from "react-redux";
import SocialMedia from "../../../common/SocialMedia";
import useCountryName from "../../../../hooks/useCountryName";

export default function PersonalInfo() {
  const theme = useTheme();
  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const details = useSelector(selectPorfolioDetails);
  const dispatch = useDispatch();
  const countryName = useCountryName(details?.country);

  const fetchPortfolioDetails = async () => {
    try {
      dispatch(getPortfolioDetailsAsync(storedPorfolioId));
    } catch (fetchError) {}
  };

  useEffect(() => {
    fetchPortfolioDetails();
  }, [storedPorfolioId]);

  return (
    <Paper elevation={0}>
      <Box p={2} textAlign="left">
        <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark, fontWeight: "700" }} textAlign="left">
          Information
        </Typography>

        {details?.about_portfolio && (
          <Box pt={1}>
            {details?.about_portfolio.split(".").map((sentence, index) => (
              <Typography key={index} component="p" variant="body2" mb={1}>
                {sentence?.trim()}.
              </Typography>
            ))}
          </Box>
        )}

        <Grid container mt={2}>
          <Grid xs={12} item>
            {details?.portfolio_user === "company" && (
              <>
                {details?.contact_fname && details?.contact_lname && (
                  <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle2" textAlign="left">
                        Contact Person Name :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        textAlign="left"
                      >
                        {details?.contact_fname}&nbsp;{details?.contact_lname}
                      </Typography>
                    </Grid>
                  </Grid>
                )}

                {details?.designation && (
                  <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle2" textAlign="left">
                        Designation :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        textAlign="left"
                      >
                        {details?.designation}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </>
            )}

            {details?.portfolio_createdby && (
              <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" textAlign="left">
                    Created By :
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="caption" display="block" gutterBottom textAlign="left">
                    {details?.portflioCreatedByName}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {details?.portfolio_user && (
              <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" textAlign="left">
                    Type :
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    textAlign="left"
                  >
                    {details?.portfolio_user}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {details?.email_address && (
              <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" textAlign="left">
                    Email Address :
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    textAlign="left"
                  >
                    {details?.email_address}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {details?.company_website && (
              <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" textAlign="left">
                    Company Website :
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    textAlign="left"
                  >
                    {details?.company_website}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {countryName && (
              <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" textAlign="left">
                    Country :
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    textAlign="left"
                  >
                    {countryName}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {details?.social_media && details?.social_media_icon && (
              <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" textAlign="left">
                    Social Media Link(s) :
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Stack direction="row" justifyContent="start" alignItems="center" spacing={1}>
                    <SocialMedia links={details?.social_media} icons={details?.social_media_icon} />
                  </Stack>
                </Grid>
              </Grid>
            )}

            {details?.departments?.length > 0 && (
              <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" textAlign="left" pb={1}>
                    Department(s) :
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                    {details?.departments?.map((department, index) => (
                      <Box
                        key={index}
                        sx={{
                          bgcolor: "#DADBDD",
                          color: "black",
                          fontSize: "12px",
                          padding: "3px 5px",
                          borderRadius: "5px",
                          mb: 1,
                          mr: 1,
                        }}
                      >
                        {department}
                      </Box>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

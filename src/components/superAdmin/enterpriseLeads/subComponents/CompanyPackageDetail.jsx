/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import { Typography } from "@mui/material";

const CompanyPackageDetail = ({ contactedCompanyDetail }) => {
  const { contactedCompanyDetailResult, companyPackageDetailResult } = contactedCompanyDetail;

  return (
    <>
      <Box px={2} pt={1} pb={5} borderTop="1px solid #dadada">
        <Grid borderBottom="2px solid #dadada" pb={4}>
          <Grid item xs={12} pt={1} display="flex" justifyContent="space-between" alignItems="center">
            <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
              <Typography fontWeight={500} fontSize="14px">
                Company Name :
              </Typography>
              <Typography fontSize="14px">{contactedCompanyDetailResult?.cc_name}</Typography>
            </Grid>
            <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
              <Typography fontWeight={500} fontSize="14px">
                Exact No of Users :
              </Typography>
              <Typography fontSize="14px">{contactedCompanyDetailResult?.cc_tusers}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} pt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
              <Typography fontWeight={500} fontSize="14px">
                Company Username :
              </Typography>
              <Typography fontSize="14px">{contactedCompanyDetailResult?.cc_username}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} pt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight={500} fontSize="14px">
              Package Name :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.pack_name}</Typography>
          </Grid>
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight={500} fontSize="14px">
              Package Validity :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.pack_validity}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} pt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight={500} fontSize="14px">
              Validity Period :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.validity_period}</Typography>
          </Grid>
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography display="flex" alignItems="center" fontWeight={500} fontSize="14px">
              Package Price{" "}
              <Typography fontWeight={500} fontSize="14px" sx={{ color: "#f46a6a", ml: "5px" }}>
                (in $)
              </Typography>{" "}
              :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.pack_price}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} pt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight={500} fontSize="14px">
              Total Portfolio :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.pack_portfolio}</Typography>
          </Grid>
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight={500} fontSize="14px">
              Total Goals :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.pack_goals}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} pt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight={500} fontSize="14px">
              Total KPIs :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.pack_goals_strategies}</Typography>
          </Grid>
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight={500} fontSize="14px">
              Total Projects :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.pack_projects}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} pt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight={500} fontSize="14px">
              Total Team Members :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.pack_team_members}</Typography>
          </Grid>
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight={500} fontSize="14px">
              Total Tasks :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.pack_tasks}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} pt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight={500} fontSize="14px">
              Total Storage :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.pack_storage}</Typography>
          </Grid>
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight={500} fontSize="14px">
              Total Content Planner :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.pack_content_planner}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} pt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Grid xs={6} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography fontWeight={500} fontSize="14px">
              Package Tagline :
            </Typography>
            <Typography fontSize="14px">{companyPackageDetailResult?.pack_tagline}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CompanyPackageDetail;

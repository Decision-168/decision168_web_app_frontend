/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import RefundButton from "../../common/RefundButton";

const PackExpiry = ({ packageExpiry }) => {
  if (packageExpiry === "free forever") {
    return <Typography fontSize="14px">Free Forever</Typography>;
  } else if (packageExpiry === "unlimited") {
    return <Typography fontSize="14px">Unlimited</Typography>;
  } else {
    const currentDate = new Date();
    const expiryDate = new Date(currentDate.getTime() + packageExpiry * 24 * 60 * 60 * 1000);

    const formattedDate = expiryDate.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return <Typography fontSize="14px">{formattedDate}</Typography>;
  }
};

const RegisteredUsersDetail = ({ userDetail }) => {
  const { specificUser, packageDetail } = userDetail;

  return (
    <>
      <Box px={2} pt={2} pb={5} borderTop="1px solid #dadada">
        <Grid boxShadow="0 12px 24px #12263f08" borderRadius="5px">
          <Grid xs={12} display="flex" flexDirection="column">
            <Grid xs={12} display={"flex"} justifyContent={"space-between"} alignItems={"flex-start"} py={1}>
              <Grid xs={12} px="2px">
                <Typography component="h6" variant="h6" fontSize="16px" fontWeight={600} textAlign="left" mb={3}>
                  Personal Information
                </Typography>
                <Grid xs={12} display="flex" textAlign="left" mx={2} borderBottom="1px solid #dadada" py="12px">
                  <Grid xs={6}>
                    <Typography fontWeight={500} fontSize="14px">
                      Full Name :
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography fontSize="14px">{`${specificUser?.first_name} ${specificUser?.middle_name} ${specificUser?.last_name}`}</Typography>
                  </Grid>
                </Grid>
                <Grid xs={12} display="flex" textAlign="left" mx={2} borderBottom="1px solid #dadada" py="12px">
                  <Grid xs={6}>
                    <Typography fontWeight={500} fontSize="14px">
                      Email Address :
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography fontSize="14px">{specificUser?.email_address}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid xs={12} textAlign={"left"}>
                <Typography component="h6" variant="h6" fontSize="16px" fontWeight={600} textAlign="left" mb={3}>
                  Platform Information
                </Typography>
                <Grid xs={12} display="flex" textAlign="left" mx={2} borderBottom="1px solid #dadada" py="12px">
                  <Grid xs={6}>
                    <Typography fontWeight={500} fontSize="14px">
                      Member Since :
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography fontSize="14px">{specificUser?.reg_date}</Typography>
                  </Grid>
                </Grid>
                <Grid xs={12} display="flex" textAlign="left" mx={2} borderBottom="1px solid #dadada" py="12px">
                  <Grid xs={6}>
                    <Typography fontWeight={500} fontSize="14px">
                      Last Login :
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography fontSize="14px">{specificUser?.last_login}</Typography>
                  </Grid>
                </Grid>
                <Grid xs={12} display="flex" textAlign="left" mx={2} borderBottom="1px solid #dadada" py="12px">
                  <Grid xs={6}>
                    <Typography fontWeight={500} fontSize="14px">
                      Account Status :
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography fontSize="14px">{specificUser?.reg_acc_status === "activated" ? "Active" : "Inactive"}</Typography>
                  </Grid>
                </Grid>
                <Grid xs={12} display="flex" textAlign="left" mx={2} borderBottom="1px solid #dadada" py="12px">
                  <Grid xs={6}>
                    <Typography fontWeight={500} fontSize="14px">
                      Package Level :
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography fontSize="14px">{packageDetail?.pack_name}</Typography>
                  </Grid>
                </Grid>
                <Grid xs={12} display="flex" textAlign="left" mx={2} borderBottom="1px solid #dadada" py="12px">
                  <Grid xs={6}>
                    <Typography fontWeight={500} fontSize="14px">
                      Package Expiry :
                    </Typography>
                  </Grid>
                  <Grid xs={6}>{<PackExpiry packageExpiry={packageDetail?.pack_validity} />}</Grid>
                </Grid>
                <Grid xs={12} display="flex" textAlign="left" mx={2} borderBottom="1px solid #dadada" py="12px">
                  <Grid xs={6}>
                    <Typography fontWeight={500} fontSize="14px">
                      Refund Package :
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography fontSize="14px">{packageDetail?.pack_name}</Typography>
                  </Grid>
                </Grid>
                <Grid xs={12} display="flex" textAlign="left" mx={2} py="12px">
                  <Grid xs={6}>
                    <Typography fontWeight={500} fontSize="14px">
                      Refund Status :
                    </Typography>
                  </Grid>
                  <Grid xs={6}>{<RefundButton refundStatus={specificUser?.refund_status} />}</Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} my={2} mx={2}>
              <Typography component="h6" variant="h6" fontSize="16px" fontWeight={600} textAlign="left" mb={3}>
                Last 5 Activities
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RegisteredUsersDetail;

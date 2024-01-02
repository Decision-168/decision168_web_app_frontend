/* eslint-disable react/prop-types */
import { Facebook, Instagram, KeyboardDoubleArrowRightRounded, LinkedIn, YouTube } from "@mui/icons-material";
import { Box, Grid, Link } from "@mui/material";
import { Typography } from "@mui/material";

// Custom component for Social medial links
const getIconComponent = (iconName) => {
  switch (iconName) {
    case "youtube":
      return YouTube;
    case "linkedin":
      return LinkedIn;
    case "instagram":
      return Instagram;
    case "facebook":
      return Facebook;
    default:
      return null;
  }
};

const SocialMediaRow = ({ socialMedia, socialMediaIcon }) => {
  // Check if socialMedia is falsy, return null
  if (!socialMedia) {
    return null;
  }

  // Split socialMediaIcon and socialMedia into arrays
  const socialMediaIcons = socialMediaIcon ? socialMediaIcon.split(",") : [];
  const socialMediaLinks = socialMedia.split(",");

  // Check if the lengths of the arrays match
  if (socialMediaIcons.length !== socialMediaLinks.length) {
    console.error("Mismatched array lengths between socialMediaIcons and socialMediaLinks");
    return null;
  }

  return socialMediaLinks.map((link, index) => {
    const iconName = socialMediaIcons[index].toLowerCase();
    const IconComponent = getIconComponent(iconName);

    // Check if IconComponent is null
    if (!IconComponent) {
      console.error(`No component found for icon name: ${iconName}`);
      return null;
    }

    const fullUrl = link.startsWith("http") ? link : `https://${link}`;

    return (
      <Link key={index} href={fullUrl} target="_blank">
        <IconComponent />
      </Link>
    );
  });
};

// Packge expiry custom component
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

const SupporterDetail = ({ detail }) => {
  const { supporterDetailResult, packageDetailResult, countryResult, lastFiveActivitiesResult } = detail;

  return (
    supporterDetailResult && (
      <>
        <Box px={2} pt={2} pb={3} borderTop="1px solid #dadada">
          <Grid container boxShadow="0 12px 24px #12263f08" borderRadius="5px">
            <Grid item xs={12} display="flex" flexDirection="column">
              <Grid item xs={12} display={"flex"} gap={3} alignItems={"flex-start"} py={1}>
                <Grid item xs={12} px="2px">
                  <Typography component="h6" variant="h6" fontSize="16px" fontWeight={600} textAlign="left" mb={1}>
                    Personal Information
                  </Typography>
                  <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                    <Grid item xs={6}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Full Name :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        fontSize="14px"
                        px={
                          2
                        }>{`${supporterDetailResult?.first_name} ${supporterDetailResult?.middle_name} ${supporterDetailResult?.last_name}`}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                    <Grid item xs={6}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Email Address :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize="14px" px={2}>
                        {supporterDetailResult.email_address}
                      </Typography>
                    </Grid>
                  </Grid>
                  {supporterDetailResult.phone_number && supporterDetailResult.phone_number != 0 && (
                    <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                      <Grid item xs={6}>
                        <Typography fontWeight={500} fontSize="14px" px={2}>
                          Mobile :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography fontSize="14px" px={2}>
                          {supporterDetailResult.phone_number}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                    <Grid item xs={6}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Company :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize="14px" px={2}>
                        {supporterDetailResult.company}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                    <Grid item xs={6}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Date of Birth :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize="14px" px={2}>
                        {new Date(supporterDetailResult.dob).toLocaleString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                    <Grid item xs={6}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Country :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize="14px" px={2}>
                        {countryResult.country_name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} display="flex" alignItems={"center"} textAlign="left" py="12px">
                    <Grid item xs={6}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Social Media Link(s) :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize="14px" px={2}>
                        <SocialMediaRow socialMedia={supporterDetailResult.social_media} socialMediaIcon={supporterDetailResult.social_media_icon} />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} textAlign={"left"} sx={{ overflowX: "auto" }}>
                  <Typography component="h6" variant="h6" fontSize="16px" fontWeight={600} textAlign="left" mb={1}>
                    Platform Information
                  </Typography>
                  <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                    <Grid item xs={4}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Member Since :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="14px" px={2}>
                        {`${supporterDetailResult.reg_date}`.slice(0, 19).replace("T", " ")}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                    <Grid item xs={4}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Last Login :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="14px" px={2}>
                        {`${supporterDetailResult.last_login}`.slice(0, 19).replace("T", " ")}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                    <Grid item xs={4}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Account Status :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="14px" px={2}>
                        {supporterDetailResult.reg_acc_status === "activated" ? "Active" : "Inactive"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                    <Grid item xs={4}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Package Level :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="14px" px={2}>
                        {packageDetailResult.pack_name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                    <Grid item xs={4}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Paid Amount (in $) :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="14px" px={2}>
                        {supporterDetailResult.paid_amount}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                    <Grid item xs={4}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Transaction ID :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography fontSize="14px" px={2}>
                        {supporterDetailResult.txn_id}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                    <Grid item xs={4}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Package Expiry :
                      </Typography>
                    </Grid>
                    <Grid item xs={8} fontSize="14px" px={2}>
                      {<PackExpiry packageExpiry={packageDetailResult.pack_validity} />}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} display="flex" textAlign="left" py="12px">
                    <Grid item xs={4}>
                      <Typography fontWeight={500} fontSize="14px" px={2}>
                        Payment Status :
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      {supporterDetailResult.payment_status === "active" ? (
                        <Typography fontSize="14px" px={2} sx={{ color: "#34c38f" }}>
                          SUCCEEDED
                        </Typography>
                      ) : (
                        <Typography fontSize="14px" px={2} color="error">
                          PENDING
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} display={"flex"} gap={4} alignItems={"flex-start"} py={1}>
                <Grid item xs={12} textAlign={"left"} px={2}>
                  <Typography component="h6" variant="h6" fontSize="16px" fontWeight={600} textAlign="left" mb={1}>
                    Expertise
                  </Typography>
                  <Grid item xs={12} textAlign="left" py="12px">
                    <Typography fontSize="14px" whiteSpace={"pre-wrap"}>
                      {supporterDetailResult.expertise}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} textAlign={"left"} px={2}>
                  <Typography component="h6" variant="h6" fontSize="16px" fontWeight={600} textAlign="left" mb={1}>
                    Last 5 Activities
                  </Typography>
                  <Grid item xs={12} textAlign="left" py="12px">
                    {lastFiveActivitiesResult &&
                      lastFiveActivitiesResult.map((activity, ind) => (
                        <Typography key={ind} fontSize="14px" display="flex" alignItems="center" textAlign="left" whiteSpace="pre-wrap" mb={3}>
                          <KeyboardDoubleArrowRightRounded color="primary" />
                          {activity.h_description}
                        </Typography>
                      ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </>
    )
  );
};

export default SupporterDetail;

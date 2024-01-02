/* eslint-disable react/prop-types */
import { Facebook, Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import { Box, Chip, Grid, Link } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getDecisionMakerCategoryDetail } from "../../../api/modules/communityModule";

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

// Custom component for categories
const CategoryChip = ({ catIds }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (catIds) {
        const expertCategories = catIds.split(",");

        const categoryDetails = await Promise.all(
          expertCategories.map(async (ec) => {
            const category = await getDecisionMakerCategoryDetail(ec);
            return category.title;
          })
        );

        setCategories(categoryDetails);
      }
    };

    fetchData();
  }, [catIds]);

  return categories.map((category, index) => (
    <Chip
      key={index}
      label={category}
      size="small"
      sx={{
        "& .MuiChip-label": {
          display: "block",
          whiteSpace: "normal",
          paddingInline: "4px",
        },
        height: "auto",
        fontSize: "10px",
        borderRadius: "5px",
        background: "#343a402e",
        color: "#343a40",
        mr: "5px",
      }}
    />
  ));
};

const DecisionMakerDetail = ({ detail }) => {
  return (
    <>
      {detail &&
        detail.map((decisionMakerDetail) => (
          <Box key={decisionMakerDetail.reg_id} pb={3} borderTop="1px solid #dadada">
            <Grid container boxShadow="0 12px 24px #12263f08">
              <Grid container boxShadow="0 12px 24px #12263f08">
                <Grid item xs={12} px={3}>
                  <Grid item xs={12} display={"flex"} alignItems={"center"} gap={2} py={3}>
                    <Grid sx={{ p: "4px", bgcolor: "#f8f8fb", border: "1px solid #f6f6f6", borderRadius: "4px" }}>
                      <img
                        // src={"https://dev.decision168.com/assets/student_photos/1689165693_2.png"}
                        src={decisionMakerDetail.expert_photo}
                        alt="image"
                        height={120}
                        width={120}
                        style={{ marginBottom: "-6px" }}
                      />
                    </Grid>
                    <Grid textAlign="left">
                      <Typography fontWeight={400} fontSize="16px">
                        {`${decisionMakerDetail?.first_name} ${decisionMakerDetail?.last_name}`}
                      </Typography>
                      <Typography fontSize="13px" color="gray">
                        {decisionMakerDetail?.designation}
                      </Typography>
                      <Chip
                        label="Decision Maker"
                        color="success"
                        size="small"
                        sx={{
                          "& .MuiChip-label": {
                            display: "block",
                            whiteSpace: "normal",
                            paddingInline: "4px",
                          },
                          height: "auto",
                          fontSize: "11px",
                          borderRadius: "5px",
                          background: "#34c38f",
                          color: "#fff",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} px={3} mt={3}>
                <Grid item xs={12} display={"flex"} gap={4} justifyContent={"space-between"} alignItems={"flex-start"} py={1}>
                  <Grid item xs={12} display="flex" flexDirection="column">
                    <Grid item xs={12}>
                      <Typography component="h6" variant="h6" fontSize="16px" fontWeight={600} textAlign="left" mb={2} px={1}>
                        Personal Details
                      </Typography>
                      <Grid item xs={12} display="flex" textAlign="left" borderTop="1px solid #dadada" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            Full Name :
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            fontSize="14px"
                            px={
                              1
                            }>{`${decisionMakerDetail.first_name} ${decisionMakerDetail.middle_name} ${decisionMakerDetail.last_name}`}</Typography>
                        </Grid>
                      </Grid>
                      {decisionMakerDetail.phone_number && decisionMakerDetail.phone_number != 0 && (
                        <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                          <Grid item xs={6}>
                            <Typography fontWeight={500} fontSize="14px" px={1}>
                              Mobile :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography fontSize="14px" px={1}>
                              {decisionMakerDetail.phone_number}
                            </Typography>
                          </Grid>
                        </Grid>
                      )}
                      <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            Email Address :
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize="14px" px={1}>
                            {decisionMakerDetail.email_address}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            Designation / Company :
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize="14px" px={1}>{`${decisionMakerDetail.designation} / ${decisionMakerDetail.company}`}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            Social Media Link(s) :
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize="14px" px={1}>
                            <SocialMediaRow socialMedia={decisionMakerDetail.social_media} socialMediaIcon={decisionMakerDetail.social_media_icon} />
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            Categories :
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize="14px" px={1}>
                            <CategoryChip catIds={decisionMakerDetail.expert_category} />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} my={2}>
                      <Typography component="h6" variant="h6" fontSize="16px" fontWeight={600} textAlign="left" mb={2} px={1}>
                        Call Rates
                      </Typography>
                      <Grid item xs={12} display="flex" textAlign="left" borderTop="1px solid #dadada" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            Quick &gt; Express - 15 Mins:
                          </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={"end"}>
                          <Typography fontSize="14px" px={2}>
                            ---
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            Regular &gt; Standard - 30 Mins:
                          </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={"end"}>
                          <Typography fontSize="14px" px={2}>
                            ---
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            Extra &gt; Extended - 45 Mins:
                          </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={"end"}>
                          <Typography fontSize="14px" px={2}>
                            ---
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            All Access - Extended Plus 60 Mins:
                          </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={"end"}>
                          <Typography fontSize="14px" px={2}>
                            ---
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            VIP &gt; Elite - 75 Mins:
                          </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={"end"}>
                          <Typography fontSize="14px" px={2}>
                            ---
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            Bonus &gt; Premium - 90 Mins:
                          </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={"end"}>
                          <Typography fontSize="14px" px={2}>
                            ---
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} display="flex" flexDirection="column">
                    <Grid item xs={12} textAlign={"left"}>
                      <Typography component="h6" variant="h6" fontSize="16px" fontWeight={600} textAlign="left" mb={2} px={1}>
                        Expertise
                      </Typography>
                      <Grid item xs={12} display="flex" textAlign="left" borderTop="1px solid #dadada" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={12}>
                          <Typography fontSize="14px" px={1}>
                            {decisionMakerDetail.expertise}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} my={2}>
                      <Typography component="h6" variant="h6" fontSize="16px" fontWeight={600} textAlign="left" mb={2} px={1}>
                        Payment Details
                      </Typography>
                      <Grid item xs={12} display="flex" textAlign="left" borderTop="1px solid #dadada" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            Payment Method :
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize="14px" px={1}>
                            {decisionMakerDetail.expert_payment_method}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} display="flex" textAlign="left" borderBottom="1px solid #dadada" py="12px">
                        <Grid item xs={6}>
                          <Typography fontWeight={500} fontSize="14px" px={1}>
                            PayPal E-Mail Address :
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize="14px" px={1}>
                            {decisionMakerDetail.paypal_address}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ))}
    </>
  );
};

export default DecisionMakerDetail;

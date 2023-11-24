//necesaary imports
import React, { memo } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  Avatar,
  Typography,
  Grid,
  Divider,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define the PortfolioCard component
const PortfolioCard = ({ item }) => {
  // Access the current theme
  const theme = useTheme();
  // React Router hook for navigation
  const navigate = useNavigate();
  // Render the PortfolioCard component
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Left 20% of the card for Avatar and vertical line */}
      <Grid
        container
        item
        xs={3}
        sx={{
          alignItems: "flex-start", // Align items at the start (top)
          justifyContent: "center",
          borderRight: `1px solid ${theme.palette.grey[200]}`,
          position: "relative",
          "&:hover": {
            "&:before": {
              width: "100%", // Expand the line to full width on hover
            },
          },
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "5px", // Initial width of the vertical line
            background: theme.palette.primary.light,
            transition: "width 0.3s ease", // Transition for width change
          },
        }}
      >
        {/* Clickable area to navigate to the portfolio view */}
        <CardActionArea onClick={() => navigate("/portfolio-view")}>
          <Avatar
            sx={{
              bgcolor: theme.palette.secondary.main,
              width: "40px",
              height: "40px",
              m: "12px",
            }}
            aria-label="goal"
            src={item.image}
          ></Avatar>
        </CardActionArea>
      </Grid>

      {/* Right 80% of the card for portfolio details */}
      <Grid
        item
        xs={9}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        {/* Grid container for circles, line, company name, and item name */}
        <Grid
          container
          spacing={1}
          sx={{
            marginTop: 1,
          }}
        >
          {/* Circles and Line */}
          <Grid item xs={2}>
            {/* First Circle */}
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: `2px solid ${theme.palette.primary.main}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "5px",
              }}
            ></Box>
            {/* Dashed Line */}
            <Box
              sx={{
                borderLeft: "1px dashed gray",
                height: "30px",
                margin: "0 5px",
              }}
            />
            {/* Second Circle */}
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: `2px solid ${theme.palette.primary.main}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5px",
              }}
            ></Box>
          </Grid>

          {/* Company Name and Item Name */}
          <Grid item xs={10}>
            <Grid
              container
              spacing={1}
              sx={{
                alignItems: "flex-start", // Align items at the start (top)
              }}
            >
              {/* Company Name */}
              <Grid item xs={12}>
                {/* Clickable area to navigate to the portfolio view */}
                <CardActionArea onClick={() => navigate("/portfolio-view")}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#555a5f",
                      fontWeight: "400",
                      textAlign: "start",
                    }}
                  >
                    {item?.company}
                  </Typography>
                </CardActionArea>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ borderColor: theme.palette.grey[300] }} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "400", textAlign: "start" }}
                >
                  {item?.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Grid container for Projects and Tasks information */}
        <Grid container spacing={1} sx={{ marginTop: 2, alignItems: "center" }}>
          <Grid
            item
            xs={6}
            sx={{
              borderRight: `1px solid ${theme.palette.Boxider}`,
              paddingRight: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "400" }}>
              PROJECTS
            </Typography>
            <Typography sx={{ color: "#555a5f", fontWeight: "400" }}>
              0
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              paddingLeft: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "400" }}>
              TASKS
            </Typography>
            <Typography sx={{ color: "#555a5f", fontWeight: "400" }}>
              0
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
// Memoize the PortfolioCard component to prevent unnecessary renders
export default memo(PortfolioCard);

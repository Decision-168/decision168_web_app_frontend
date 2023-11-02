import React, { memo } from "react";
import { Box } from "@mui/system";
import { Avatar, Divider, Typography } from "@mui/material";
import { VisibilityOutlined, RadioButtonUnchecked } from "@mui/icons-material";
import DecisionLogo from "../../../../assets/images/Decision1-168.png";
const Card = ({}) => {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        borderLeft: "7px solid #c7df19",
        position: "relative",
        pr: 2,
        height: 160,
        cursor: "pointer",
        background: "linear-gradient(to left, white 88%, #c7df19 12%) right",
        backgroundSize: "200%",
        transition: ".5s ease-out",
        "&:hover": {
          backgroundPosition: "left",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
          width: "25%",
          p: 2,
        }}
      >
        <Avatar
          alt="Goal"
          src={DecisionLogo}
          sx={{
            border: "1px solid white",
            borderRadius: "50%",
            width: "3rem",
            height: "3rem",
          }}
        />
        <VisibilityOutlined sx={{ fontSize: 20 }} />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "start",
          height: "100%",
          width: "75%",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "15%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <RadioButtonUnchecked sx={{ fontSize: 8, color: "#c7df19" }} />
          <Typography
            sx={{
            //   borderLeft: "3px dotted #c7df19",
              height: 30,
            }}
          />
          <RadioButtonUnchecked sx={{ fontSize: 8, color: "#c7df19" }} />
        </Box>
        <Box sx={{ width: "85%" }}>
          <Typography
            sx={{
              color: "#343a40",
              fontWeight: "900",
              fontSize: "13px",
              pb: 1,
            }}
          >
            Demo Goals
          </Typography>
          <Divider orientation="horizontal" flexItem />
          <Typography sx={{ color: "#555a5f", fontSize: "13px", pt: 1 }}>
            No Description!
          </Typography>
          <Typography
            sx={{
              color: "#b5b5b5",
              textTransform: "uppercase",
              fontSize: "12px",
              position: "absolute",
              bottom: 16,
            }}
          >
            END: 2023-03-31
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Card);

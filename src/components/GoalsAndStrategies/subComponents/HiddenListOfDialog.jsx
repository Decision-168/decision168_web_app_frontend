import { Grid, IconButton, Typography } from "@mui/material";
import React, { memo } from "react";
import LinearProgressWithLabel from "../../common/LinearProgressWithLabel";
import { VisibilityOutlined } from "@mui/icons-material";

const HiddenListOfDialog = ({ heading, title, data, children, handleOpen }) => {
  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <Typography
          sx={{
            color: "#495057",
            fontSize: 15,
            fontWeight: "600",
            ml: 0.5,
            textAlign: "left",
          }}
        >
          {heading}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        {data?.map((item, index) => {
          return (
            <Grid
              container
              key={index}
              p={1}
              sx={{ borderBottom: "1px solid #f5f5f5" }}
            >
              <Grid item xs={7} md={7} lg={7} textAlign={"left"}>
                <Typography
                  sx={{
                    fontSize: 13,
                    display: "inline",
                    fontWeight: "700",
                    textAlign: "left",
                  }}
                >
                  {title}:
                  <Typography
                    sx={{
                      fontSize: 13,
                      mx: 1,

                      display: "inline",
                    }}
                  >
                    {item.sname}
                  </Typography>
                </Typography>
              </Grid>
              <Grid xs={4} alignSelf={"center"}>
                <LinearProgressWithLabel value={item.kpi_progress} />
              </Grid>
              <Grid xs={1}>
                <IconButton
                  aria-label="view"
                  size="small"
                  onClick={() => handleOpen(item.sid, item.sname)}
                >
                  <VisibilityOutlined fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default memo(HiddenListOfDialog);

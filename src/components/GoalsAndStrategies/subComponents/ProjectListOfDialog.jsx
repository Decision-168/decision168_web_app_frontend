import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React, { memo } from "react";
import LinearProgressWithLabel from "../../common/LinearProgressWithLabel";
import {
  AssignmentTurnedInOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProjectListOfDialog = ({ heading, title, data, handleOpen }) => {
  const navigate = useNavigate();
  const handleViewTasks = () => {
    navigate("/project-tasks-list");
  };

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
                    {item.pname}
                  </Typography>
                </Typography>
              </Grid>
              <Grid xs={4} alignSelf={"center"}>
                <LinearProgressWithLabel value={item.progressRes} />
              </Grid>
              <Grid xs={1}>
                <Tooltip title="View All Tasks" placement="top">
                  <IconButton
                    aria-label="view"
                    size="small"
                    onClick={handleViewTasks}
                  >
                    <AssignmentTurnedInOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Preview Project" placement="top">
                  <IconButton aria-label="view" size="small">
                    <VisibilityOutlined
                      fontSize="small"
                      onClick={() => handleOpen(item)}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default memo(ProjectListOfDialog);

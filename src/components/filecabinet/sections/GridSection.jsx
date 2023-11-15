import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Breadcrumbs,
  Grid,
  Link,
  Paper,
  Stack,
} from "@mui/material";
import { data } from "../../../helpers/treeData";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { VisibilityOutlined } from "@mui/icons-material";

const GridSection = ({ handleModuleOpen, handleFileOpen, value }) => {
  const [activePath, setActivePath] = useState([]);

  const handleBreadcrumbClick = (id) => {
    const selectedItem = findItemById(data, id);
    const isItemAlreadySelected = activePath.some((item) => item.id === id);

    if (isItemAlreadySelected) {
      const selectedIndex = activePath.findIndex((item) => item.id === id);
      setActivePath(activePath.slice(0, selectedIndex + 1));
    } else {
      setActivePath((prevActivePath) =>
        [...prevActivePath, selectedItem].filter(
          (value, index, self) =>
            self.findIndex((v) => v.id === value.id) === index
        )
      );
    }
  };

  const findItemById = (dataArray, id) => {
    for (const item of dataArray) {
      if (item.id === id) {
        return item;
      }
      if (item.children) {
        const childResult = findItemById(item.children, id);
        if (childResult) {
          return childResult;
        }
      }
    }
    return null;
  };

  const renderCard = (nodes) => (
    <Grid item xs={12} lg={4} key={nodes.id}>
      <Card
        variant="outlined"
        sx={{
          "& .MuiCardContent-root:last-child": { paddingBottom: "16px" },
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", textAlign: "left" }}>
            <Box
              sx={{
                mr: 2,
                bgcolor: "#eff2f7",
                padding: "4px",
                height: "2rem",
                width: "2rem",
              }}
            >
              {nodes.type == "task-file" ||
              nodes.type == "subtask-file" ||
              nodes.type == "content-file" ||
              nodes.type == "project-file" ? (
                <TextSnippetIcon sx={{ color: `${nodes.color}` }} />
              ) : (
                <FolderCopyOutlinedIcon sx={{ color: `${nodes.color}` }} />
              )}
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
                  onClick={() => handleBreadcrumbClick(nodes.id)}
                >
                  {nodes.name.length > 20
                    ? `${nodes.name.slice(0, 20)}..`
                    : nodes.name}
                </Typography>

                {(nodes.type == "goal-content" ||
                  nodes.type == "kpi-content" ||
                  nodes.type == "project-content" ||
                  nodes.type == "task-content" ||
                  nodes.type == "subtask-content" ||
                  nodes.type == "content-content") && (
                  <VisibilityOutlined
                    onClick={() => handleModuleOpen(nodes)}
                    fontSize="inherit"
                    sx={{ color: "#c7df19", ml: "5px", cursor: "pointer" }}
                  />
                )}

                {(nodes.type == "project-file" ||
                  nodes.type == "task-file" ||
                  nodes.type == "subtask-file" ||
                  nodes.type == "content-file") && (
                  <VisibilityOutlined
                    onClick={() => handleFileOpen(nodes)}
                    fontSize="inherit"
                    sx={{ color: "#c7df19", ml: "5px", cursor: "pointer" }}
                  />
                )}
              </Box>

              <Typography sx={{ fontSize: "12px" }}>{(nodes.type != "project-file" &&
            nodes.type != "task-file" &&
            nodes.type != "subtask-file" &&
            nodes.type != "content-file") && (nodes.children ? nodes.children.length : 0)} Folder(s)</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  const renderBreadcrumbs = () => {
    return (
      <Card variant="outlined" sx={{ p: 1, bgcolor: "#fbfbfb" }}>
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          sx={{ fontSize: "14px" }}
        >
          <Link
            component="button"
            underline="hover"
            color="#006E3E"
            onClick={() => setActivePath([])}
          >
            Departments
          </Link>
          {activePath.map((item) => (
            <Link
              separator="›"
              color="#006E3E"
              component="button"
              key={item.id}
              underline="hover"
              onClick={() => handleBreadcrumbClick(item.id)}
            >
              {item.name}
            </Link>
          ))}
        </Breadcrumbs>
      </Card>
    );
  };
  const currentData =
    activePath.length === 0 ? data : activePath[activePath.length - 1].children;
  return (
    <Paper elevation={0} sx={{ m: 1 }}>
      <Box
        sx={{
          p: 2,
          textAlign: "left",
        }}
      >
        {renderBreadcrumbs()}
        <Grid container mt={2} spacing={2}>
          {currentData?.map((nodes) => renderCard(nodes))}
        </Grid>
      </Box>
    </Paper>
  );
};
export default GridSection;

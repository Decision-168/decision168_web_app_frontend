import * as React from "react";
import Box from "@mui/material/Box";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { VisibilityOutlined } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";

const TreeSection = ({ handleModuleOpen, handleFileOpen, value, data }) => {
  const renderTreeItem = (nodes, renderChildren) => (
    <TreeItem
      sx={{
        paddingBottom: "5px",
        "& .MuiTreeItem-label": {
          fontSize: "0.9rem",
        },
      }}
      key={nodes.id}
      nodeId={nodes.id}
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {nodes.type == "task-file" ||
          nodes.type == "subtask-file" ||
          nodes.type == "content-file" ||
          nodes.type == "project-file" ? (
            <TextSnippetIcon
              fontSize="inherit"
              sx={{ color: `${nodes.color}` }}
            />
          ) : (
            <FolderCopyIcon
              fontSize="inherit"
              sx={{ color: `${nodes.color}` }}
            />
          )}

          <Typography sx={{ fontSize: "13px", ml: 1 }}>
            {nodes.name}
            {nodes.type != "project-file" &&
              nodes.type != "task-file" &&
              nodes.type != "subtask-file" &&
              nodes.type != "content-file" &&
              ` (${nodes.children ? nodes.children.length : 0})`}
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
              sx={{ color: "#c7df19", ml: "5px" }}
            />
          )}

          {(nodes.type == "project-file" ||
            nodes.type == "task-file" ||
            nodes.type == "subtask-file" ||
            nodes.type == "content-file") && (
            <VisibilityOutlined
              onClick={() => handleFileOpen(nodes)}
              fontSize="inherit"
              sx={{ color: "#c7df19", ml: "5px" }}
            />
          )}
        </Box>
      }
    >
      {renderChildren(nodes)}
    </TreeItem>
  );

  const renderTree = (nodes) => renderTreeItem(nodes, renderChildren);

  const renderSubTree = (nodes) => renderTreeItem(nodes, renderSubChildren);

  const renderChildren = (nodes) =>
    Array.isArray(nodes.children)
      ? value === "department"
        ? nodes.children?.map((node) => renderSubTree(node))
        : nodes.children
            ?.filter((i) => i.type === value)
            .map((node) => renderSubTree(node))
      : null;

  const renderSubChildren = (nodes) =>
    Array.isArray(nodes.children)
      ? nodes.children?.map((node) => renderSubTree(node))
      : null;

  return (
    <Paper elevation={0} sx={{ m: 1 }}>
      <Box
        sx={{
          p: 2,
          textAlign: "left",
        }}
      >
        {data.length > 0 ? (
          <TreeView
            sx={{
              "& .MuiTreeItem-group": {
                borderLeft: "1px dashed rgba(0, 0, 0, 0.4)",
                marginLeft: "15px",
                paddingLeft: "18px",
              },
            }}
            aria-label="customized"
            defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
            defaultExpandIcon={<AddBoxOutlinedIcon />}
          >
            {data?.map((nodes) => renderTree(nodes))}
          </TreeView>
        ) : (
          <Typography sx={{ fontSize: "13px", ml: 1 }}>
            No Data Found
          </Typography>
        )}
      </Box>
    </Paper>
  );
};
export default TreeSection;

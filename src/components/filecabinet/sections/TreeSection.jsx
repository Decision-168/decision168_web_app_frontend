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
import { data } from "../../../helpers/treeData";

const TreeSection = ({ handleModuleOpen, handleFileOpen, value }) => {
  const renderTree = (nodes) => (
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

          <Typography sx={{ fontSize: "14px", ml: 1 }}>{nodes.name}</Typography>

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
      {Array.isArray(nodes.children)
        ? nodes.children?.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Paper elevation={0} sx={{ m: 1 }}>
      <Box
        sx={{
          p: 2,
          textAlign: "left",
        }}
      >
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
      </Box>
    </Paper>
  );
};
export default TreeSection;

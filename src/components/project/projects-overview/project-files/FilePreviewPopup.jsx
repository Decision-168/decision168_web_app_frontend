import React, { memo } from "react";
import { Close } from "@mui/icons-material";
import {
  Box,
  DialogContent,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  useTheme,
} from "@mui/material";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
const FilePreviewPopup = ({ nodes, open, handleClose, selectedFile }) => {
  const theme = useTheme();
  const file_path = (nodes.type === "project-file") && (`../src/assets/project_files/${nodes.name}`) || (nodes.type === "task-file") && (`../src/assets/task_files/${nodes.name}`) || (nodes.type === "subtask-file") && (`../src/assets/task_files/${nodes.name}`) || (nodes.type === "content-file") && (`../src/assets/plan_content_files/${nodes.name}`)
  const file_name = nodes.name;
  const parts = file_name.split('.');
  const fileExtension = parts.length > 1 ? parts.pop() : '';

  const docs = [
    {
      uri: file_path,
      fileType: fileExtension,
      fileName: `${nodes.name}`
    }
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          borderTop: `5px solid ${theme.palette.primary.main} `,
        }}
        id="customized-dialog-title"
      >
        <Typography component="h6" variant="subtitle2" mr={2}>
          Preview
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent
        sx={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        {nodes.name ? (
          <>
            <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={docs}
            style={{ width: 700, height: "auto" }}
            config={{
              header: {
                disableHeader: true,
                disableFileName: true,
                retainURLParams: false,
              },
            }}
          />
          </>
        ) : (
          <Box>
            <Typography>No Preview Available</Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default memo(FilePreviewPopup);

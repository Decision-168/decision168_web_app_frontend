import React, { memo } from "react";
import { Box, Button, Grid, Typography, useTheme} from "@mui/material";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
const FilePopup = ({ nodes }) => {
  const theme = useTheme();
  const file_path = (nodes.type === "project-file") && (`./src/assets/project_files/${nodes.name}`) || (nodes.type === "task-file") && (`./src/assets/task_files/${nodes.name}`) || (nodes.type === "subtask-file") && (`./src/assets/task_files/${nodes.name}`) || (nodes.type === "content-file") && (`./src/assets/plan_content_files/${nodes.name}`)
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
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        height: "100%",
        background: "white",
        p: 2,
        borderRadius: 1,
      }}
      mb={2}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(FilePopup);

import React,{memo} from 'react'
import {
  Close,
} from "@mui/icons-material";
import {
  Box,
  DialogContent,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  useTheme,
} from "@mui/material";
const FilePreviewPopup = ({ open, handleClose, selectedFile }) => {
    const theme = useTheme();
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
        {selectedFile ? (
          <iframe
            title="Docx Viewer"
            width="100%"
            height="600px"
            src={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${btoa(
              selectedFile
            )}`}
          />
        ) : (
          <Box>
            <Typography>No Preview Available</Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default memo(FilePreviewPopup)

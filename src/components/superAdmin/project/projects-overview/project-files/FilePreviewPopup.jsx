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
import DocViewer, {DocViewerRenderers,
} from "@cyntler/react-doc-viewer";
const FilePreviewPopup = ({ open, handleClose, selectedFile }) => {
  const theme = useTheme();

 const docs = [
   {
     uri: "https://docs.google.com/presentation/d/1880vP6ofSnG0ADcb8IUKZCRs1xgEry2A/edit?usp=drive_link&ouid=111146504207628920971&rtpof=true&sd=true",
   },
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
        {selectedFile ? (
          <>
            <DocViewer
              documents={docs}
              pluginRenderers={DocViewerRenderers}
              theme={{
                primary: "#5296d8",
                secondary: "#00000099",
                tertiary: "#5296d899",
                text_primary: "#00000099",
                text_secondary: "#5296d8",
                text_tertiary: "#00000099",
                disableThemeScrollbar: false,
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

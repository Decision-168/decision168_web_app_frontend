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
import pdfFile from "../../../../assets/test-files/ReactLazyLoading.pdf";
import docxFile from "../../../../assets/test-files/test.docx";
import pngFile from "../../../../assets/test-files/document.png";
import xlsxFile from "../../../../assets/test-files/AllCalls.xlsx";
import csvFile from "../../../../assets/test-files/credentials.csv";
import txtFile from "../../../../assets/test-files/auth.txt";
import gifFile from "../../../../assets/test-files/noInternet.gif";
import jpgFile from "../../../../assets/test-files/testi-2.jpg";
import pptxFile from "../../../../assets/test-files/AlimPresentation.pptx";
const FilePreviewPopup = ({ open, handleClose, selectedFile }) => {
  const theme = useTheme();

 const docs = [
   { uri: pdfFile },
   { uri: docxFile, fileType: 'docx'  },
   { uri: pngFile },
   { uri: xlsxFile },
   { uri: csvFile },
   { uri: txtFile },
   { uri: gifFile },
   { uri: jpgFile },
   { uri: pptxFile },
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
            <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
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

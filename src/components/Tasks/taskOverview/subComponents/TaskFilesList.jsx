import { Close, DisabledByDefault, Download, Folder, Preview } from "@mui/icons-material";
import { Avatar, Box, DialogContent, Grid, IconButton, Tooltip, Typography, Dialog, DialogActions, DialogTitle, Button, useTheme } from "@mui/material";
import React, { memo } from "react";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const TaskFilesList = ({ item, selectedFile }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = () => {
    if (selectedFile) {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(selectedFile);
      downloadLink.download = selectedFile.name;
      downloadLink.click();
    }
  };

  const handleDelete = () => {
    dispatch(
      openCnfModal({
        modalName: "deleteFile",
        title: "Are you sure?",
        description: "You want to Delete File!",
      })
    );
  };

  console.log(selectedFile);
  const handlePreview = () => {
    setOpen(true);
  };

  return (
    <>
      <Grid container px={2} py={1} sx={{ borderBottom: "1px solid #f6f6f6" }}>
        <Grid item xs={6} lg={9}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}>
            <Avatar alt="file">
              <Folder />
            </Avatar>

            <Typography component={Button} sx={{ fontSize: 14, ml: 2, color: "#343a40" }} onClick={handlePreview}>
              {item.fileName}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} lg={3} alignSelf={"center"}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
            }}>
            <Tooltip arrow title="Preview" placement="top">
              <IconButton aria-label="Preview" color="primary" onClick={handlePreview}>
                <Preview sx={{ color: theme.palette.secondary.main }} />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Download" placement="top">
              <IconButton aria-label="Download" color="primary" onClick={handleDownload}>
                <Download sx={{ color: theme.palette.secondary.main }} />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Delete" placement="top">
              <IconButton aria-label="Delete" color="primary" onClick={handleDelete}>
                <DisabledByDefault sx={{ color: theme.palette.secondary.main }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
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
          id="customized-dialog-title">
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
            color: (theme) => theme.palette.secondary.main,
          }}>
          <Close />
        </IconButton>
        <DialogContent sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          {/* {selectedFile ? (
            <>
              {selectedFile.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  sx={{
                    width: "500px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "500px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                />
              ) : (
                <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  style={{ width: "100%", height: "70vh" }}
                  documents={[
                    {
                      uri: URL.createObjectURL(selectedFile),
                      fileType: selectedFile?.type,
                    },
                  ]}
                />
              )}
            </>
          ) : ( */}
          <Box>
            <Typography>No Preview Available</Typography>
          </Box>
          {/* )} */}
        </DialogContent>
      </Dialog>
      <ConfirmationDialog value={"deleteFile"} />
    </>
  );
};

export default memo(TaskFilesList);

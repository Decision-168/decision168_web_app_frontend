import {
  DisabledByDefault,
  Download,
  Folder,
  Preview,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Button,
  useTheme,
  Link,
} from "@mui/material";
import React, { memo } from "react";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import FilePreviewPopup from "./FilePreviewPopup";
const FilesList = ({ item, selectedFile }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

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
            }}
          >
            <Avatar alt="file">
              <Folder />
            </Avatar>

            <Typography
              component={Link}
              sx={{ fontSize: 14, ml: 2, color: "#343a40",cursor:'pointer' }}
              onClick={handlePreview}
            >
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
            }}
          >
            <Tooltip arrow title="Preview" placement="top">
              <IconButton
                aria-label="Preview"
                color="primary"
                onClick={handlePreview}
              >
                <Preview />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Download" placement="top">
              <IconButton
                aria-label="Download"
                color="primary"
                onClick={handleDownload}
              >
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Delete" placement="top">
              <IconButton
                aria-label="Delete"
                color="primary"
                onClick={handleDelete}
              >
                <DisabledByDefault sx={{ color: "#343a40" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
      <FilePreviewPopup open={open} handleClose={handleClose} selectedFile={selectedFile}/>
      <ConfirmationDialog value={"deleteFile"} />
    </>
  );
};

export default memo(FilesList);

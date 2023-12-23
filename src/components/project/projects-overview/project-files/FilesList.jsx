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
import React, { memo, useState } from "react";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import {
  closeCnfModal,
  openCnfModal,
} from "../../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import FilePreviewPopup from "./FilePreviewPopup";
import {
  patchDeleteProjectFile,
  patchDeleteSubtaskFile,
  patchDeleteTaskFile,
} from "../../../../api/modules/TrashModule";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
const FilesList = ({ item, selectedFile, index, refreshData }) => {
  const [open, setOpen] = useState(false);
  const [moduleId, setModuleId] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [typeId, setTypeId] = useState(null);
  const [modulefile, setModulefile] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;

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

  const handleDelete = (currentIndex, nodes) => {
    setSelectedIndex(currentIndex);
    setModuleId(nodes.module_id);
    setFileId(nodes.file_id);
    setTypeId(nodes.type);
    setModulefile(nodes.name);
    dispatch(
      openCnfModal({
        modalName: "deleteFile",
        title: "Are you sure?",
        description: "You want to Delete File!",
      })
    );
  };
  const handleDeleteYes = () => {
    if (typeId == "project-file") {
      handleProjectFile();
    } else if (typeId == "task-file") {
      handleTaskFile();
    } else if (typeId == "subtask-file") {
      handleSubtaskFile();
    }
  };

  const handleProjectFile = async () => {
    try {
      const response = await patchDeleteProjectFile(moduleId, fileId, userID);
      dispatch(closeCnfModal({ modalName: "deleteFile" }));
      refreshData();
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deleteFile" }));
      toast.error(`${error.response?.data.error}`);
    }
  };

  const handleSubtaskFile = async () => {
    try {
      const response = await patchDeleteSubtaskFile(
        moduleId,
        modulefile,
        userID
      );
      dispatch(closeCnfModal({ modalName: "deleteFile" }));
      refreshData();
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deleteFile" }));
      toast.error(`${error.response?.data.error}`);
    }
  };

  const handleTaskFile = async () => {
    try {
      const response = await patchDeleteTaskFile(moduleId, modulefile, userID);
      dispatch(closeCnfModal({ modalName: "deleteFile" }));
      refreshData();
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deleteFile" }));
      toast.error(`${error.response?.data.error}`);
    }
  };

  const handlePreview = () => {
    setOpen(true);
  };
  return (
    <>
      <Grid container px={2} py={1} sx={{ borderBottom: "1px solid #f6f6f6" }}>
        <Grid item xs={12} lg={9}>
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
              sx={{ fontSize: 14, ml: 2, color: "#343a40", cursor: "pointer" }}
              onClick={handlePreview}
            >
              {item.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} lg={3} alignSelf={"center"}>
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
                onClick={() => handleDelete(index, item)}
              >
                <DisabledByDefault sx={{ color: "#343a40" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
      <FilePreviewPopup
        nodes={item}
        open={open}
        handleClose={handleClose}
        selectedFile={selectedFile}
      />
      {selectedIndex === index && (
        <ConfirmationDialog value={"deleteFile"} handleYes={handleDeleteYes} />
      )}
    </>
  );
};

export default memo(FilesList);

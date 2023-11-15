import { Add } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import {
  CustomTabPanel,
  a11yProps,
} from "../../../GoalsAndStrategies/subComponents/style-functions";
import FilesList from "./FilesList";

const files = [
  {
    fileName: "decision168-flow.docx",
    type: "file",
  },
  {
    fileName: "decision168-flow.docx",
    type: "task-file",
  },
];
const FileContainer = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1, width: "100%", background: "white", p: 2 }} mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            <Typography sx={{ fontSize: 15, fontWeight: "600" }}>
              Attached Files
            </Typography>
            <IconButton aria-label="upload" component="label">
              <input
                hidden
                name="profileImage"
                type="file"
                onChange={handleFileChange}
              />
              <Tooltip arrow title="Select file" placement="right">
                <Add />
              </Tooltip>
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Files" {...a11yProps(0)} />
                <Tab label="Tasks Files" {...a11yProps(1)} />
                <Tab label="Subtasks Files" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {files.filter((i) => i.type === "file").length > 0 ? (
                files
                  .filter((i) => i.type === "file")
                  .map((item, index) => (
                    <Fragment key={index}>
                      <FilesList item={item} selectedFile={selectedFile} />
                    </Fragment>
                  ))
              ) : (
                <Typography sx={{ fontSize: 13, color: "#74788D" }}>
                  No Attached Files!
                </Typography>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {files.filter((i) => i.type === "task-file").length > 0 ? (
                files
                  .filter((i) => i.type === "task-file")
                  .map((item, index) => (
                    <Fragment key={index}>
                      <FilesList item={item} selectedFile={selectedFile} />
                    </Fragment>
                  ))
              ) : (
                <Typography sx={{ fontSize: 13, color: "#74788D" }}>
                  No Attached Files!
                </Typography>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              {files.filter((i) => i.type === "subtask-file").length > 0 ? (
                files
                  .filter((i) => i.type === "subtask-file")
                  .map((item, index) => (
                    <Fragment key={index}>
                      <FilesList item={item} selectedFile={selectedFile} />
                    </Fragment>
                  ))
              ) : (
                <Typography sx={{ fontSize: 13, color: "#74788D" }}>
                  No Attached Files!
                </Typography>
              )}
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FileContainer;

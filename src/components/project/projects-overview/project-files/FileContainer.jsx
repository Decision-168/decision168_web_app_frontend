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
import React, { Fragment, useEffect, useState } from "react";
import {
  CustomTabPanel,
  a11yProps,
} from "../../../GoalsAndStrategies/subComponents/style-functions";
import FilesList from "./FilesList";
import {
  getProjectDetail,
  getProjectFiles,
  insertFiles,
} from "../../../../api/modules/ProjectModule";
import { toast } from "react-toastify";

const FileContainer = ({ pid }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const fetchProjectData = async () => {
    try {
      const response = await getProjectDetail(pid);
      setProjectData(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProjectData();
  }, [pid]);

  const handleFileChange = async (event) => {
    let fileArray = [];
    const file = event.target.files;
    const time = Math.floor(Date.now() / 1000);

    for (const f of file) {
      const fileName = `${time}_${f.name.toLowerCase()}`;
      fileArray.push(fileName);
    }
    const fileData = {
      pid: pid,
      pcreated_by: projectData?.project?.pcreated_by,
      pfile: fileArray,
    };
    try {
      const response = await insertFiles(fileData);
      fetchProjectFileData();
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error.response.error}`);
    }
    setSelectedFile(file);
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [projectFileData, setProjectFileData] = useState([]);
  const [taskFileData, setTaskFileData] = useState([]);
  const [subtaskFileData, setSubtaskFileData] = useState([]);
  const fetchProjectFileData = async () => {
    try {
      const response = await getProjectFiles(pid);
      setProjectFileData(response.projectFileDetail);
      setTaskFileData(response.taskFileDetail);
      setSubtaskFileData(response.subtaskFileDetail);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProjectFileData();
  }, [pid]);

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
                multiple
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
              {projectFileData?.filter((i) => i.type === "project-file")
                .length > 0 ? (
                projectFileData
                  ?.filter((i) => i.type === "project-file")
                  ?.map((item, index) => (
                    <Fragment key={index}>
                      <FilesList
                        index={index}
                        item={item}
                        selectedFile={selectedFile}
                        refreshData={fetchProjectFileData}
                      />
                    </Fragment>
                  ))
              ) : (
                <Typography sx={{ fontSize: 13, color: "#74788D" }}>
                  No Attached Files!
                </Typography>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {taskFileData?.filter((i) => i.type === "task-file").length >
              0 ? (
                taskFileData
                  ?.filter((i) => i.type === "task-file")
                  ?.map((item, index) => (
                    <Fragment key={index}>
                      <FilesList
                        index={index}
                        item={item}
                        selectedFile={selectedFile}
                        refreshData={fetchProjectFileData}
                      />
                    </Fragment>
                  ))
              ) : (
                <Typography sx={{ fontSize: 13, color: "#74788D" }}>
                  No Attached Files!
                </Typography>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              {subtaskFileData?.filter((i) => i.type === "subtask-file")
                .length > 0 ? (
                subtaskFileData
                  ?.filter((i) => i.type === "subtask-file")
                  ?.map((item, index) => (
                    <Fragment key={index}>
                      <FilesList
                        index={index}
                        item={item}
                        selectedFile={selectedFile}
                        refreshData={fetchProjectFileData}
                      />
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

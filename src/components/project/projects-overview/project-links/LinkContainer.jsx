import React, { Fragment, useEffect, useState } from "react";
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
import LinksList from "./LinksList";
import {
  CustomTabPanel,
  a11yProps,
} from "../../../GoalsAndStrategies/subComponents/style-functions";
import { openModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import ReduxDialog from "../../../common/ReduxDialog";
import AddLinksPopup from "./AddLinksPopup";
import {
  getProjectDetail,
  getSubtaskLinks,
  getTaskLinks,
} from "../../../../api/modules/ProjectModule";

const LinkContainer = ({ pid }) => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const pDetail = projectData?.project;
  const links = pDetail?.plink;
  const link_comments = pDetail?.plink_comment;

  const linksArray = links?.split(",");
  const linkCommentsArray = link_comments?.split(",");
  const linkType = links ? "link" : "";

  const projectLinks = linksArray?.map((link, index) => ({
    link: link,
    screen: linkCommentsArray[index],
    type: linkType,
  }));

  const [taskData, setTaskData] = useState([]);
  const fetchTaskData = async () => {
    try {
      const response = await getTaskLinks(pid);
      setTaskData(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTaskData();
  }, [pid]);

  let taskLinkArray = [];
  let taskLinkCommentsArray = [];
  taskData?.map((item) => {
    const task_links = item?.tlink;
    const task_link_comments = item?.tlink_comment;
    const linkElement = task_links?.split(",");
    const commentsElement = task_link_comments?.split(",");
    taskLinkArray.push(...linkElement);
    taskLinkCommentsArray.push(...commentsElement);
  });
  const taskLinkType = taskData ? "task-link" : "";

  const taskLinks = taskLinkArray?.map((link, index) => ({
    link: link,
    screen: taskLinkCommentsArray[index],
    type: taskLinkType,
  }));

  const [subtaskData, setSubtaskData] = useState([]);
  const fetchSubtaskData = async () => {
    try {
      const response = await getSubtaskLinks(pid);
      setSubtaskData(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchSubtaskData();
  }, [pid]);

  let subtaskLinkArray = [];
  let subtaskLinkCommentsArray = [];
  subtaskData?.map((item) => {
    const subtask_links = item?.stlink;
    const subtask_link_comments = item?.stlink_comment;
    const slinkElement = subtask_links?.split(",");
    const scommentsElement = subtask_link_comments?.split(",");
    subtaskLinkArray.push(...slinkElement);
    subtaskLinkCommentsArray.push(...scommentsElement);
  });
  const subtaskLinkType = subtaskData ? "subtask-link" : "";

  const subtaskLinks = subtaskLinkArray?.map((link, index) => ({
    link: link,
    screen: subtaskLinkCommentsArray[index],
    type: subtaskLinkType,
  }));

  return (
    <Box sx={{ flexGrow: 1, width: "100%", background: "white", p: 2 }} mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            <Typography sx={{ fontSize: 15, fontWeight: "600" }}>
              Add Links
            </Typography>
            <Tooltip arrow title="Add Links" placement="right">
              <IconButton
                aria-label="add"
                color="primary"
                onClick={() => dispatch(openModal("add-links"))}
              >
                <Add />
              </IconButton>
            </Tooltip>
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
                <Tab label="Links" {...a11yProps(0)} />
                <Tab label="Tasks Links" {...a11yProps(1)} />
                <Tab label="Subtasks Links" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {projectLinks?.filter((i) => i.type === "link").length > 0 ? (
                projectLinks
                  ?.filter((i) => i.type === "link")
                  ?.map((item, index) => (
                    <Fragment key={index}>
                      <LinksList item={item} />
                    </Fragment>
                  ))
              ) : (
                <Typography sx={{ fontSize: 13, color: "#74788D" }}>
                  No Links!
                </Typography>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {taskLinks?.filter((i) => i.type === "task-link").length > 0 ? (
                taskLinks
                  ?.filter((i) => i.type === "task-link")
                  ?.map((item, index) => (
                    <Fragment key={index}>
                      <LinksList item={item} />
                    </Fragment>
                  ))
              ) : (
                <Typography sx={{ fontSize: 13, color: "#74788D" }}>
                  No Task Links!
                </Typography>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              {subtaskLinks?.filter((i) => i.type === "subtask-link").length >
              0 ? (
                subtaskLinks
                  ?.filter((i) => i.type === "subtask-link")
                  ?.map((item, index) => (
                    <Fragment key={index}>
                      <LinksList item={item} />
                    </Fragment>
                  ))
              ) : (
                <Typography sx={{ fontSize: 13, color: "#74788D" }}>
                  No Subtask Links!
                </Typography>
              )}
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
      <ReduxDialog
        value="add-links"
        modalTitle="Add Links"
        showModalButton={false}
        modalSize="md"
      >
        <AddLinksPopup
          projectId={pid}
          refreshData={fetchProjectData}
          oldLinks={links}
          oldLinkComments={link_comments}
        />
      </ReduxDialog>
    </Box>
  );
};

export default LinkContainer;

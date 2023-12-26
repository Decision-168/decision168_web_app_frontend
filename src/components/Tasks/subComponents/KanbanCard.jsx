import React, { memo } from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Divider, Grid, Stack } from "@mui/material";
import { stringAvatar } from "../../../helpers/stringAvatar";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import { globalValidations } from "../../../utils/GlobalValidation";
import CustomTextField from "../../common/CustomTextField";
import SmallList from "./SmallList";
import { taskOverviewStyles } from "../taskOverview/styles";
import CustomDialog from "../../common/CustomDialog";
import TaskPreview from "../taskOverview/subComponents/TaskPreview";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { editTaskAndSubtask } from "../../../api/modules/taskModule";
import SubtaskPreview from "../subtaskOverview/subComponent/SubtaskPreview";

const KanbanCard = ({ cardData, fetchData }) => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const [type, setType] = React.useState("");
  const [rowId, setRowId] = React.useState(0);
  const [subRowId, setSubRowId] = React.useState(0);
  const [editMode, setEditMode] = React.useState(false);
  const [taskName, setTaskName] = React.useState("");
  const user = useSelector(selectUserDetails);
  const regId = user?.reg_id;
  const portfolioId = JSON.parse(localStorage.getItem("portfolioId"));

  //Task PreviewDialog code
  const [openTaskPreviewDialog, setOpenTaskPreviewDialog] =
    React.useState(false);
  const [openSubTaskPreviewDialog, setOpenSubTaskPreviewDialog] =
    React.useState(false);
  const styles = taskOverviewStyles();

  // id may be for task and subtask
  const handlePreview = (id, type) => {
    if (type === "task") {
      handleOpenTaskPreviewDialog(id);
    } else {
      handleOpenSubTaskPreviewDialog(id);
    }
  };

  // Task prview Dailog Code
  const handleOpenTaskPreviewDialog = (taskId) => {
    setRowId(taskId);
    setOpenTaskPreviewDialog(true);
  };

  const handleCloseTaskPreviewDialog = () => {
    setOpenTaskPreviewDialog(false);
  };

  // Sub Task prview Dailog Code
  const handleOpenSubTaskPreviewDialog = (subtaskId) => {
    setSubRowId(subtaskId);
    setOpenSubTaskPreviewDialog(true);
  };

  const handleCloseSubTaskPreviewDialog = () => {
    setOpenSubTaskPreviewDialog(false);
  };

  const handleCancelTaskNameEdit = (taskId) => {
    setEditMode(false);
    setValue("tname", cardData?.tname);
  };

  //Edit Task Name
  const handleEditTaskName = (taskId, taskName, type) => {
    setType(type);
    setRowId(taskId);
    setTaskName(taskName);
    setEditMode(true);
    setValue("tname", cardData?.tname);
  };

  const updateTaskName = async (taskId, taskName) => {
    try {
      const data = {
        div_class: "task_editable",
        div_field: "tname_field",
        div_id: taskId,
        txt: taskName,
        user_id: regId,
      };

      const response = await editTaskAndSubtask(portfolioId, data);
      toast.success(`${response?.message}`);

      // Update the form state with the new taskName
      setValue("tname", taskName); // Assuming 'tname' is the name of your input field
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
    }
  };

  const updateSubTaskName = async (subtaskId, subtaskName) => {
    try {
      const data = {
        div_class: "subtask_editable",
        div_field: "stname_field",
        div_id: subtaskId,
        txt: subtaskName,
        user_id: regId,
      };

      const response = await editTaskAndSubtask(portfolioId, data);
      toast.success(`${response?.message}`);

      // Update the form state with the new taskName
      setValue("tname", subtaskName); // Assuming 'tname' is the name of your input field
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
    }
  };

  //Task  and Subtask Name Save
  const onSubmit = async (data) => {
    try {
      if (type === "task") {
        const taskName = data?.tname;
        await updateTaskName(rowId, taskName);
      } else {
        const subtaskName = data?.tname;
        await updateSubTaskName(rowId, subtaskName);
      }
      setEditMode(false);
    } catch (error) {}
  };

  return (
    <>
      <Card
        elevation={4}
        sx={{
          maxWidth: "100%",
          borderLeft: `7px solid ${theme.palette.primary.main}`,
          borderRadius: "10px",
          marginBottom: "14px",
          backgroundColor: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#F7F7F7",
            "& .task-name": {
              color: theme.palette.primary.dark,
            },
          },
        }}
      >
        <CardHeader
          sx={{ padding: "10px" }}
          avatar={
            <Avatar
              sx={{
                bgcolor: theme.palette.secondary.main,
                border: "2px solid gray",
              }}
              aria-label="goal"
            >
              {...stringAvatar("John Doe")}
            </Avatar>
          }
          title={
            <Box>
              <Typography
                sx={{
                  color: "#343a40",
                  fontWeight: "300",
                  fontSize: "12px",
                }}
                textAlign={"start"}
              >
                Project :
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.secondary.main,
                  fontWeight: "500",
                  fontSize: "13px",
                }}
                textAlign={"start"}
              >
                {cardData?.projectName}
              </Typography>
            </Box>
          }
        />
        <CardContent sx={{ padding: "10px" }}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ height: "100%" }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              {editMode ? (
                <CustomTextField
                  name="tname"
                  placeholder="Enter Task Name..."
                  register={register}
                  errors={errors}
                  validation={globalValidations.tname}
                />
              ) : (
                <Typography
                  component="p"
                  variant="caption"
                  display="block"
                  sx={{
                    textDecoration: "none",
                    color: theme.palette.secondary.dark,
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "400",
                  }}
                  className="task-name"
                  gutterBottom
                  ml={1}
                  textAlign="left"
                  onClick={() => handlePreview(cardData?.tid, cardData?.type)}
                >
                  {getValues("tname") || cardData?.tname}{" "}
                  {/* Use getValues to get the current form state */}
                </Typography>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {editMode ? (
                  <>
                    <IconButton
                      size="small"
                      type="button"
                      sx={{ fontSize: "1rem" }}
                      onClick={() => handleCancelTaskNameEdit(cardData?.tid)}
                    >
                      <CancelIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      size="small"
                      type="submit"
                      sx={{ fontSize: "1rem" }}
                    >
                      <SaveIcon fontSize="inherit" />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    size="small"
                    type="button"
                    sx={{ fontSize: "1rem" }}
                    onClick={(event) =>
                      handleEditTaskName(
                        cardData?.tid,
                        cardData?.tname,
                        cardData?.type
                      )
                    }
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                )}
              </Box>
            </Stack>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <SmallList
                label="Due"
                value={moment(cardData?.tdue_date).format("YYYY-MM-DD")}
              />
            </Grid>
            <Grid item xs={4}>
              <SmallList label="Code" value={cardData?.tcode} />
            </Grid>
            <Grid item xs={4}>
              {cardData?.type === "task" ? (
                <SmallList label="Sub Tasks" value={cardData?.subTasksCount} />
              ) : null}
            </Grid>
          </Grid>
        </CardActions>
      </Card>

      <CustomDialog
        handleClose={handleCloseTaskPreviewDialog}
        open={openTaskPreviewDialog}
        modalTitle="Task"
        redirectPath={`/tasks-overview/${rowId}`}
        showModalButton={true}
        modalSize="lg"
      >
        <TaskPreview styles={styles} taskId={rowId} />
      </CustomDialog>

      <CustomDialog
        handleClose={handleCloseSubTaskPreviewDialog}
        open={openSubTaskPreviewDialog}
        modalTitle="Subtask"
        redirectPath={`/subtasks-overview/${subRowId}`}
        showModalButton={true}
        modalSize="lg"
      >
        <SubtaskPreview
          styles={styles}
          subtaskId={subRowId}
          closePreview={handleCloseSubTaskPreviewDialog}
          fetchData={fetchData}
          parentTaskName={cardData?.parentTaskName}
        />
      </CustomDialog>
    </>
  );
};
export default memo(KanbanCard);

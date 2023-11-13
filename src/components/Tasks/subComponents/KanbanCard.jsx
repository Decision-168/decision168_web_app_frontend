import React, { memo } from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box,Divider, Grid, Stack, Tooltip } from "@mui/material";
import { stringAvatar } from "../../../helpers/stringAvatar";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useForm } from "react-hook-form";
import { globalValidations } from "../../../utils/GlobalValidation";
import CustomTextField from "../../common/CustomTextField";
import SmallList from "./SmallList";

const KanbanCard = ({ projectName, taskDescription, dueDate, code, subTasksCount, color }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const [rowId, setRowId] = React.useState(0);
  const [editMode, setEditMode] = React.useState(false);

  const handleTaskDescription = () => {
    if (editMode) {
      //write logic for task description
      setEditMode(false);
    } else {
      setEditMode(true);
      //   setRowId(rowId);
    }
  };

  //   for tasks descrition
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Card
      elevation={4}
      sx={{
        maxWidth: "100%",
        borderLeft: `7px solid ${theme.palette.primary.main}`,
        // border:`2px solid ${color}`,
        borderRadius: "10px",
        marginBottom: "14px",
        // backgroundColor:"#F5F5F5 "
        backgroundColor: "white",
      }}>
      {/* <CardActionArea> */}
      <CardHeader
        sx={{ padding: "10px" }}
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.secondary.main, border: "2px solid gray" }} aria-label="goal">
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
              textAlign={"start"}>
              Project :
            </Typography>
            <Typography
              sx={{
                color: theme.palette.secondary.main,
                fontWeight: "500",
                fontSize: "13px",
              }}
              textAlign={"start"}>
              {projectName}
            </Typography>
          </Box>
        }
      />
      <CardContent sx={{ padding: "10px" }}>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ height: "100%" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            {editMode ? (
              <CustomTextField
                name="taskDescription"
                placeholder="Enter Task description..."
                register={register}
                errors={errors}
                validation={globalValidations.taskDescription} // Pass the validation rules as a prop
              />
            ) : (
              <Typography component="p" variant="caption" display="block" gutterBottom ml={1} textAlign="left">
                {taskDescription}
              </Typography>
            )}
            <Tooltip title={editMode ? "Save task" : "Edit task"} arrow size="small" placement="top-start">
              <IconButton size="small" onClick={() => handleTaskDescription()}>
                {editMode ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </CardContent>
      {/* </CardActionArea> */}
      <Divider />
      <CardActions>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <SmallList label="Due" value={dueDate} />
          </Grid>
          <Grid item xs={4}>
            <SmallList label="Code" value={code} />
          </Grid>
          <Grid item xs={4}>
            <SmallList label="Sub Tasks" value={subTasksCount} />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default memo(KanbanCard);

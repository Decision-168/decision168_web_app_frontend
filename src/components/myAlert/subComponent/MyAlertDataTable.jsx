import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { stringAvatar } from "../../../helpers/stringAvatar";
import CustomTable from "../../common/CustomTable";
import TaskPreview from "../../Tasks/taskOverview/subComponents/TaskPreview";
import CustomDialog from "../../common/CustomDialog";

const MyAlertDataTable = () => {
  const data = useMemo(
    () => [
      {
        isActive: true,
        date: "2023-11-14",
        info: {
          title: "AC-2168",
          description: "Login with google",
        },
        title: "Subtask",
        type: "Subtask Overdue",
      },
      {
        isActive: true,
        date: "2023-11-14",
        info: {
          title: "AB-373",
          description: "test abc [copy] [copy] [copy]",
        },
        title: "Task",
        type: "Task Overdue",
      },
      {
        isActive: true,
        date: "2023-11-14",
        info: {
          title: "Alim Mohammad",
          description: "Second Project",
        },
        title: "Project",
        type: "Project Request Accepted",
      },
      {
        isActive: true,
        date: "2023-11-14",
        info: {
          title: "PR-2084",
          description: "task assignee edit and delete",
        },
        title: "Task",
        type: "Task Arrive for Review",
      },
      {
        isActive: true,
        date: "2023-11-14",
        info: {
          title: "AB-2389",
          description: "A p1 t1 s1",
        },
        title: "Subtask",
        type: "New Subtask Assigned",
      },
      {
        isActive: true,
        date: "2023-11-14",
        info: {
          title: "AB-2389",
          description: "A p1 t1 s1",
        },
        title: "Project",
        type: "New Project Request",
      },
      {
        isActive: true,
        date: "2023-11-14",
        info: {
          title: "AB-2389",
          description: "A p1 t1 s1",
        },
        title: "Task",
        type: "New Task Assigned",
      },
      {
        isActive: true,
        date: "2023-11-14",
        info: {
          title: "AB-2389",
          description: "A p1 t1 s1",
        },
        title: "Subtask",
        type: "Subtask Arrive for Review",
      },
    ],
    []
  );
    const [filteredTask, setFilterTask] = useState([]);
  const [open, setOpen] = useState(false)
  const handleOpen = (type)=>{
    setOpen(true)
  }
    const handleClose = () => {
      setOpen(false);
    };
  const theme = useTheme();
  const columns = useMemo(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        size: 40,
      },
      {
        accessorKey: "info.title",
        header: "MyAlert",
        size: 240,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Avatar
              sx={{
                background: theme.palette.primary.main,
                mx: 1,
                width: 36,
                height: 36,
                fontSize: 14,
              }}
              aria-label="alert"
            >
              {...stringAvatar(row.original?.info?.title)}
            </Avatar>
            <Box>
              <Typography
                sx={{
                  color: "#343a40",
                  fontWeight: "900",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                textAlign={"start"}
                onClick={() => handleOpen(row.original?.type)}
              >
                {row.original?.info?.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#555a5f",
                  fontSize: "12px",
                }}
                textAlign={"start"}
              >
                {row?.original?.info?.description === null
                  ? "No Description!"
                  : row?.original?.info?.description}
              </Typography>
            </Box>
          </Box>
        ),
      },
      {
        accessorKey: "type",
        header: "For",
        filterVariant: "multi-select",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableRowActions: false,
    enableHiding: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableFacetedValues: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      pagination: { pageSize: 10, pageIndex: 0 },
    },
  });

  return (
    <>
      <CustomTable table={table} />
      <CustomDialog
        handleClose={handleClose}
        open={open}
        modalTitle="Task"
        redirectPath={"/tasks-overview"}
        showModalButton={true}
        modalSize="lg"
      >
        <TaskPreview filteredRow={filteredTask} />

      </CustomDialog>
    </>
  );
};

export default MyAlertDataTable;

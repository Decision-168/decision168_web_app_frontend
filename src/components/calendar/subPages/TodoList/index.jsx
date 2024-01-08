import React, { useMemo, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useMaterialReactTable } from "material-react-table";
import CustomTable from "../../../common/CustomTable";
import BasicBreadcrumbs from "../../../common/BasicBreadcrumbs";
import CustomSearchField from "../../../common/CustomSearchField";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../redux/action/modalSlice";
import CreateNewTodo from "./subComponents/CreateNewTodo";
import TodoViewDialog from "../../subComponents/TodoViewDialog";
import EditEventDialog from "../../subComponents/EditEventDialog";
import UpdateTodo from "./subComponents/UpdateTodo";
import DeleteEventDialog from "../../subComponents/DeleteEventDialog";
import PrimaryButton from "../../../common/PrimaryButton";
import { useTheme } from "@mui/material/styles";
import AddTodo from "../../subComponents/AddTodo";

const TodoList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [data, setData] = useState([
    {
      todo: "Todo 1",
      type: "Does Not Repeat",
      startDate: "2023-12-21",
      startTime: "06:00 AM",
      reminderTime: "No reminder",
    },
    {
      todo: "Todo 2",
      type: "Does Not Repeat",
      startDate: "2023-12-21",
      startTime: "06:00 AM",
      reminderTime: "No reminder",
    },
    {
      todo: "Todo 3",
      type: "Does Not Repeat",
      startDate: "2023-12-21",
      startTime: "06:00 AM",
      reminderTime: "No reminder",
    },
    {
      todo: "Todo 4",
      type: "Does Not Repeat",
      startDate: "2023-12-21",
      startTime: "06:00 AM",
      reminderTime: "No reminder",
    },
    // ... (other data entries)
  ]);

  const handleCreateNewTodo = () => {
    dispatch(openModal("create-new-todo-in-list"));
  };

  const handleViewTodo = () => {
    dispatch(openModal("select-todo"));
  };

  const handleEditTodo = (row) => {
    dispatch(openModal("update-todo-in-list"));
  };

  const handleDeleteTodo = (row) => {
    setDeleteDialogOpen(true);
  };

  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "todo",
        header: "Todo",
        size: 150,
        enableEditing: false,
        Cell: ({ row }) => {
          return (
            <Box
              onClick={() => handleViewTodo(row.original.todo)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: theme.palette.primary.dark,
                },
              }}
            >
              {row.original.todo}
            </Box>
          );
        },
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "startTime",
        header: "Start Time",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "reminderTime",
        header: "Reminder Time",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "priority",
        header: "Priority",
        size: 150,
        enableEditing: false,
        Cell: ({ row }) => (
          <>
            <Button onClick={() => handleEditTodo(row.original)} startIcon={<Edit fontSize="small" />} size="small" />
            <Button onClick={() => handleDeleteTodo(row.original)} startIcon={<Delete fontSize="small" />} size="small" />
          </>
        ),
      },
    ],
    []
  );

  // Initialize material-react-table
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableGlobalFilter: false,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
    },
    paginationDisplayMode: "pages",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "primary",
      rowsPerPageOptions: [10, 25, 50, 100],
      shape: "rounded",
      variant: "outlined",
    },
    muiTableProps: {
      sx: {
        padding: 0.5,
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#f5f5f5",
      },
    },
    columnFilterDisplayMode: "popover",
  });

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={8} sm={8} md={4} lg={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
              gap: "1rem",
            }}
          >
            <BasicBreadcrumbs currentPage="TODO'S" />

            <PrimaryButton onClick={handleCreateNewTodo} startIcon={<Add />}>
              Create New
            </PrimaryButton>
          </Box>
        </Grid>

        <Grid item xs={8} sm={3} md={3} lg={3}>
          <CustomSearchField />
        </Grid>
      </Grid>

      <CustomTable table={table} />

      {/* Create New Todo */}
      <CreateNewTodo />

      {/* View Todo */}
      <TodoViewDialog />

      {/* Inside the Event view  */}
      <AddTodo/>
      <EditEventDialog type={"todo"} />

      {/* Update Event */}
      <UpdateTodo />

      {/* Delete Event */}
      <DeleteEventDialog type="Todo" setDeleteDialogOpen={setDeleteDialogOpen} isDeleteDialogOpen={isDeleteDialogOpen} />
    </Box>
  );
};

export default TodoList;

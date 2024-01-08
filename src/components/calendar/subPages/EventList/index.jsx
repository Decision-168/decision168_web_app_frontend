import React, { memo, useMemo, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useMaterialReactTable } from "material-react-table";
import CustomTable from "../../../common/CustomTable";
import BasicBreadcrumbs from "../../../common/BasicBreadcrumbs";
import CustomSearchField from "../../../common/CustomSearchField";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../redux/action/modalSlice";
import CreateNewEvent from "./subComponents/CreateNewEvent";
import UpdateEvent from "./subComponents/UpdateEvent";
import PrimaryButton from "../../../common/PrimaryButton";
import { useTheme } from "@mui/material/styles";
import EventViewDialog from "../../subComponents/EventViewDialog";
import DeleteEventDialog from "../../subComponents/DeleteEventDialog";
import EditEventDialog from "../../subComponents/EditEventDialog";
import AddTodo from "../../subComponents/AddTodo";

const EventList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [data, setData] = useState([
    {
      event: "Event 1",
      type: "Does Not Repeat",
      startDate: "2023-12-21",
      startTime: "06:00 AM",
      reminderTime: "No reminder",
    },
    {
      event: "Event 2",
      type: "Does Not Repeat",
      startDate: "2023-12-21",
      startTime: "06:00 AM",
      reminderTime: "No reminder",
    },
    {
      event: "Event 1",
      type: "Does Not Repeat",
      startDate: "2023-12-21",
      startTime: "06:00 AM",
      reminderTime: "No reminder",
    },
    {
      event: "Event 2",
      type: "Does Not Repeat",
      startDate: "2023-12-21",
      startTime: "06:00 AM",
      reminderTime: "No reminder",
    },
  ]);

  const handleCreateNewEvent = () => {
    dispatch(openModal("create-new-event-in-list"));
  };

  const handleViewEvent = (eventText) => {
    dispatch(openModal("select-event"));
  };

  const handleEditEvent = (row) => {
    dispatch(openModal("update-event-in-list"));
  };

  const handleDeleteEvent = (row) => {
    setDeleteDialogOpen(true);
  };

  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "event",
        header: "Event",
        size: 150,
        enableEditing: false,
        Cell: ({ row }) => {
          return (
            <Box
              onClick={() => handleViewEvent(row.original.event)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: theme.palette.primary.dark,
                },
              }}
            >
              {row.original.event}
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
            <Button onClick={() => handleEditEvent(row.original)} startIcon={<Edit fontSize="small" />} size="small" />
            <Button onClick={() => handleDeleteEvent(row.original)} startIcon={<Delete fontSize="small" />} size="small" />
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
            <BasicBreadcrumbs currentPage="EVENTS" />

            <PrimaryButton onClick={handleCreateNewEvent} startIcon={<Add />}>
              Create New
            </PrimaryButton>
          </Box>
        </Grid>

        <Grid item xs={8} sm={3} md={3} lg={3}>
          <CustomSearchField />
        </Grid>
      </Grid>

      <CustomTable table={table} />

      {/* Create New Event */}
      <CreateNewEvent />

      {/* View Event */}
      <EventViewDialog />

      {/* Inside the Event view  */}
      <AddTodo/>
      <EditEventDialog type={"event"}/>

      {/* Update Event */}
      <UpdateEvent />

      {/* Delete Event */}
      <DeleteEventDialog type="Event" setDeleteDialogOpen={setDeleteDialogOpen} isDeleteDialogOpen={isDeleteDialogOpen} />
    </Box>
  );
};

export default memo(EventList);

import React, { memo, useMemo, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useMaterialReactTable } from "material-react-table";
import CustomTable from "../../../common/CustomTable";
import BasicBreadcrumbs from "../../../common/BasicBreadcrumbs";
import CustomSearchField from "../../../common/CustomSearchField";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../redux/action/modalSlice";
import { useTheme } from "@mui/material/styles";
import PrimaryButton from "../../../common/PrimaryButton";
import CreateNewMeeting from "./subComponents/CreateNewMeeting";
import MeetingViewDialog from "../../subComponents/MeetingViewDialog";
import UpdateMeeting from "./subComponents/UpdateMeeting";
import DeleteEventDialog from "../../subComponents/DeleteEventDialog";
import EditEventDialog from "../../subComponents/EditEventDialog";
import AddTodo from "../../subComponents/AddTodo";

const MeetingList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [data, setData] = useState([
    {
      meeting: "Meeting 1",
      type: "Does Not Repeat",
      startDate: "2023-12-21",
      startTime: "06:00 AM",
      reminderTime: "No reminder",
    },
    {
      meeting: "Meeting 2",
      type: "Does Not Repeat",
      startDate: "2023-12-21",
      startTime: "06:00 AM",
      reminderTime: "No reminder",
    },
    {
      meeting: "Meeting 3",
      type: "Does Not Repeat",
      startDate: "2023-12-21",
      startTime: "06:00 AM",
      reminderTime: "No reminder",
    },

    // ... (other data entries)
  ]);

  const handleCreateNewMeeting = () => {
    dispatch(openModal("create-new-meeting-in-list"));
  };

  const handleViewMeeting = () => {
    dispatch(openModal("select-meeting"));
  };

  const handleEditMeeting = (row) => {
    dispatch(openModal("update-meeting-in-list"));
  };

  const handleDeleteMeeting = (row) => {
    setDeleteDialogOpen(true);
  };

  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "meeting",
        header: "Meeting",
        size: 150,
        enableEditing: false,
        Cell: ({ row }) => {
          console.log(row.original);
          return (
            <Box
              onClick={() => handleViewMeeting(row.original.meeting)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: theme.palette.primary.dark,
                },
              }}
            >
              {row.original.meeting}
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
            <Button onClick={() => handleEditMeeting(row.original)} startIcon={<Edit fontSize="small" />} size="small" />
            <Button onClick={() => handleDeleteMeeting(row.original)} startIcon={<Delete fontSize="small" />} size="small" />
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
            <BasicBreadcrumbs currentPage="MEETING'S" />

            <PrimaryButton startIcon={<Add />}>Schedule</PrimaryButton>

            <PrimaryButton onClick={handleCreateNewMeeting} startIcon={<Add />}>
              Create New
            </PrimaryButton>
          </Box>
        </Grid>

        <Grid item xs={8} sm={3} md={3} lg={3}>
          <CustomSearchField />
        </Grid>
      </Grid>

      <CustomTable table={table} />

      {/* Create New Meeting */}
      <CreateNewMeeting />

      {/* View Meeting */}
      <MeetingViewDialog />

      {/* Inside the Meeting view  */}
      <AddTodo />
      <EditEventDialog type={"meeting"} />

      {/* Update Meeting */}
      <UpdateMeeting />

      {/* Delete Event */}
      <DeleteEventDialog type="Meeting" setDeleteDialogOpen={setDeleteDialogOpen} isDeleteDialogOpen={isDeleteDialogOpen} />
    </Box>
  );
};

export default memo(MeetingList);

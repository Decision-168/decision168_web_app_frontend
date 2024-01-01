import React, { memo, useMemo, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useMaterialReactTable } from "material-react-table";
import CustomTable from "../../../common/CustomTable";
import BasicBreadcrumbs from "../../../common/BasicBreadcrumbs";
import CustomSearchField from "../../../common/CustomSearchField";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../redux/action/modalSlice";
import ReduxDialog from "../../../common/ReduxDialog";
import Meeting from "../../subComponents/Meeting";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import EventView from "../../subComponents/Dialogs/EventView";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";

const MeetingList = () => {
  const dispatch = useDispatch();

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

  const handleEdit = (row) => {
    // Handle edit action here, e.g., open edit modal
    console.log("Edit clicked for row:", row);
    dispatch(openModal("meeting-update"));
  };
  const handleCreateNewButton = () => {
    dispatch(openModal("new-meeting"));
    console.log("create new meeting");
  };

  const handleDeleteClick = (row) => {
    // Handle delete action here, e.g., open delete modal
    console.log("Delete clicked for row:", row);
    dispatch(
      openCnfModal({
        modalName: "deleteMeeting",
        title: "Are you sure?",
        description: "You want to Delete Meeting",
      })
    );
  };

  const handleEventClick = (eventText) => {
    // Dispatch an action to open the modal or implement your modal logic
    console.log(`Event clicked: ${eventText}`);
    dispatch(openModal("list-meeting-view"));
  };
  // Define table columns
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
              onClick={() => handleEventClick(row.original.meeting)}
              sx={{
                cursor: "pointer",
                ":hover": {
                  color: "blue", // Change to your desired hover background color
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
            <Button
              onClick={() => handleEdit(row.original)}
              startIcon={<Edit fontSize="small" />}
              size="small"
            >
              {/* Edit */}
            </Button>
            <Button
              onClick={() => handleDeleteClick(row.original)}
              startIcon={<Delete fontSize="small" />}
              size="small"
            >
              {/* Delete */}
            </Button>
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
      {/* Container for the header }*/}
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
            {/* Breadcrumbs for navigation */}
            <BasicBreadcrumbs currentPage="MEETING'S" />
            <Button
              variant="contained"
              startIcon={<Add fontSize="small" />}
              size="small"
              sx={{ fontSize: 12 }}
            >
              Schedule
            </Button>
            <Button
              variant="contained"
              startIcon={<Add fontSize="small" />}
              size="small"
              sx={{ fontSize: 12 }}
              onClick={handleCreateNewButton}
            >
              Create New
            </Button>
          </Box>
        </Grid>

        <Grid item xs={8} sm={3} md={3} lg={3}>
          <CustomSearchField />
        </Grid>
      </Grid>
      <CustomTable table={table} />

      <ReduxDialog
        value="meeting-update"
        modalTitle="Update"
        showModalButton={false}
        redirectPath=""
        modalSize="xs"
      >
        <Meeting />
      </ReduxDialog>
      <ReduxDialog
        value="new-meeting"
        modalTitle="Create New"
        showModalButton={false}
        redirectPath=""
        modalSize="xs"
      >
        <Meeting />
      </ReduxDialog>
      <ConfirmationDialog value={"deleteMeeting"} />
      <ReduxDialog
        value="list-meeting-view"
        modalTitle="Meeting Details"
        showModalButton={false}
        redirectPath=""
        modalSize="sm"
      >
        <EventView />
      </ReduxDialog>
    </Box>
  );
};

export default memo(MeetingList);

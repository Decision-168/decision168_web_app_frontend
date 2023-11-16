import { useMemo, memo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import CustomTable from "../../../common/CustomTable";

const ArchiveTaskAndSubtask = ({ value }) => {
  const dispatch = useDispatch();
  const handleReopen = () => {
    dispatch(
      openCnfModal({
        modalName: "reopenModule",
        title: "Are you sure?",
        description: `You want to Reopen this ${value.toUpperCase()}`,
      })
    );
  };
  const data = useMemo(
    () => [
      {
        task_code: "T-12345",
        task_portfolio: "Uzma K",
        task_project: "Project 1",
        task_task: "Task 1",
        task_assignee: "Afrin Sayed",
        task_type: "Task",
        task_date: "2023-04-30",
      },
      {
        task_code: "T-64565",
        task_portfolio: "Uzma K",
        task_project: "Project 1",
        task_task: "Task 2",
        task_assignee: "Alim Mohd",
        task_type: "Subtask",
        task_date: "2023-04-30",
      },
      {
        task_code: "T-54566",
        task_portfolio: "Uzma K",
        task_project: "Project 2",
        task_task: "Task 4",
        task_assignee: "Uzma Karjikar",
        task_type: "Task",
        task_date: "2023-04-30",
      },
      {
        task_code: "T-56454",
        task_portfolio: "Uzma K",
        task_project: "Project 6",
        task_task: "Task 1",
        task_assignee: "Afrin Sayed",
        task_type: "Task",
        task_date: "2023-04-30",
      },
      {
        task_code: "T-45546",
        task_portfolio: "Uzma K",
        task_project: "Project 3",
        task_task: "Task 1",
        task_assignee: "Afrin Sayed",
        task_type: "Task",
        task_date: "2023-04-30",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "task_code",
        header: "Code",
        enableEditing: false,
        size: 130,
      },
      {
        accessorKey: "task_portfolio",
        header: "Portfolio",
        enableEditing: false,
        size: 130,
      },
      {
        accessorKey: "task_project",
        header: "Project",
        enableEditing: false,
        size: 130,
      },
      {
        accessorKey: "task_task",
        header: "Task",
        enableEditing: false,
        size: 130,
      },
      {
        accessorKey: "task_assignee",
        header: "Assignee",
        enableEditing: false,
        size: 130,
      },
      {
        accessorKey: "task_type",
        header: "Type",
        enableEditing: false,
        size: 130,
      },
      {
        accessorKey: "task_date",
        header: "Date",
        enableEditing: false,
        size: 130,
      },
      {
        accessorKey: "reopen",
        header: "Reopen",
        size: 130,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              sx={{ mr: 1 }}
              size="small"
              variant="contained"
              onClick={() => handleReopen()}
            >
              Reopen
            </Button>
          </Box>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
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
    renderTopToolbarCustomActions: () => (
      <Typography
        sx={{
          color: "#343a40",
          fontWeight: "900",
          fontSize: "16px",
          alignSelf: "center",
        }}
      >
        Archive Tasks & Subtasks
      </Typography>
    ),
  });
  return (
    <>
      <CustomTable table={table} />
      <ConfirmationDialog value={"reopenModule"} />
    </>
  );
};

export default memo(ArchiveTaskAndSubtask);

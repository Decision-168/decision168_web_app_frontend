import { useMemo, memo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import CustomTable from "../../../common/CustomTable";

const ArchiveAll = () => {
  const dispatch = useDispatch();
  
  const handleReopen = (type) => {
    dispatch(
      openCnfModal({
        modalName: "reopenModule",
        title: "Are you sure?",
        description: `You want to Reopen this ${type}`,
      })
    );
  };
  const data = useMemo(
    () => [
      {
        all_portfolio: "Uzma Karjikar",
        all_archived: "Task 1",
        all_title: "Task 1 title",
        all_type: "Project",
        all_date: "2023-04-30",
      },
      {
        all_portfolio: "Uzma K",
        all_archived: "Task 2",
        all_title: "Task 2 title",
        all_type: "Goal",
        all_date: "2023-04-30",
      },
      {
        all_portfolio: "Uzma K",
        all_archived: "Task 3",
        all_title: "Task 3 title",
        all_type: "KPI",
        all_date: "2023-04-30",
      },
      {
        all_portfolio: "Uzma K",
        all_archived: "Task 4",
        all_title: "Task 4 title",
        all_type: "Task",
        all_date: "2023-04-30",
      },
      {
        all_portfolio: "Uzma K",
        all_archived: "Task 5",
        all_title: "Task 5 title",
        all_type: "Subtask",
        all_date: "2023-04-30",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "all_portfolio",
        header: "Portfolio",
        enableEditing: false,
      },
      {
        accessorKey: "all_archived",
        header: "Archived",
        enableEditing: false,
      },
      {
        accessorKey: "all_title",
        header: "Title",
        enableEditing: false,
      },
      {
        accessorKey: "all_type",
        header: "Type",
        enableEditing: false,
      },
      {
        accessorKey: "all_date",
        header: "Date",
        enableEditing: false,
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
              onClick={() => handleReopen(row.original.all_type)}
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
        Archive All
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

export default memo(ArchiveAll);

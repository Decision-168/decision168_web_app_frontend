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

const ArchiveGoals = ({ value }) => {
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
        goal_portfolio: "Uzma K",
        goal_goal: "Goal 1",
        goal_date: "2023-04-30",
      },
      {
        goal_portfolio: "Uzma K",
        goal_goal: "Goal 2",
        goal_date: "2023-04-30",
      },
      {
        goal_portfolio: "Uzma K",
        goal_goal: "Goal 3",
        goal_date: "2023-04-30",
      },
      {
        goal_portfolio: "Uzma K",
        goal_goal: "Goal 4",
        goal_date: "2023-04-30",
      },
      {
        goal_portfolio: "Uzma K",
        goal_goal: "Goal 5",
        goal_date: "2023-04-30",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "goal_portfolio",
        header: "Portfolio",
        enableEditing: false,
      },
      {
        accessorKey: "goal_goal",
        header: "Goal",
        enableEditing: false,
      },
      {
        accessorKey: "goal_date",
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
        Archive Goals
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

export default memo(ArchiveGoals);
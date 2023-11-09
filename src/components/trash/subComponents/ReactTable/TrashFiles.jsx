import { useMemo, memo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";

const TrashFiles = ({ value }) => {
  const dispatch = useDispatch();
  const handleRestore = () => {
    dispatch(
      openCnfModal({
        modalName: "restoreModule",
        title: "Are you sure?",
        description: `You want to Restore this ${value.toUpperCase()}`,
      })
    );
  };
  const handleDelete = () => {
    dispatch(
      openCnfModal({
        modalName: "deleteModule",
        title: "Are you sure?",
        description: `You want to Delete ${value.toUpperCase()} Permanently`,
      })
    );
  };
  const data = useMemo(
    () => [
      {
        file_portfolio: "SamTech",
        file_file: "summary.pptx",
        file_title: "Account Creation Module",
        file_type: "Project File",
        file_date: "2023-12-06",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "file_portfolio",
        header: "Portfolio",
        enableEditing: false,
        size: 60,
      },
      {
        accessorKey: "file_file",
        header: "File",
        enableEditing: false,
        size: 120,
      },
      {
        accessorKey: "file_title",
        header: "Title",
        enableEditing: false,
        size: 200,
      },
      {
        accessorKey: "file_type",
        header: "Type",
        enableEditing: false,
        size: 60,
      },
      {
        accessorKey: "file_date",
        header: "Date",
        enableEditing: false,
        size: 60,
      },
      {
        accessorKey: "restore",
        header: "Restore",
        size: 60,
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
              onClick={() => handleRestore()}
            >
              Restore
            </Button>
          </Box>
        ),
      },
      {
        accessorKey: "delete",
        header: "Delete Forever",
        size: 60,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              size="small"
              variant="contained"
              sx={{ backgroundColor: "#383838", color: "#ffffff" }}
              onClick={() => handleDelete()}
            >
              Delete
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
      <Typography sx={{ color: "tomato" }}>
        ( If you do not restore deleted data within 30 days, then data will be
        deleted permanently ! )
      </Typography>
    ),
  });
  return (
    <Box>
      <MaterialReactTable table={table} />
      <ConfirmationDialog value={"restoreModule"} />
      <ConfirmationDialog value={"deleteModule"} />
    </Box>
  );
};

export default memo(TrashFiles);

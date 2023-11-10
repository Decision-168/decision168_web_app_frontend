import { useMemo, memo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { FacebookRounded, Twitter } from "@mui/icons-material";

const TrashContent = ({ value }) => {
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
        content_code: "CP-12345",
        content_portfolio: "Uzma K",
        content_project: "Project 1",
        content_content: "facebook",
        content_date: "2023-04-30",
      },
      {
        content_code: "CP-64565",
        content_portfolio: "Uzma K",
        content_project: "Project 1",
        content_content: "twitter",
        content_date: "2023-04-30",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "content_code",
        header: "Code",
        enableEditing: false,
        size: 60,
      },
      {
        accessorKey: "content_portfolio",
        header: "Portfolio",
        enableEditing: false,
        size: 100,
      },
      {
        accessorKey: "content_project",
        header: "Project",
        enableEditing: false,
        size: 100,
      },
      {
        accessorKey: "content_content",
        header: "Content",
        size: 60,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box>
            {row.original.content_content === "facebook" && (
              <FacebookRounded fontSize="large" sx={{ color: "#495057" }} />
            )}

            {row.original.content_content === "twitter" && (
              <Twitter fontSize="large" sx={{ color: "#495057" }} />
            )}
          </Box>
        ),
      },
      {
        accessorKey: "content_date",
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

export default memo(TrashContent);

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

const TrashAll = () => {
  const dispatch = useDispatch();
  const handleRestore = (type) => {
    dispatch(
      openCnfModal({
        modalName: "restoreModule",
        title: "Are you sure?",
        description: `You want to Restore this ${type}`,
      })
    );
  };
  const handleDelete = (type) => {
    dispatch(
      openCnfModal({
        modalName: "deleteModule",
        title: "Are you sure?",
        description: `You want to Delete ${type} Permanently`,
      })
    );
  };
  const data = useMemo(
    () => [
      {
        all_portfolio: "Uzma Karjikar",
        all_trash: "test proj",
        all_title: "test proj title",
        all_type: "	Goal",
        all_date: "2023-04-30",
      },
      {
        all_portfolio: "Uzma Karjikar",
        all_trash: "test proj",
        all_title: "test proj title",
        all_type: "	Project",
        all_date: "2023-04-30",
      },
      {
        all_portfolio: "Uzma Karjikar",
        all_trash: "test proj",
        all_title: "test proj title",
        all_type: "	KPI",
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
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "all_trash",
        header: "Trash",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "all_title",
        header: "Title",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "all_type",
        header: "Type",
        size: 40,
        enableEditing: false,
      },
      {
        accessorKey: "all_date",
        header: "Date",
        size: 40,
        enableEditing: false,
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
              onClick={() => handleRestore(row.original.all_type)}
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
              onClick={() => handleDelete(row.original.all_type)}
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
      <Typography sx={{ color: "tomato", alignSelf: "center" }}>
        ( If you do not restore deleted data within 30 days, then data will be
        deleted permanently ! )
      </Typography>
    ),
  });
  return (
    <>
      <CustomTable table={table} />
      <ConfirmationDialog value={"restoreModule"} />
      <ConfirmationDialog value={"deleteModule"} />
    </>
  );
};

export default memo(TrashAll);

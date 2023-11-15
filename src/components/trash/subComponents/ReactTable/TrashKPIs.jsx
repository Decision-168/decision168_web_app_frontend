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

const TrashKPIs = ({ value }) => {
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
        kpi_portfolio: "Uzma K",
        kpi_kpi: "kpi 1",
        kpi_date: "2023-04-30",
      },
      {
        kpi_portfolio: "Uzma K",
        kpi_kpi: "kpi 2",
        kpi_date: "2023-04-30",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "kpi_portfolio",
        header: "Portfolio",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "kpi_kpi",
        header: "KPI",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "kpi_date",
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

export default memo(TrashKPIs);

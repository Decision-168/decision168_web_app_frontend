import { useMemo, memo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";

const ArchiveKPIs = ({ value }) => {
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
        kpi_portfolio: "Uzma K",
        kpi_kpi: "kpi 1",
        kpi_date: "2023-04-30",
      },
      {
        kpi_portfolio: "Uzma K",
        kpi_kpi: "kpi 2",
        kpi_date: "2023-04-30",
      },
      {
        kpi_portfolio: "Uzma K",
        kpi_kpi: "kpi 3",
        kpi_date: "2023-04-30",
      },
      {
        kpi_portfolio: "Uzma K",
        kpi_kpi: "kpi 4",
        kpi_date: "2023-04-30",
      },
      {
        kpi_portfolio: "Uzma K",
        kpi_kpi: "kpi 5",
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
        enableEditing: false,
      },
      {
        accessorKey: "kpi_kpi",
        header: "KPI",
        enableEditing: false,
      },
      {
        accessorKey: "kpi_date",
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
  });
  return (
    <Box>
      <MaterialReactTable
        sx={{ "& .MuiTable-root": { size: 130 } }}
        table={table}
      />
      <ConfirmationDialog value={"reopenModule"} />
    </Box>
  );
};

export default memo(ArchiveKPIs);

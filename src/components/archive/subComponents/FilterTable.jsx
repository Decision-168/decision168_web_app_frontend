import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { openCnfModal } from "../../../redux/action/confirmationModalSlice";

//nested data is ok, see accessorKeys in ColumnDef below

const FilterTable = ({ array_data, array_columns, value }) => {
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

  //should be memoized or stable
  const data = useMemo(() => array_data, [value]);
  const columns = useMemo(() => array_columns, [value]);
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
    positionActionsColumn: "last",
    enableRowActions: true,
    renderRowActions: ({ row }) => [
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Button
          sx={{ mr: 1 }}
          size="small"
          variant="contained"
          onClick={() => handleReopen(row.original.type)}
        >
          Reopen
        </Button>
      </Box>,
    ],
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

export default FilterTable;

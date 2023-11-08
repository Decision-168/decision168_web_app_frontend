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
const data = [
  {
    portfolio: "Uzma Karjikar",
    archived: "Task 1",
    title: "Task 1 title",
    type: "Project",
    date: "2023-04-30",
  },
  {
    portfolio: "Uzma K",
    archived: "Task 2",
    title: "Task 2 title",
    type: "Goal",
    date: "2023-04-30",
  },
  {
    portfolio: "Uzma K",
    archived: "Task 3",
    title: "Task 3 title",
    type: "KPI",
    date: "2023-04-30",
  },
  {
    portfolio: "Uzma K",
    archived: "Task 4",
    title: "Task 4 title",
    type: "Task",
    date: "2023-04-30",
  },
  {
    portfolio: "Uzma K",
    archived: "Task 5",
    title: "Task 5 title",
    type: "Subtask",
    date: "2023-04-30",
  },
];

const FilterTable = () => {
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
  const columns = useMemo(
    () => [
      {
        accessorKey: "portfolio",
        header: "Portfolio",
        enableEditing: false,
      },
      {
        accessorKey: "archived",
        header: "Archived",
        enableEditing: false,
      },
      {
        accessorKey: "title",
        header: "Title",
        enableEditing: false,
      },
      {
        accessorKey: "type",
        header: "Type",
        enableEditing: false,
      },
      {
        accessorKey: "date",
        header: "Date",
        enableEditing: false,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    positionActionsColumn: "last",
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
    enableColumnActions: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    muiPaginationProps: {
      rowsPerPageOptions: [10, 25, 50, 100],
      variant: "outlined",
    },
    // muiTableProps: {
    //   sx: {
    //     border: "1px solid #eff2f7",
    //   },
    // },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#f5f5f5",
      },
    },
    // muiTableBodyCellProps: {
    //   sx: {
    //     border: "1px solid #eff2f7",
    //   },
    // },
    columnFilterDisplayMode: 'popover',
  });
  return (
    <Box>
      <MaterialReactTable table={table} />
      <ConfirmationDialog value={"reopenModule"} />
    </Box>
  );
};

export default FilterTable;

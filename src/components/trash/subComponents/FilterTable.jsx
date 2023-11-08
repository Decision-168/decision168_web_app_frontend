import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { openCnfModal } from '../../../redux/action/confirmationModalSlice';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
    {
      portfolio: "Uzma Karjikar",
      trash: "Task 1",
      title: "Task 1 title",
      type: "Project",
      date: "2023-04-30",
    },
    {
        portfolio: "Uzma K",
        trash: "Task 2",
        title: "Task 2 title",
        type: "Goal",
        date: "2023-04-30",
    },
    {
        portfolio: "Uzma K",
        trash: "Task 3",
        title: "Task 3 title",
        type: "KPI",
        date: "2023-04-30",
    },
    {
        portfolio: "Uzma K",
        trash: "Task 4",
        title: "Task 4 title",
        type: "Task",
        date: "2023-04-30",
    },
    {
        portfolio: "Uzma K",
        trash: "Task 5",
        title: "Task 5 title",
        type: "Subtask",
        date: "2023-04-30",
    },
  ];

const FilterTable = () => {
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
            description: `You want to Delete this ${type} Permanently`,
          })
        );
      };
  //should be memoized or stable
  const columns = useMemo(
    () => [
        {
          accessorKey: 'portfolio',
          header: 'Portfolio',
          enableEditing: false,
        },
        {
          accessorKey: 'trash',
          header: 'Trash',
          enableEditing: false,
        },
        {
          accessorKey: 'title',
          header: 'Title',
          enableEditing: false,
        },
        {
          accessorKey: 'type',
          header: 'Type',
          enableEditing: false,
        },
        {
          accessorKey: 'date',
          header: 'Date',
          enableEditing: false,
        }
      ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => [
      <Box sx={{
        display: "flex"
      }}>
        <Button sx={{ mr: 1}} size='small' variant="contained" onClick={() => handleRestore(row.original.type)}>
        Restore
      </Button>
      <Button sx={{backgroundColor: "#383838", color: "#ffffff"}} size='small' variant="contained"  onClick={() => handleDelete(row.original.type)}>
        Delete
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
        backgroundColor: "#f5f5f5"
      },
    },
    // muiTableBodyCellProps: {
    //   sx: {
    //     border: "1px solid #eff2f7",
    //   },
    // },
    columnFilterDisplayMode: 'popover',
    renderTopToolbarCustomActions: () => (
      <Typography sx={{ color: "red" }}>( If you do not restore deleted data within 30 days, then data will be deleted permanently ! )</Typography>
    ),
  });
  return (
    <Box>
        <MaterialReactTable table={table} />
        <ConfirmationDialog value={"restoreModule"} />
        <ConfirmationDialog value={"deleteModule"} />
    </Box>
  )
};

export default FilterTable;
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { openCnfModal } from "../../../redux/action/confirmationModalSlice";

const FilterTable = ({ array_data, array_columns, value }) => {
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

  if (value == "portfolio") {
    //should be memoized or stable
    const data = useMemo(() => array_data, [value]);
    const columns = useMemo(() => array_columns, [value]);
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
            onClick={() => handleRestore(row.original.type)}
          >
            Restore
          </Button>
          <Button
            sx={{ backgroundColor: "#383838", color: "#ffffff" }}
            size="small"
            variant="contained"
            onClick={() => handleDelete(row.original.type)}
          >
            Delete
          </Button>
        </Box>,
      ],
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
        <Typography sx={{ color: "red" }}>
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
  } else if (value == "goal") {
    //should be memoized or stable
    const data = useMemo(() => array_data, [value]);
    const columns = useMemo(() => array_columns, [value]);
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
            onClick={() => handleRestore(row.original.type)}
          >
            Restore
          </Button>
          <Button
            sx={{ backgroundColor: "#383838", color: "#ffffff" }}
            size="small"
            variant="contained"
            onClick={() => handleDelete(row.original.type)}
          >
            Delete
          </Button>
        </Box>,
      ],
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
        <Typography sx={{ color: "red" }}>
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
  } else if (value == "kpi") {
    //should be memoized or stable
    const data = useMemo(() => array_data, [value]);
    const columns = useMemo(() => array_columns, [value]);
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
            onClick={() => handleRestore(row.original.type)}
          >
            Restore
          </Button>
          <Button
            sx={{ backgroundColor: "#383838", color: "#ffffff" }}
            size="small"
            variant="contained"
            onClick={() => handleDelete(row.original.type)}
          >
            Delete
          </Button>
        </Box>,
      ],
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
        <Typography sx={{ color: "red" }}>
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
  } else if (value == "project") {
    //should be memoized or stable
    const data = useMemo(() => array_data, [value]);
    const columns = useMemo(() => array_columns, [value]);
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
            onClick={() => handleRestore(row.original.type)}
          >
            Restore
          </Button>
          <Button
            sx={{ backgroundColor: "#383838", color: "#ffffff" }}
            size="small"
            variant="contained"
            onClick={() => handleDelete(row.original.type)}
          >
            Delete
          </Button>
        </Box>,
      ],
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
        <Typography sx={{ color: "red" }}>
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
  } else if (value == "task") {
    //should be memoized or stable
    const data = useMemo(() => array_data, [value]);
    const columns = useMemo(() => array_columns, [value]);
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
            onClick={() => handleRestore(row.original.type)}
          >
            Restore
          </Button>
          <Button
            sx={{ backgroundColor: "#383838", color: "#ffffff" }}
            size="small"
            variant="contained"
            onClick={() => handleDelete(row.original.type)}
          >
            Delete
          </Button>
        </Box>,
      ],
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
        <Typography sx={{ color: "red" }}>
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
  } else if (value == "content") {
    //should be memoized or stable
    const data = useMemo(() => array_data, [value]);
    const columns = useMemo(() => array_columns, [value]);
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
            onClick={() => handleRestore(row.original.type)}
          >
            Restore
          </Button>
          <Button
            sx={{ backgroundColor: "#383838", color: "#ffffff" }}
            size="small"
            variant="contained"
            onClick={() => handleDelete(row.original.type)}
          >
            Delete
          </Button>
        </Box>,
      ],
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
        <Typography sx={{ color: "red" }}>
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
  } else {
    //should be memoized or stable
    const data = useMemo(() => array_data, [value]);
    const columns = useMemo(() => array_columns, [value]);
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
            onClick={() => handleRestore(row.original.type)}
          >
            Restore
          </Button>
          <Button
            sx={{ backgroundColor: "#383838", color: "#ffffff" }}
            size="small"
            variant="contained"
            onClick={() => handleDelete(row.original.type)}
          >
            Delete
          </Button>
        </Box>,
      ],
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
        <Typography sx={{ color: "red" }}>
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
  }
};

export default FilterTable;

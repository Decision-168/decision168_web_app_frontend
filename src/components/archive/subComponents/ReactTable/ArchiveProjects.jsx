import { useMemo, memo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";

const ArchiveProjects = ({ value }) => {
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
        project_portfolio: "Uzma K",
        project_project: "Project 1",
        project_date: "2023-04-30",
      },
      {
        project_portfolio: "Uzma K",
        project_project: "Project 2",
        project_date: "2023-04-30",
      },
      {
        project_portfolio: "Uzma K",
        project_project: "Project 3",
        project_date: "2023-04-30",
      },
      {
        project_portfolio: "Uzma K",
        project_project: "Project 4",
        project_date: "2023-04-30",
      },
      {
        project_portfolio: "Uzma K",
        project_project: "Project 5",
        project_date: "2023-04-30",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "project_portfolio",
        header: "Portfolio",
        enableEditing: false,
      },
      {
        accessorKey: "project_project",
        header: "Project",
        enableEditing: false,
      },
      {
        accessorKey: "project_date",
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

export default memo(ArchiveProjects);

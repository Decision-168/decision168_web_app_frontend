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

const ArchiveContent = ({ value }) => {
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
        content_code: "CP-12345",
        content_portfolio: "Uzma K",
        content_project: "Project 1",
        content_content: "Content 1",
        content_date: "2023-04-30",
      },
      {
        content_code: "CP-64565",
        content_portfolio: "Uzma K",
        content_project: "Project 1",
        content_content: "Content 2",
        content_date: "2023-04-30",
      },
      {
        content_code: "CP-54566",
        content_portfolio: "Uzma K",
        content_project: "Project 2",
        content_content: "Content 3",
        content_date: "2023-04-30",
      },
      {
        content_code: "CP-56454",
        content_portfolio: "Uzma K",
        content_project: "Project 6",
        content_content: "Content 4",
        content_date: "2023-04-30",
      },
      {
        content_code: "CP-45546",
        content_portfolio: "Uzma K",
        content_project: "Project 3",
        content_content: "Content 5",
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
      },
      {
        accessorKey: "content_portfolio",
        header: "Portfolio",
        enableEditing: false,
      },
      {
        accessorKey: "content_project",
        header: "Project",
        enableEditing: false,
      },
      {
        accessorKey: "content_content",
        header: "Content",
        enableEditing: false,
      },
      {
        accessorKey: "content_date",
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
    renderTopToolbarCustomActions: () => (
      <Typography
        sx={{
          color: "#343a40",
          fontWeight: "900",
          fontSize: "16px",
          alignSelf: "center",
        }}
      >
        Archive Content
      </Typography>
    ),
  });
  return (
    <>
      <CustomTable table={table} />
      <ConfirmationDialog value={"reopenModule"} />
    </>
  );
};

export default memo(ArchiveContent);

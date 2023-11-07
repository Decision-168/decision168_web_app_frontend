import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React from "react";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";

const CustomTable = ({ title, handleOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const data = useMemo(
    () => [
      {
        goals: {
          name: "ABC Goal",
          description:
            "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.",
        },
        progress: "26%",
        startDate: "2023-01-19",
        endDate: "2023-04-30",
      },
      {
        goals: {
          name: "Test",
          description:
            "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.",
        },
        progress: "76%",
        startDate: "2023-01-19",
        endDate: "2023-04-30",
      },
      {
        goals: {
          name: "PQR",
          description:
            "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.",
        },
        progress: "56%",
        startDate: "2023-01-19",
        endDate: "2023-04-30",
      },
      {
        goals: {
          name: "OCT Goal",
          description:
            "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.",
        },
        progress: "72%",
        startDate: "2023-01-19",
        endDate: "2023-04-30",
      },
      {
        goals: {
          name: "G & K",
          description:
            "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.",
        },
        progress: "32%",
        startDate: "2023-01-19",
        endDate: "2023-04-30",
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        accessorKey: "goals.name",
        header: "Goals",
        size: 300,
        minSize: 200,
        maxSize: 300,
        Cell: ({ row }) => (
          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            <Avatar
              sx={{ bgcolor: theme.palette.primary.main, mx: 1 }}
              aria-label="goal"
            >
              {...stringAvatar(row.original.goals.name)}
            </Avatar>
            <Box>
              <Typography
                sx={{
                  color: "#343a40",
                  fontWeight: "900",
                  fontSize: "14px",
                  cursor:'pointer'
                }}
                textAlign={"start"}
                onClick={() => navigate("/goal-overview")}
              >
                {row.original.goals.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#555a5f",
                  fontSize: "12px",
                }}
                textAlign={"start"}
              >
                {row.original.goals.description}
              </Typography>
            </Box>
            <IconButton aria-label="settings" onClick={handleOpen}>
              <VisibilityOutlined fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
      {
        accessorKey: "progress",
        header: "Progress",
        size: 150,
        minSize: 75,
        maxSize: 150,
        Cell: ({ row }) => (
          <LinearProgressWithLabel value={row.original.progress} />
        ),
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        size: 75,
        minSize: 40,
        maxSize: 75,
        Cell: ({ row }) => (
          <Chip
            sx={{
              height: "auto",
              color: "#556EE6",
              "& .MuiChip-label": {
                display: "block",
                whiteSpace: "normal",
              },
            }}
            label={row.original.startDate}
          />
        ),
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        size: 75,
        minSize: 40,
        maxSize: 75,
        Cell: ({ row }) => (
          <Chip
            sx={{
              height: "auto",
              "& .MuiChip-label": {
                display: "block",
                whiteSpace: "normal",
              },
            }}
            label={row.original.endDate}
          />
        ),
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableRowActions: false,
    enableColumnFilters: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    // enableEditing: true,
    // editDisplayMode: "cell",
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
    // muiTableBodyCellProps: ({ table, cell }) => ({
    //   onClick: () => {
    //     table.setEditingCell(cell);
    //   },
    // }),
    muiTableProps: {
      sx: {
        padding: 0.5,
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: "1px solid #eff2f7",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid #eff2f7",
      },
    },
    renderTopToolbarCustomActions: () => (
      <Typography
        sx={{
          color: "#343a40",
          fontWeight: "900",
          fontSize: "16px",
          alignSelf: "end",
        }}
      >
        {title}
      </Typography>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default CustomTable;

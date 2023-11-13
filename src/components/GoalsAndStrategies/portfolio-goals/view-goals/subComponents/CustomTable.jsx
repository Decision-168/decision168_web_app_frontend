import React, { memo, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { stringAvatar } from "../../../../../helpers/stringAvatar";
import { VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";
import LinearProgressWithLabel from "../../../../common/LinearProgressWithLabel";

const CustomTable = ({ title, handleOpen, data }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (data.length > 0) {
      setLoad(false);
    } else {
      setLoad(true);
    }
  }, []);

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
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Avatar
                sx={{ bgcolor: theme.palette.secondary.main, mx: 1 }}
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
                    cursor: "pointer",
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
        Cell: ({ row }) => {
          return (
            title === "Created Goals" && (
              <LinearProgressWithLabel value={row.original.progress} />
            )
          );
        },
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
    state: {
      showSkeletons: load,
    },
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

  return (
    <MaterialReactTable
      table={table}
      state={{ isLoading: load }}
      muiCircularProgressProps={{
        color: "secondary",
        thickness: 5,
        size: 55,
      }}
      muiSkeletonProps={{
        animation: "pulse",
        height: 28,
      }}
    />
  );
};

export default memo(CustomTable);

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
import CustomTable from "../../../../common/CustomTable";
import moment from "moment";

const GoalsAndStrategiesTable = ({
  title,
  handleOpen,
  handlePendingGoalOpen,
  data,
}) => {
  const formatDate = (timestamp) => {
    const formattedDate = moment(timestamp).format("YYYY-MM-DD");
    return formattedDate;
  };

  const theme = useTheme();
  const navigate = useNavigate();

  const handleOpenCondition = (type, gid, gname) => {
    if (["Created Goals", "Accepted Goals"].includes(type)) {
      handleOpen(gid, gname);
    } else {
      handlePendingGoalOpen(gid, gname);
    }
  };

  const handleRedirectCondition = (type, gid) => {
    if (["Created Goals", "Accepted Goals"].includes(type)) {
      navigate(`/goal-overview/${gid}`);
    } else {
      navigate(`/goal-overview-request/${gid}`);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "gname",
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
                {...stringAvatar(row.original.gname)}
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
                  onClick={() =>
                    handleRedirectCondition(title, row.original.gid)
                  }
                >
                  {row.original.gname}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#555a5f",
                    fontSize: "12px",
                  }}
                  textAlign={"start"}
                >
                  {row.original.gdes}
                </Typography>
              </Box>
            </Box>
            <IconButton
              aria-label="settings"
              onClick={() =>
                handleOpenCondition(title, row.original.gid, row.original.gname)
              }
            >
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
          return <LinearProgressWithLabel value={row.original.progress} />;
        },
      },
      {
        accessorKey: "gstart_date",
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
            label={formatDate(row.original.gstart_date)}
          />
        ),
      },
      {
        accessorKey: "gend_date",
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
            label={formatDate(row.original.gend_date)}
          />
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data ? data : [],
    enableColumnActions: false,
    enableRowActions: false,
    enableColumnFilters: false,
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
          alignSelf: "center",
        }}
      >
        {title}
      </Typography>
    ),
  });
  return <MaterialReactTable table={table} />;
};

export default memo(GoalsAndStrategiesTable);

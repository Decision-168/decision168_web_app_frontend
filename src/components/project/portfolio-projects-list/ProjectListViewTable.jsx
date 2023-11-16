import React, { memo, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { stringAvatar } from "../../../helpers/stringAvatar";

const ProjectListViewTable = ({
  title,
  handleOpen,
  data,
  handlePendingOpen,
}) => {

  const handleOpenCondition = (type) => {
    if (["Created Projects", "Accepted Projects"].includes(type)) {
      handleOpen();
    } else {
      handlePendingOpen();
    }
  };
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
        accessorKey: "project.name",
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
                aria-label="project"
              >
                {...stringAvatar(row.original.project.name)}
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
                  onClick={() => navigate("/projects-overview")}
                >
                  {row?.original?.project?.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#555a5f",
                    fontSize: "12px",
                  }}
                  textAlign={"start"}
                >
                  {row?.original?.project?.description === null
                    ? "No Description!"
                    : row?.original?.project?.description}
                </Typography>
              </Box>
            </Box>

            <IconButton
              aria-label="settings"
              onClick={() => handleOpenCondition(title)}
            >
              <VisibilityOutlined fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
      {
        accessorKey: "acceptedTeam",
        header: "Accepted Team",
        size: 150,
        minSize: 75,
        maxSize: 150,
        enableSorting: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <AvatarGroup max={5}>
              {row?.original?.acceptedTeam.map((item, index) => {
                return (
                  <Avatar
                    key={index}
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "black",
                      width: 32,
                      height: 32,
                      fontSize: 15,
                    }}
                  >
                    {...stringAvatar(item)}
                  </Avatar>
                );
              })}
            </AvatarGroup>
          </Box>
        ),
      },
      {
        accessorKey: "invitedTeam",
        header: "Invited Team",
        size: 150,
        minSize: 75,
        maxSize: 150,
        enableSorting: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <AvatarGroup max={5}>
              {row?.original?.invitedTeam.map((item, index) => {
                return (
                  <Avatar
                    key={index}
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                      width: 32,
                      height: 32,
                      fontSize: 15,
                    }}
                  >
                    {...stringAvatar(item)}
                  </Avatar>
                );
              })}
            </AvatarGroup>
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
          alignSelf: "center",
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

export default memo(ProjectListViewTable);

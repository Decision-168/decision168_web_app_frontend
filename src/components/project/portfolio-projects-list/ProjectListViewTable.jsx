import React, { memo, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Avatar,
  AvatarGroup,
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { stringAvatar } from "../../../helpers/stringAvatar";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const ProjectListViewTable = ({
  title,
  handleOpen,
  data,
  handlePendingOpen,
}) => {
  const handleOpenCondition = (type, pid, pname) => {
    if (["Created Projects", "Accepted Projects"].includes(type)) {
      handleOpen(type, pid, pname);
    } else {
      handlePendingOpen(type, pid, pname);
    }
  };

  const openPage = (type, pid, pname, portfId) => {
    localStorage.removeItem("portfolioId");
    localStorage.setItem("portfolioId", portfId);
    if (["Created Projects", "Accepted Projects"].includes(type)) {
      navigate(`/projects-overview/${pid}`);
    } else {
      navigate(`/projects-overview-request/${pid}`);
    }
  };
  const theme = useTheme();
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        accessorKey: "project.name",
        header: "Projects",
        size: 300,
        minSize: 200,
        maxSize: 300,
        rowLength: 100,
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
                {...stringAvatar(row.original?.project?.name)}
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
                    openPage(
                      title,
                      row?.original?.project?.id,
                      row.original.project.name,
                      row.original.portfolio_id
                    )
                  }
                >
                  {row?.original?.project?.name}
                  {row.original.bellIcon == "yes" && (
                    <>
                      <NotificationsOutlinedIcon />
                    </>
                  )}
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
              onClick={() =>
                handleOpenCondition(
                  title,
                  row?.original?.project?.id,
                  row.original.project.name
                )
              }
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
              {row?.original?.acceptedTeam?.map((item, index) => {
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
                    {...stringAvatar(Object.values(item)[0])}
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
              {row?.original?.invitedTeam?.map((item, index) => {
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
                    {...stringAvatar(Object.values(item)[0])}
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

  return (
    <>
      <Container
        maxWidth="xl"
        fixed
        sx={{
          "&.MuiContainer-root": {
            paddingLeft: "0px",
            paddingRight: "0px",
          },
        }}
      >
        <MaterialReactTable table={table} />
      </Container>
    </>
  );
};

export default memo(ProjectListViewTable);

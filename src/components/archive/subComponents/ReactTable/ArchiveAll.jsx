import { useMemo, memo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import {
  closeCnfModal,
  openCnfModal,
} from "../../../../redux/action/confirmationModalSlice";

import {
  getAllArchiveData,
  patchUnArchiveGoal,
  patchUnArchiveKpi,
  patchUnArchiveProject,
  patchUnArchiveSubtask,
  patchUnArchiveTask,
} from "../../../../api/modules/ArchiveModule";
import { toast } from "react-toastify";

const ArchiveAll = ({ regId, portfolioId }) => {
  const dispatch = useDispatch();
  const [archiveData, setArchiveData] = useState([]);
  const [archiveType, setArchiveType] = useState(null);
  const [archiveId, setArchiveId] = useState(null);
  const fetchArchiveData = async () => {
    try {
      const response = await getAllArchiveData(regId, portfolioId);
      setArchiveData(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchArchiveData();
  }, [regId]);

  const handleReopen = (type, id) => {
    setArchiveType(type);
    setArchiveId(id);
    dispatch(
      openCnfModal({
        modalName: "reopenModule",
        title: "Are you sure?",
        description: `You want to Reopen this ${type}`,
      })
    );
  };

  const fetchUnarchiveGoal = async () => {
    try {
      const response = await patchUnArchiveGoal(archiveId, portfolioId, regId);
      fetchArchiveData();
      dispatch(closeCnfModal({ modalName: "reopenModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "reopenModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchUnarchiveKpi = async () => {
    try {
      const response = await patchUnArchiveKpi(archiveId, portfolioId, regId);
      fetchArchiveData();
      dispatch(closeCnfModal({ modalName: "reopenModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "reopenModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchUnarchiveProject = async () => {
    try {
      const response = await patchUnArchiveProject(
        archiveId,
        portfolioId,
        regId
      );
      fetchArchiveData();
      dispatch(closeCnfModal({ modalName: "reopenModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "reopenModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchUnarchiveTask = async () => {
    try {
      const response = await patchUnArchiveTask(archiveId, portfolioId, regId);
      fetchArchiveData();
      dispatch(closeCnfModal({ modalName: "reopenModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "reopenModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchUnarchiveSubtask = async () => {
    try {
      const response = await patchUnArchiveSubtask(archiveId, regId);
      fetchArchiveData();
      dispatch(closeCnfModal({ modalName: "reopenModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "reopenModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const handleYes = () => {
    if (archiveType == "Goal") {
      fetchUnarchiveGoal();
    } else if (archiveType == "KPI") {
      fetchUnarchiveKpi();
    } else if (archiveType == "Project") {
      fetchUnarchiveProject();
    } else if (archiveType == "Task") {
      fetchUnarchiveTask();
    } else if (archiveType == "Subtask") {
      fetchUnarchiveSubtask();
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "all_portfolio",
        header: "Portfolio",
        enableEditing: false,
      },
      {
        accessorKey: "all_archived",
        header: "Archived",
        enableEditing: false,
      },
      {
        accessorKey: "all_title",
        header: "Title",
        enableEditing: false,
      },
      {
        accessorKey: "all_type",
        header: "Type",
        enableEditing: false,
      },
      {
        accessorKey: "all_date",
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
              onClick={() =>
                handleReopen(row.original.all_type, row.original.table_id)
              }
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
    data: archiveData,
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
        Archive All
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
      <ConfirmationDialog value={"reopenModule"} handleYes={handleYes} />
    </>
  );
};

export default memo(ArchiveAll);

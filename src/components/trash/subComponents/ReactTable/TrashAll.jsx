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
  getAllDeleteData,
  patchDeleteForeverGoal,
  patchDeleteForeverKpi,
  patchDeleteForeverProject,
  patchDeleteForeverProjectFile,
  patchDeleteForeverSubtask,
  patchDeleteForeverSubtaskFile,
  patchDeleteForeverTask,
  patchDeleteForeverTaskFile,
  patchRetrieveGoal,
  patchRetrieveKpi,
  patchRetrieveProject,
  patchRetrieveProjectFile,
  patchRetrieveSubtask,
  patchRetrieveSubtaskFile,
  patchRetrieveTask,
  patchRetrieveTaskFile,
} from "../../../../api/modules/TrashModule";
import { toast } from "react-toastify";

const TrashAll = ({ regId, portfolioId }) => {
  const dispatch = useDispatch();
  const [deleteData, setDeleteData] = useState([]);
  const [deleteType, setDeleteType] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [moduleId, setModuleId] = useState(null);
  const [fileName, setFileName] = useState(null);

  const fetchDeleteData = async () => {
    try {
      const response = await getAllDeleteData(regId, portfolioId);
      setDeleteData(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDeleteData();
  }, [regId]);

  const handleRestore = (type, id, module_id, file_name) => {
    setDeleteType(type);
    setDeleteId(id);
    setModuleId(module_id);
    setFileName(file_name);
    dispatch(
      openCnfModal({
        modalName: "restoreModule",
        title: "Are you sure?",
        description: `You want to Restore this ${type}`,
      })
    );
  };

  const handleDelete = (type, id, module_id, file_name) => {
    setDeleteType(type);
    setDeleteId(id);
    setModuleId(module_id);
    setFileName(file_name);
    dispatch(
      openCnfModal({
        modalName: "deleteModule",
        title: "Are you sure?",
        description: `You want to Delete ${type} Permanently`,
      })
    );
  };

  // ------- Retrieve Modules -------------------------
  const fetchRetrieveGoal = async () => {
    try {
      const response = await patchRetrieveGoal(deleteId, portfolioId, regId);
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "restoreModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "restoreModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchRetrieveKpi = async () => {
    try {
      const response = await patchRetrieveKpi(deleteId, portfolioId, regId);
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "restoreModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "restoreModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchRetrieveProject = async () => {
    try {
      const response = await patchRetrieveProject(deleteId, portfolioId, regId);
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "restoreModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "restoreModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchRetrieveTask = async () => {
    try {
      const response = await patchRetrieveTask(deleteId, portfolioId, regId);
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "restoreModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "restoreModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchRetrieveSubtask = async () => {
    try {
      const response = await patchRetrieveSubtask(deleteId, regId);
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "restoreModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "restoreModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchRetrieveProjectFile = async () => {
    try {
      const response = await patchRetrieveProjectFile(
        moduleId,
        deleteId,
        regId
      );
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "restoreModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "restoreModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchRetrieveTaskFile = async () => {
    try {
      const response = await patchRetrieveTaskFile(
        moduleId,
        fileName,
        deleteId,
        regId
      );
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "restoreModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "restoreModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchRetrieveSubtaskFile = async () => {
    try {
      const response = await patchRetrieveSubtaskFile(
        moduleId,
        fileName,
        deleteId,
        regId
      );
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "restoreModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "restoreModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  // ------- Delete Forever Modules -------------------------
  const fetchDeleteForeverGoal = async () => {
    try {
      const response = await patchDeleteForeverGoal(deleteId, regId);
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "deleteModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deleteModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchDeleteForeverKpi = async () => {
    try {
      const response = await patchDeleteForeverKpi(deleteId, regId);
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "deleteModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deleteModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchDeleteForeverProject = async () => {
    try {
      const response = await patchDeleteForeverProject(deleteId, regId);
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "deleteModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deleteModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchDeleteForeverTask = async () => {
    try {
      const response = await patchDeleteForeverTask(deleteId, regId);
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "deleteModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deleteModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchDeleteForeverSubtask = async () => {
    try {
      const response = await patchDeleteForeverSubtask(deleteId, regId);
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "deleteModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deleteModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchDeleteForeverProjectFile = async () => {
    try {
      const response = await patchDeleteForeverProjectFile(deleteId);
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "deleteModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deleteModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchDeleteForeverTaskFile = async () => {
    try {
      const response = await patchDeleteForeverTaskFile(
        moduleId,
        deleteId,
        regId
      );
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "deleteModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deleteModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchDeleteForeverSubtaskFile = async () => {
    try {
      const response = await patchDeleteForeverSubtaskFile(
        moduleId,
        deleteId,
        regId
      );
      fetchDeleteData();
      dispatch(closeCnfModal({ modalName: "deleteModule" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deleteModule" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const handleRestoreYes = () => {
    if (deleteType == "Goal") {
      fetchRetrieveGoal();
    } else if (deleteType == "KPI") {
      fetchRetrieveKpi();
    } else if (deleteType == "Project") {
      fetchRetrieveProject();
    } else if (deleteType == "Task") {
      fetchRetrieveTask();
    } else if (deleteType == "Subtask") {
      fetchRetrieveSubtask();
    } else if (deleteType == "Project File") {
      fetchRetrieveProjectFile();
    }
    if (deleteType == "Task File") {
      fetchRetrieveTaskFile();
    } else if (deleteType == "Subtask File") {
      fetchRetrieveSubtaskFile();
    }
  };

  const handleDeleteYes = () => {
    if (deleteType == "Goal") {
      fetchDeleteForeverGoal();
    } else if (deleteType == "KPI") {
      fetchDeleteForeverKpi();
    } else if (deleteType == "Project") {
      fetchDeleteForeverProject();
    } else if (deleteType == "Task") {
      fetchDeleteForeverTask();
    } else if (deleteType == "Subtask") {
      fetchDeleteForeverSubtask();
    } else if (deleteType == "Project File") {
      fetchDeleteForeverProjectFile();
    }
    if (deleteType == "Task File") {
      fetchDeleteForeverTaskFile();
    } else if (deleteType == "Subtask File") {
      fetchDeleteForeverSubtaskFile();
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "all_portfolio",
        header: "Portfolio",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "all_trash",
        header: "Trash",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "all_title",
        header: "Title",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "all_type",
        header: "Type",
        size: 40,
        enableEditing: false,
      },
      {
        accessorKey: "all_date",
        header: "Date",
        size: 40,
        enableEditing: false,
      },
      {
        accessorKey: "restore",
        header: "Restore",
        size: 60,
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
                handleRestore(
                  row.original.all_type,
                  row.original.table_id,
                  row.original.module_id,
                  row.original.file_name
                )
              }
            >
              Restore
            </Button>
          </Box>
        ),
      },
      {
        accessorKey: "delete",
        header: "Delete Forever",
        size: 60,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              size="small"
              variant="contained"
              sx={{ backgroundColor: "#383838", color: "#ffffff" }}
              onClick={() =>
                handleDelete(
                  row.original.all_type,
                  row.original.table_id,
                  row.original.module_id,
                  row.original.file_name
                )
              }
            >
              Delete
            </Button>
          </Box>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: deleteData,
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
      <Typography sx={{ color: "tomato", alignSelf: "center" }}>
        ( If you do not restore deleted data within 30 days, then data will be
        deleted permanently ! )
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
      <ConfirmationDialog
        value={"restoreModule"}
        handleYes={handleRestoreYes}
      />
      <ConfirmationDialog value={"deleteModule"} handleYes={handleDeleteYes} />
    </>
  );
};

export default memo(TrashAll);

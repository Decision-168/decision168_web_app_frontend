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
  getFilesDeleteData,
  patchDeleteForeverProjectFile,
  patchDeleteForeverSubtaskFile,
  patchDeleteForeverTaskFile,
  patchRetrieveProjectFile,
  patchRetrieveSubtaskFile,
  patchRetrieveTaskFile,
} from "../../../../api/modules/TrashModule";
import { toast } from "react-toastify";

const TrashFiles = ({ value, regId, portfolioId }) => {
  const dispatch = useDispatch();
  const [deleteData, setDeleteData] = useState([]);
  const [deleteType, setDeleteType] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [moduleId, setModuleId] = useState(null);
  const [fileName, setFileName] = useState(null);

  const fetchDeleteData = async () => {
    try {
      const response = await getFilesDeleteData(regId, portfolioId);
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
    if (deleteType == "Project File") {
      fetchRetrieveProjectFile();
    }
    if (deleteType == "Task File") {
      fetchRetrieveTaskFile();
    } else if (deleteType == "Subtask File") {
      fetchRetrieveSubtaskFile();
    }
  };

  const handleDeleteYes = () => {
    if (deleteType == "Project File") {
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
        accessorKey: "file_portfolio",
        header: "Portfolio",
        enableEditing: false,
        size: 60,
      },
      {
        accessorKey: "file_file",
        header: "File",
        enableEditing: false,
        size: 120,
      },
      {
        accessorKey: "file_title",
        header: "Title",
        enableEditing: false,
        size: 200,
      },
      {
        accessorKey: "file_type",
        header: "Type",
        enableEditing: false,
        size: 60,
      },
      {
        accessorKey: "file_date",
        header: "Date",
        enableEditing: false,
        size: 60,
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
                  row.original.file_type,
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
                  row.original.file_type,
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

export default memo(TrashFiles);

import { useMemo, memo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { closeCnfModal, openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import CustomTable from "../../../common/CustomTable";
import { gettaskDeleteData, patchDeleteForeverSubtask, patchDeleteForeverTask, patchRetrieveSubtask, patchRetrieveTask } from "../../../../api/modules/TrashModule";
import { toast } from "react-toastify";

const TrashTaskAndSubtask = ({ value, regId, portfolioId }) => {
  const dispatch = useDispatch();
  const [deleteData, setDeleteData] = useState([]);
  const [deleteType, setDeleteType] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [module, setModule] = useState(null);

  const fetchDeleteData = async () => {
    try {
      const response = await gettaskDeleteData(regId,portfolioId);
      setDeleteData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDeleteData();
  }, [regId]);
  
  const handleRestore = (type, id) => {
    setDeleteType(type);
    setDeleteId(id);
    dispatch(
      openCnfModal({
        modalName: "restoreModule",
        title: "Are you sure?",
        description: `You want to Restore this ${type}`,
      })
    );
  };

  const handleDelete = (type, id) => {
    setDeleteType(type);
    setDeleteId(id);
    dispatch(
      openCnfModal({
        modalName: "deleteModule",
        title: "Are you sure?",
        description: `You want to Delete ${type} Permanently`,
      })
    );
  };

  const fetchRetrieveTask = async () => {
    try {
      const response = await patchRetrieveTask(deleteId, portfolioId, regId);
      fetchDeleteData()
      dispatch(closeCnfModal({ modalName: 'restoreModule' }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: 'restoreModule' }));
      console.log(error);
      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchRetrieveSubtask = async () => {
    try {
      const response = await patchRetrieveSubtask(deleteId, regId);
      fetchDeleteData()
      dispatch(closeCnfModal({ modalName: 'restoreModule' }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: 'restoreModule' }));
      console.log(error);
      toast.error(`${error.response.data?.error}`);
    }
  };

  const fetchDeleteForeverTask = async () => {
    try {
      const response = await patchDeleteForeverTask(deleteId);
      fetchDeleteData()
      dispatch(closeCnfModal({ modalName: 'deleteModule' }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: 'deleteModule' }));
      console.log(error);
      toast.error(`${error.response.data?.error}`);
    }
  };
  
  const fetchDeleteForeverSubtask = async () => {
    try {
      const response = await patchDeleteForeverSubtask(deleteId);
      fetchDeleteData()
      dispatch(closeCnfModal({ modalName: 'deleteModule' }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: 'deleteModule' }));
      console.log(error);
      toast.error(`${error.response.data?.error}`);
    }
  };

  const handleRestoreYes = () => {
    if(deleteType == 'Task') {
      fetchRetrieveTask()
    }else if(deleteType == 'Subtask') {
      fetchRetrieveSubtask()
    }
  };  

  const handleDeleteYes = () => {
    if(deleteType == 'Task') {
      fetchDeleteForeverTask()
    }else if(deleteType == 'Subtask') {
      fetchDeleteForeverSubtask()
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "task_code",
        header: "Code",
        enableEditing: false,
        size: 60,
      },
      {
        accessorKey: "task_portfolio",
        header: "Portfolio",
        enableEditing: false,
        size: 100,
      },
      {
        accessorKey: "task_project",
        header: "Project",
        enableEditing: false,
        size: 100,
      },
      {
        accessorKey: "task_task",
        header: "Task",
        enableEditing: false,
        size: 100,
      },
      {
        accessorKey: "task_assignee",
        header: "Assignee",
        enableEditing: false,
        size: 60,
      },
      {
        accessorKey: "task_type",
        header: "Type",
        enableEditing: false,
        size: 60,
      },
      {
        accessorKey: "task_date",
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
              onClick={() => handleRestore(row.original.task_type, row.original.table_id)}
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
              onClick={() => handleDelete(row.original.task_type, row.original.table_id)}
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
      <ConfirmationDialog value={"restoreModule"} handleYes={handleRestoreYes}/>
      <ConfirmationDialog value={"deleteModule"}  handleYes={handleDeleteYes}/>
    </>
  );
};

export default memo(TrashTaskAndSubtask);

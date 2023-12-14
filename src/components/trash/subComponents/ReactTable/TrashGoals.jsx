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
import { getgoalDeleteData, patchDeleteForeverGoal, patchRetrieveGoal } from "../../../../api/modules/TrashModule";
import { toast } from "react-toastify";

const TrashGoals = ({ value, regId, portfolioId }) => {
  const dispatch = useDispatch();
  const [deleteData, setDeleteData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [module, setModule] = useState(null);

  const fetchDeleteData = async () => {
    try {
      const response = await getgoalDeleteData(regId,portfolioId);
      setDeleteData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDeleteData();
  }, [regId]);

  const handleRestore = (type, id) => {
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
    setDeleteId(id);
    dispatch(
      openCnfModal({
        modalName: "deleteModule",
        title: "Are you sure?",
        description: `You want to Delete ${type} Permanently`,
      })
    );
  };

  const handleRestoreYes = async () => {
    try {
      const response = await patchRetrieveGoal(deleteId, portfolioId, regId);
      fetchDeleteData()
      dispatch(closeCnfModal({ modalName: 'restoreModule' }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: 'restoreModule' }));
      console.log(error);
      toast.error(`${error.response.data?.error}`);
    }
  };

  const handleDeleteYes = async () => {
    try {
      const response = await patchDeleteForeverGoal(deleteId, regId);
      fetchDeleteData()
      dispatch(closeCnfModal({ modalName: 'deleteModule' }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: 'deleteModule' }));
      console.log(error);
      toast.error(`${error.response.data?.error}`);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "goal_portfolio",
        header: "Portfolio",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "goal_goal",
        header: "Goal",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "goal_date",
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
              onClick={() => handleRestore(row.original.goal_type, row.original.table_id)}
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
              onClick={() => handleDelete(row.original.goal_type, row.original.table_id)}
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
      <ConfirmationDialog value={"restoreModule"} handleYes={handleRestoreYes} />
      <ConfirmationDialog value={"deleteModule"}  handleYes={handleDeleteYes}/>
    </>
  );
};

export default memo(TrashGoals);

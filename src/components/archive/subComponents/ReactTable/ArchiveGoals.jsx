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
import { getgoalArchiveData, patchUnArchiveGoal } from "../../../../api/modules/ArchiveModule";
import { toast } from "react-toastify";

const ArchiveGoals = ({ value, regId, portfolioId }) => {
  const dispatch = useDispatch();

  const [archiveData, setArchiveData] = useState([]);
  const [archiveId, setArchiveId] = useState(null);

  const fetchArchiveData = async () => {
    try {
      const response = await getgoalArchiveData(regId,portfolioId);
      setArchiveData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArchiveData();
  }, [regId]);
  
  const handleReopen = (type, id) => {
    setArchiveId(id);
    dispatch(
      openCnfModal({
        modalName: "reopenModule",
        title: "Are you sure?",
        description: `You want to Reopen this ${type}`,
      })
    );
  };

  const handleYes = async () => {
    try {
      const response = await patchUnArchiveGoal(archiveId, portfolioId, regId);
      fetchArchiveData()
      dispatch(closeCnfModal({ modalName: 'reopenModule' }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: 'reopenModule' }));
      console.log(error);
      toast.error(`${error.response.data?.error}`);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "goal_portfolio",
        header: "Portfolio",
        enableEditing: false,
      },
      {
        accessorKey: "goal_goal",
        header: "Goal",
        enableEditing: false,
      },
      {
        accessorKey: "goal_date",
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
              onClick={() => handleReopen(row.original.goal_type,row.original.table_id)}
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
    data:archiveData,
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
        Archive Goals
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

export default memo(ArchiveGoals);

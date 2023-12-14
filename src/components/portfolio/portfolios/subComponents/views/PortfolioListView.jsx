//necessary imports
import React, { memo, useMemo, useState } from "react";
import { useMaterialReactTable } from "material-react-table";
import { Box, Button } from "@mui/material";
import CustomTable from "../../../../common/CustomTable";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeCnfModal, openCnfModal } from "../../../../../redux/action/confirmationModalSlice";
import ConfirmationDialog from "../../../../common/ConfirmationDialog";
import DeleteDailogContent from "../../../viewporfolio/subComponents/DeleteDailogContent";
import CustomDialog from "../../../../common/CustomDialog";
import { patchArchivePortfolio } from "../../../../../api/modules/ArchiveModule";
import { toast } from "react-toastify";
import { patchDeleteGoal } from "../../../../../api/modules/TrashModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../../redux/action/userSlice";

// Define the main component - PortfolioListView
const PortfolioListView = () => {
  // React Router hook for navigation
  const navigate = useNavigate();
  // Redux hook for dispatching actions
  const user = useSelector(selectUserDetails);
  const storedPortfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const dispatch = useDispatch();
  const [module, setModule] = React.useState(null);
  const userID = user?.reg_id;

  // Handler for clicking the "Archive" button
  const handleArchive = () => {
    setModule('archive');
    dispatch(
      openCnfModal({
        modalName: "archivePortfolio",
        title: "Are you sure?",
        description: "You want to Archive Portfolio",
      })
    );
  };

  const handleYes = async () => {
    if(module == 'archive') {
      try {
        const response = await patchArchivePortfolio(storedPortfolioId, userID);
        dispatch(closeCnfModal({ modalName: 'archivePortfolio' }));
        toast.success(`${response.message}`);
      } catch (error) {
        dispatch(closeCnfModal({ modalName: 'archivePortfolio' }));
        console.log(error.response.data)
        toast.error(`${error.response.data?.error}`);
      };
    }else if(module == 'delete') {
      try {
        const response = await patchDeleteGoal(storedPortfolioId, userID);
        dispatch(closeCnfModal({ modalName: 'deletePortfolio' }));
        toast.success(`${response.message}`);
      } catch (error) {
        dispatch(closeCnfModal({ modalName: 'deletePortfolio' }));
        toast.error(`${error.response?.error}`);
      };
    }
  };

  // State for controlling the visibility of the delete dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  // Handler for opening the delete dialog
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
    handleClose();
  };
  // Handler for closing the delete dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Sample data for the table
  const [data, setData] = useState([
    {
      name: "Uzma Karjikar",
      type: "test proj",
    },
    {
      name: "Test Name",
      type: "test portfolio",
    },
    {
      name: "Shoaib Akhtar",
      type: "test proj",
    },
    {
      name: "Hashim Amla",
      type: "test portfolio",
    },
    {
      name: "Manmohan Singh",
      type: "test proj",
    },
    {
      name: "L K Advani",
      type: "test portfolio",
    },

    {
      name: "Test Name",
      type: "test portfolio",
    },
    {
      name: "Uzma Karjikar",
      type: "test proj",
    },
    {
      name: "Test Name",
      type: "test portfolio",
    },
  ]);
  // Table columns configuration
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "view",
        header: "View",
        size: 150,
        enableEditing: false,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex" }}>
            <Link to="/portfolio-view">
              <Button
                size="small"
                variant="contained"
                sx={{ height: "24px", padding: "4px" }}
              >
                View
              </Button>
            </Link>
          </Box>
        ),
      },
      {
        accessorKey: "edit",
        header: "Edit",
        size: 40,
        enableEditing: false,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex" }}>
            <Button
              size="small"
              variant="contained"
              sx={{ height: "24px", padding: "4px" }}
              onClick={() => navigate("/portfolio-edit")}
            >
              Edit
            </Button>
          </Box>
        ),
      },
      {
        accessorKey: "archive",
        header: "Archive",
        size: 60,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex" }}>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                height: "24px",
                padding: "4px",
              }}
              onClick={handleArchive}
            >
              Archive
            </Button>
          </Box>
        ),
      },
      {
        accessorKey: "delete",
        header: "Delete",
        size: 60,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex" }}>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "red",
                color: "white",
                height: "24px",
                padding: "4px",
              }}
              onClick={handleOpenDeleteDialog}
            >
              Delete
            </Button>
          </Box>
        ),
      },
    ],
    []
  );
  // Table hook for managing Material-UI table features
  const table = useMaterialReactTable({
    columns,
    data,
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
  });
  // Render the component
  return (
    <>
      {/* Render a custom table component */}
      <CustomTable table={table} />
      {/* Render a confirmation dialog for archiving */}
      <ConfirmationDialog value={"archivePortfolio"} handleYes={handleYes} />
      {/* Render a custom dialog for delete confirmation */}
      <CustomDialog
        handleClose={handleCloseDeleteDialog}
        open={openDeleteDialog}
        modalTitle="Delete Portfolio"
        showModalButton={false}
        modalSize="sm"
      >
        {/* Render content for the delete dialog */}
        <DeleteDailogContent handleClose={handleCloseDeleteDialog} />
      </CustomDialog>
    </>
  );
};
// Memoize the component to prevent unnecessary renders
export default memo(PortfolioListView);

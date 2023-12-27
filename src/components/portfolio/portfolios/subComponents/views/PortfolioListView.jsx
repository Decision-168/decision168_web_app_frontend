//necessary imports
import React, { memo, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Container } from "@mui/material";
import CustomTable from "../../../../common/CustomTable";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  closeCnfModal,
  openCnfModal,
} from "../../../../../redux/action/confirmationModalSlice";
import ConfirmationDialog from "../../../../common/ConfirmationDialog";
import DeleteDailogContent from "../../../viewporfolio/subComponents/DeleteDailogContent";
import CustomDialog from "../../../../common/CustomDialog";
import {
  patchArchivePortfolio,
  patchUnArchivePortfolio,
} from "../../../../../api/modules/ArchiveModule";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../../redux/action/userSlice";
import { allPortfolios } from "../../../../../api/modules/porfolioModule";
import {
  patchDeletePortfolio,
  patchRetrievePortfolio,
} from "../../../../../api/modules/TrashModule";

// Define the main component - PortfolioListView
const PortfolioListView = () => {
  // React Router hook for navigation
  const navigate = useNavigate();
  // Redux hook for dispatching actions
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;
  const userEmail = user?.email_address;
  const storedPortfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const [portfId, setPortfId] = useState(null);
  const [portfolioData, setPortfolioData] = useState([]);

  const fetchPortfolioData = async () => {
    try {
      const response = await allPortfolios(userEmail, userID);
      setPortfolioData(response.portfolioList);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPortfolioData();
  }, [userEmail]);

  // Handler for clicking the "Archive" button
  const handleArchive = (portId) => {
    setPortfId(portId);
    dispatch(
      openCnfModal({
        modalName: "archivePortfolio",
        title: "Are you sure?",
        description: "You want to Archive Portfolio",
      })
    );
  };

  // Handler for clicking the "UnArchive" button
  const handleUnArchive = (portId) => {
    setPortfId(portId);
    dispatch(
      openCnfModal({
        modalName: "unarchivePortfolio",
        title: "Are you sure?",
        description: "You want to Unarchive Portfolio",
      })
    );
  };

  // Handler for clicking the "Delete" button
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDelete = (portId) => {
    setOpenDeleteDialog(true);
    setPortfId(portId);
    handleClose();
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Handler for clicking the "Retrieve" button
  const handleRetrieve = (portId) => {
    setPortfId(portId);
    dispatch(
      openCnfModal({
        modalName: "retrievePortfolio",
        title: "Are you sure?",
        description: "You want to Retrieve Portfolio",
      })
    );
  };

  const handleArchiveYes = async () => {
    try {
      const response = await patchArchivePortfolio(portfId, userID);
      dispatch(closeCnfModal({ modalName: "archivePortfolio" }));
      if (storedPortfolioId == portfId) {
        localStorage.removeItem("portfolioId");
        navigate(`/portfolio`);
      }
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "archivePortfolio" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const handleUnArchiveYes = async () => {
    try {
      const response = await patchUnArchivePortfolio(portfId, userID);
      dispatch(closeCnfModal({ modalName: "unarchivePortfolio" }));
      fetchPortfolioData();
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "unarchivePortfolio" }));
      toast.error(`${error.response.data?.error}`);
    }
  };

  const handleDeleteYes = async (portfolioid) => {
    try {
      const response = await patchDeletePortfolio(portfolioid, userID);
      dispatch(closeCnfModal({ modalName: "deletePortfolio" }));
      if (storedPortfolioId == portfolioid) {
        localStorage.removeItem("portfolioId");
        navigate(`/portfolio`);
      }
      toast.success(`${response.message}`);
      handleCloseDeleteDialog();
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deletePortfolio" }));
      toast.error(`${error.response?.error}`);
      handleCloseDeleteDialog();
    }
  };

  const handleRetrieveYes = async () => {
    try {
      const response = await patchRetrievePortfolio(portfId, userID);
      dispatch(closeCnfModal({ modalName: "retrievePortfolio" }));
      fetchPortfolioData();
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "retrievePortfolio" }));
      toast.error(`${error.response.data?.error}`);
    }
  };

  const handleView = (pfId) => {
    localStorage.removeItem("portfolioId");
    localStorage.setItem("portfolioId", pfId);
    navigate(`/portfolio-view`);
  };

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
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            row.original.archiveAct === "no" &&
            row.original.deleteAct === "no" && (
              <Box sx={{ display: "flex" }}>
                <Link to="/portfolio-view">
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ height: "24px", padding: "4px" }}
                    onClick={() => handleView(row.original.portfolioId)}
                  >
                    View
                  </Button>
                </Link>
              </Box>
            )
          );
        },
      },
      {
        accessorKey: "edit",
        header: "Edit",
        size: 40,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            row.original.editOption === "yes" &&
            row.original.archiveAct === "no" &&
            row.original.deleteAct === "no" && (
              <Box sx={{ display: "flex" }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ height: "24px", padding: "4px" }}
                  onClick={() =>
                    navigate(`/portfolio-edit/${row.original.portfolioId}`)
                  }
                >
                  Edit
                </Button>
              </Box>
            )
          );
        },
      },

      {
        accessorKey: "archive",
        header: "Archive",
        size: 60,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            row.original.archiveOption === "yes" &&
            row.original.deleteAct === "no" && (
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
                  onClick={
                    row.original.archiveAct == "yes"
                      ? () => handleUnArchive(row.original.portfolioId)
                      : () => handleArchive(row.original.portfolioId)
                  }
                >
                  {row.original.archiveAct == "yes" ? `Unarchive` : `Archive`}
                </Button>
              </Box>
            )
          );
        },
      },
      {
        accessorKey: "delete",
        header: "Delete",
        size: 60,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            row.original.deleteOption === "yes" &&
            row.original.archiveAct === "no" && (
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
                  onClick={
                    row.original.deleteAct == "yes"
                      ? () => handleRetrieve(row.original.portfolioId)
                      : () => handleDelete(row.original.portfolioId)
                  }
                >
                  {row.original.deleteAct == "yes" ? `Restore` : `Delete`}
                </Button>
              </Box>
            )
          );
        },
      },
    ],
    []
  );
  // Table hook for managing Material-UI table features
  const table = useMaterialReactTable({
    columns,
    data: portfolioData,
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
        value={"archivePortfolio"}
        handleYes={handleArchiveYes}
      />
      <ConfirmationDialog
        value={"unarchivePortfolio"}
        handleYes={handleUnArchiveYes}
      />
      <CustomDialog
        handleClose={handleCloseDeleteDialog}
        open={openDeleteDialog}
        modalTitle="Delete Portfolio"
        showModalButton={false}
        modalSize="sm"
      >
        <DeleteDailogContent
          handleClose={handleCloseDeleteDialog}
          portfolio_id={portfId}
          handleDelete={handleDeleteYes}
        />
      </CustomDialog>
      <ConfirmationDialog
        value={"retrievePortfolio"}
        handleYes={handleRetrieveYes}
      />
    </>
  );
};
// Memoize the component to prevent unnecessary renders
export default memo(PortfolioListView);

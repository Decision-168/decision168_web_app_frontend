import { useMemo, memo, useState } from "react";
import {
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import { Box, Button, Typography, IconButton, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import {
  openCnfModal,
  closeCnfModal,
} from "../../../../redux/action/confirmationModalSlice";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { updatePortfolioDepartment } from "../../../../api/modules/porfolioModule";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import {
  getPortfolioDeparmentsAsync, getPortfolioDetailsAsync,
} from "../../../../redux/action/portfolioSlice";

const ViewDepartmentTable = ({ data }) => {
  const dispatch = useDispatch();
  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const [depId, setDeptId] = useState(null);
  const [deptStatus, setdDeptStatus] = useState("");
  // New state variables for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editDeptName, setEditDeptName] = useState("");
  const theme = useTheme();

  const handleReopen = (departmentId, department, status) => {
    setDeptId(departmentId);
    setdDeptStatus(status);
    dispatch(
      openCnfModal({
        modalName: "changeStatus",
        title: "Are you sure?",
        description: `You want to ${
          status === "active" ? "inactive" : "active"
        } ${department} department`,
      })
    );
  };

  const handleYes = async () => {
    const status = deptStatus === "active" ? "inactive" : "active";
    const departmentId = depId;
    try {
      const response = await updatePortfolioDepartment(departmentId, {
        dstatus: status,
      });
      dispatch(getPortfolioDeparmentsAsync(storedPorfolioId));
      toast.success(`${response.message}`);
      dispatch(closeCnfModal({ modalName: "changeStatus" }));
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
    }
  };

  // Function to start editing
  const handleEditStart = (deptName, departmentId) => {
    setDeptId(departmentId);
    setEditDeptName(deptName);
    setIsEditing(true);
  };

  // Function to save changes
  const handleSave = async (departmentId) => {
    try {
      const response = await updatePortfolioDepartment(departmentId, {
        department: editDeptName,
      });
      dispatch(getPortfolioDeparmentsAsync(storedPorfolioId));
      dispatch(getPortfolioDetailsAsync(storedPorfolioId));
      toast.success(`${response.message}`);
      setIsEditing(false);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
    }
  };

  // Function to cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "department",
        header: "Departments",
        size: 500,
        enableEditing: true, // Enable editing for this cell
        Cell: ({ row }) => {
          if (isEditing && row.original.portfolio_dept_id === depId) {
            // Render TextField for editing
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                fullWidth
                  size="small"
                  variant="outlined"
                  value={editDeptName}
                  onChange={(e) => setEditDeptName(e.target.value)}
                />
                <IconButton size="small" sx={{fontSize:"1rem"}} onClick={() => handleSave(row.original.portfolio_dept_id)}>
                  <SaveIcon fontSize="inherite"/>
                </IconButton>
                <IconButton size="small" sx={{fontSize:"1rem"}}  onClick={handleCancel}>
                  <CancelIcon fontSize="inherite" />
                </IconButton>
              </Box>
            );
          } else {
            // Render department name with edit button
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography>{row.original.department}</Typography>
                <IconButton size="small" sx={{fontSize:"1rem"}}
                  onClick={() =>
                    handleEditStart(row.original.department, row.original.portfolio_dept_id)
                  }>
                  <EditIcon  fontSize="inherite"/>
                </IconButton>
              </Box>
            );
          }
        },
      },

      {
        accessorKey: "dstatus",
        header: "Status",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              sx={{
                mr: 1,
                color: row.original.dstatus === "active" ? "black" : "white",
                backgroundColor:
                  row.original.dstatus === "active"
                    ? theme.palette.primary.main // Use your active color code here
                    : theme.palette.secondary.main, // Use your inactive color code here
                "&:hover": {
                  backgroundColor:
                    row.original.dstatus === "active"
                      ? theme.palette.primary.dark // Use your active color code for hover here
                      : theme.palette.secondary.dark, // Use your inactive color code for hover here
                },
              }}
              size="small"
              variant="contained"
              onClick={() =>
                handleReopen(
                  row.original.portfolio_dept_id,
                  row.original.department,
                  row.original.dstatus
                )
              }
            >
              {row.original.dstatus}
            </Button>
          </Box>
        ),
      },
    ],
    [isEditing, editDeptName, depId] // Dependencies for useMemo
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
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
  });
  return (
    <>
      <MaterialReactTable table={table} />
      <ConfirmationDialog value={"changeStatus"} handleYes={handleYes} />
    </>
  );
};

export default memo(ViewDepartmentTable);

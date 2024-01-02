/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, memo, useCallback, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../../redux/action/modalSlice";
import ReduxDialog from "../../../common/ReduxDialog";
import AddEditPackageForm from "../AddEditPackageForm";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ChangeLabelsForm from "../ChangeLabelsForm";
import { FileCopyOutlined } from "@mui/icons-material";
import { openCnfModal } from "../../../../../redux/action/confirmationModalSlice";
import { getPricingList } from "../../../../../api/super-admin-modules/pricingModule";

const PricingTable = () => {
  const dispatch = useDispatch();

  // get registered users list
  const [pricingList, setPricingList] = useState([]);

  const fetchPricingList = async () => {
    try {
      const response = await getPricingList();
      setPricingList(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPricingList();
  }, []);

  const handleEdit = useCallback(
    (id) => {
      dispatch(openModal("editPackage"));

      // edit logic here
      console.log(id);
    },
    [dispatch]
  );

  const handleChangeLabels = useCallback(
    (id) => {
      dispatch(openModal("changeLabels"));

      // change logic here
      console.log(id);
    },
    [dispatch]
  );

  const handleChange = useCallback(
    (id) => {
      dispatch(openModal("changeLabels"));

      // change logic here
      console.log(id);
    },
    [dispatch]
  );

  const handleStatus = useCallback(
    (status) => {
      dispatch(
        openCnfModal({
          modalName: "statusModal",
          title: "Are you sure?",
          description: `You want to ${
            status === "active" ? "Inactive" : "Active"
          } the Pack`,
        })
      );
    },
    [dispatch]
  );

  const data = useMemo(
    () =>
      pricingList.map((pack, ind) => ({
        pack_id: pack.pack_id,
        sr_no: ind + 1,
        package: pack.pack_name,
        validity: pack.pack_validity,
        price: pack.pack_price,
        portfolios: pack.pack_portfolio,
        goals_kpis: `${pack.pack_goals} - ${pack.pack_goals_strategies}`,
        projects: pack.pack_projects,
        storage: pack.pack_storage,
        content_planner: pack.pack_content_planner,
        custom_package:
          `${pack.coupon_pack}`.charAt(0).toUpperCase() +
          `${pack.coupon_pack}`.slice(1),
        created_date: `${pack.pack_created_date}`.slice(0, 10),
        edit: "",
        labels: "",
        status: pack.pack_status,
      })),
    [pricingList]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "sr_no",
        header: "Sr. No",
        size: 70,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "package",
        header: "Package",
        size: 70,
        enableEditing: false,
      },
      {
        accessorKey: "validity",
        header: "Validity (in Days)",
        size: 70,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "price",
        header: "Price (in $)",
        size: 70,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "portfolios",
        header: "Portfolios",
        size: 70,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "goals_kpis",
        header: "Goals-KPIs",
        size: 70,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "projects",
        header: "Projects",
        size: 70,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "storage",
        header: "Storage",
        size: 70,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "content_planner",
        header: "Content Planner (posts/mo)",
        size: 70,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "custom_package",
        header: "Custom Package",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "created_date",
        header: "Created Date",
        size: 70,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "edit",
        header: "Edit",
        size: 70,
        enableColumnFilter: false,
        enableEditing: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              sx={{ minWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
              size="small"
              variant="contained"
              onClick={() => handleEdit(row?.original?.pack_id)}
            >
              Edit
            </Button>
          </Box>
        ),
      },
      {
        accessorKey: "labels",
        header: "Labels",
        size: 70,
        enableColumnFilter: false,
        enableEditing: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              sx={{ minWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
              size="small"
              variant="contained"
              onClick={() => handleChange(row?.original?.pack_id)}
            >
              Change
            </Button>
          </Box>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 70,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}
          >
            {row?.original?.status === "active" ? (
              <Button
                sx={{ maxWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
                size="small"
                variant="contained"
                onClick={() => handleStatus(row?.original?.status)}
              >
                Active
              </Button>
            ) : (
              <Button
                sx={{
                  maxWidth: "36px",
                  padding: "2px 5px",
                  fontSize: "12px",
                  color: "white",
                }}
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => handleStatus(row?.original?.status)}
              >
                Inactive
              </Button>
            )}
          </Box>
        ),
      },
    ],
    [handleChange, handleEdit, handleStatus]
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
        fontSize: "13px",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "13px",
      },
    },
    columnFilterDisplayMode: "popover",
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <ReduxDialog
        value={"editPackage"}
        modalTitle={"Edit Package"}
        showModalButton={true}
        handleClick={handleChangeLabels}
        buttonIcon={<FileCopyOutlined fontSize="14px" sx={{ mr: "4px" }} />}
        buttonText="Change Labels"
        modalSize={"sm"}
      >
        <AddEditPackageForm editMode={true} />
      </ReduxDialog>
      <ReduxDialog
        value={"changeLabels"}
        modalTitle={"Change Labels"}
        showModalButton={false}
        modalSize={"sm"}
      >
        <ChangeLabelsForm />
      </ReduxDialog>
      <ConfirmationDialog value={"statusModal"} />
    </>
  );
};

export default memo(PricingTable);

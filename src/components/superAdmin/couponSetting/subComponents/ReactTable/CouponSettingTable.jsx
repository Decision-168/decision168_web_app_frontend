/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, memo, useCallback, useState, useEffect } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import { openModal } from "../../../../redux/action/modalSlice";
import ViewEditPackageForm from "../ViewEditPackageForm";
import { theme } from "./../../../../theme/theme";
import { getCouponList } from "./../../../../api/modules/couponSettingModule";
import ChangeLabelsForm from "../../../menuPricing/subComponents/ChangeLabelsForm";
import { FileCopyOutlined } from "@mui/icons-material";

const CouponSettigTable = () => {
  const dispatch = useDispatch();

  // get ad list
  const [allCouponList, setCouponList] = useState([]);

  const fetchAllAdList = async () => {
    try {
      const response = await getCouponList();
      setCouponList(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllAdList();
  }, []);

  const handleViewEdit = useCallback(
    (id) => {
      dispatch(openModal("viewEditModal"));

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

  const handleStatus = useCallback(
    (status) => {
      dispatch(
        openCnfModal({
          modalName: "statusModal",
          title: "Are you sure?",
          description: `You want to ${status === "active" ? "Inactive" : "Active"} the coupon`,
        })
      );
    },
    [dispatch]
  );

  const data = useMemo(
    () =>
      allCouponList &&
      allCouponList.map((coupon, ind) => ({
        sr_no: ind + 1,
        code: coupon?.code,
        used: "",
        limit: coupon?.co_limit,
        balance: "",
        validity: `${coupon?.co_validity} days`,
        package: coupon?.pack_id,
        action: "",
        status: coupon?.co_status,
        co_id: coupon?.co_id,
      })),
    [allCouponList]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "sr_no",
        header: "Sr. No",
        size: 70,
        enableColumnFilter: false,
        enableEditing: true,
      },
      {
        accessorKey: "code",
        header: "Code",
        size: 100,
        enableColumnFilter: false,
        enableEditing: true,
      },
      {
        accessorKey: "used",
        header: "Used",
        size: 70,
        enableColumnFilter: false,
        enableEditing: true,
        Cell: ({ row }) => <Box sx={{ color: theme.palette.primary.main, fontWeight: "600" }}>{row.original.used}</Box>,
      },
      {
        accessorKey: "limit",
        header: "Limit",
        size: 100,
        enableColumnFilter: false,
        enableEditing: true,
      },
      {
        accessorKey: "balance",
        header: "Balance",
        size: 100,
        enableColumnFilter: false,
        enableEditing: true,
      },
      {
        accessorKey: "validity",
        header: "Validity",
        size: 100,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "package",
        header: "Package",
        size: 200,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 120,
        enableEditing: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}>
            <Button
              sx={{ maxWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
              size="small"
              variant="contained"
              onClick={() => handleViewEdit(row?.original?.co_id)}>
              View/Edit
            </Button>
          </Box>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 120,
        enableEditing: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}>
            {row?.original?.status === "active" ? (
              <Button
                sx={{ maxWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
                size="small"
                variant="contained"
                onClick={() => handleStatus(row?.original?.status)}>
                Active
              </Button>
            ) : (
              <Button
                sx={{ maxWidth: "36px", padding: "2px 5px", fontSize: "12px", color: "white" }}
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => handleStatus(row?.original?.status)}>
                InActive
              </Button>
            )}
          </Box>
        ),
      },
    ],
    [handleStatus, handleViewEdit]
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
      <ConfirmationDialog value={"statusModal"} />
      <ReduxDialog
        value={"viewEditModal"}
        modalTitle={"Edit Package"}
        showModalButton={true}
        handleClick={handleChangeLabels}
        buttonIcon={<FileCopyOutlined fontSize="14px" sx={{ mr: "4px" }} />}
        buttonText="Change Labels"
        modalSize={"sm"}>
        <ViewEditPackageForm editMode={true} />
      </ReduxDialog>
      <ReduxDialog value={"changeLabels"} modalTitle={"Change Labels"} showModalButton={false} modalSize={"sm"}>
        <ChangeLabelsForm />
      </ReduxDialog>
    </>
  );
};

export default memo(CouponSettigTable);

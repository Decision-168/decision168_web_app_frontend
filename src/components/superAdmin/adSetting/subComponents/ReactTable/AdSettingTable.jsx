/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useMemo, memo, useState, useEffect } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { useCallback } from "react";
import { getAdList } from "./../../../../api/modules/adSettingModule";

const AdSettigTable = () => {
  const dispatch = useDispatch();

  // get ad list
  const [allAdList, setAllAdList] = useState([]);

  const fetchAllAdList = async () => {
    try {
      const response = await getAdList();
      setAllAdList(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllAdList();
  }, []);

  const handledelete = useCallback(
    (id) => {
      dispatch(
        openCnfModal({
          modalName: "deleteAd",
          title: "Are you sure?",
          description: `You want to delete the Ad ${id}`,
        })
      );
    },
    [dispatch]
  );

  const handleActive = useCallback(
    (id) => {
      dispatch(
        openCnfModal({
          modalName: "activeModal",
          title: "Are you sure?",
          description: `You want to Inactivate Ad ${id}`,
        })
      );
    },
    [dispatch]
  );

  const handleInactive = useCallback(
    (id) => {
      dispatch(
        openCnfModal({
          modalName: "inactiveModal",
          title: "Are you sure?",
          description: `You want to Activate Ad ${id}`,
        })
      );
    },
    [dispatch]
  );

  const data = useMemo(
    () =>
      allAdList.map((ad, ind) => ({
        sr_no: ind + 1,
        ad: <img src={ad.ad} alt="adImg" />,
        package: ad.pack_id,
        status: ad.astatus,
        delete: "",
        aid: ad.aid,
      })),
    [allAdList]
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
        accessorKey: "ad",
        header: "Ad",
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "package",
        header: "Package",
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        enableEditing: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}>
            {row?.original?.status === "active" ? (
              <Button
                sx={{ maxWidth: "36px", padding: "2px 5px", fontSize: "12px", color: "white" }}
                size="small"
                variant="contained"
                onClick={() => handleActive(row?.original?.aid)}>
                Active
              </Button>
            ) : (
              <Button
                sx={{ maxWidth: "36px", padding: "2px 5px", fontSize: "12px", color: "white" }}
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => handleInactive(row?.original?.aid)}>
                Inactive
              </Button>
            )}
          </Box>
        ),
      },
      {
        accessorKey: "delete",
        header: "Delete",
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}>
            <Button
              sx={{ maxWidth: "36px", padding: "2px 5px", fontSize: "12px", color: "white" }}
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => handledelete(row.original.aid)}>
              Delete
            </Button>
          </Box>
        ),
      },
    ],
    [handleActive, handleInactive, handledelete]
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
      <ConfirmationDialog value={"deleteAd"} />
      <ConfirmationDialog value={"activeModal"} />
      <ConfirmationDialog value={"inactiveModal"} />
    </>
  );
};

export default memo(AdSettigTable);

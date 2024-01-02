/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, memo, useCallback, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Chip } from "@mui/material";
import { useDispatch } from "react-redux";

import { openCnfModal } from "../../../../../redux/action/confirmationModalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { getAllInvitedEmailAddresses } from "../../../../../api/super-admin-modules/supportersModule";

const InvitedTable = () => {
  const dispatch = useDispatch();

  // get all invited email addresses
  const [allInvitedEmail, setAllInvitedEmail] = useState([]);

  const fetchAllInvitedEmail = async () => {
    try {
      const response = await getAllInvitedEmailAddresses();
      setAllInvitedEmail(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllInvitedEmail();
  }, []);

  const handleRemove = useCallback(
    (id) => {
      dispatch(
        openCnfModal({
          modalName: "removeModal",
          title: "Are you sure?",
          description: `You want to remove this Email`,
        })
      );

      // remove logic here
      console.log(id);
    },
    [dispatch]
  );

  const data = useMemo(
    () =>
      allInvitedEmail &&
      allInvitedEmail.map((invitedEmail, ind) => ({
        sr_no: ind + 1,
        email: invitedEmail?.email_address,
        invitation_status: "",
        approve: invitedEmail?.approve,
        invited_on: `${invitedEmail?.sent_on}`.slice(0, 19).replace("T", " "),
        action: "",
        invite_id: invitedEmail?.invite_id,
      })),
    [allInvitedEmail]
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
        accessorKey: "email",
        header: "Email",
        size: 90,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "invitation_status",
        header: "Invitation Status",
        size: 100,
        enableEditing: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}
          >
            {row?.original?.approve === "yes" ? (
              <Chip
                label="Approved"
                size="small"
                sx={{
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                    paddingInline: "4px",
                  },
                  height: "auto",
                  fontSize: "10px",
                  borderRadius: "5px",
                  background: "#34c38f2e",
                  color: "#34c38f",
                }}
              />
            ) : row?.original?.approve === "no" ? (
              <Chip
                label="Denied"
                color="error"
                size="small"
                sx={{
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                    paddingInline: "4px",
                  },
                  height: "auto",
                  fontSize: "10px",
                  borderRadius: "5px",
                }}
              />
            ) : row?.original?.approve === "" ? (
              <Chip
                label="Invited"
                size="small"
                sx={{
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                    paddingInline: "4px",
                  },
                  height: "auto",
                  fontSize: "10px",
                  borderRadius: "5px",
                  background: "#34c38f2e",
                  color: "#34c38f",
                }}
              />
            ) : null}
          </Box>
        ),
      },
      {
        accessorKey: "invited_on",
        header: "Invited On",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}
          >
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
              onClick={() => handleRemove(row?.original?.invite_id)}
            >
              Remove
            </Button>
          </Box>
        ),
      },
    ],
    [handleRemove]
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
      <ConfirmationDialog value={"removeModal"} />
    </>
  );
};

export default memo(InvitedTable);

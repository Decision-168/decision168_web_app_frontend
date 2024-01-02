/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, memo, useState, useEffect, useCallback } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button, Chip, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../redux/action/modalSlice";
import ReduxDialog from "../../../common/ReduxDialog";
import RegisteredUsersDetail from "../RegisteredUsersDetail";
import { getAllRegisteredUsers, getUserDetail } from "./../../../../api/modules/registeredUsersModule";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { mkConfig, generateCsv, download } from "export-to-csv";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const RegisteredUsersTable = () => {
  const dispatch = useDispatch();

  // get registered users list
  const [allRegisteredUsers, setAllRegisteredUsers] = useState([]);
  const [userDetail, setUserDetail] = useState({});

  const fetchAllRegisteredUsers = async () => {
    try {
      const response = await getAllRegisteredUsers();
      setAllRegisteredUsers(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserDetail = async (id) => {
    try {
      const response = await getUserDetail(id);
      console.log(response);
      setUserDetail(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewDetail = useCallback(
    (reg_id) => {
      dispatch(openModal("viewDetailModal"));
      fetchUserDetail(reg_id);
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAllRegisteredUsers();
  }, []);

  // user couts
  let activeUsers = 0;
  let inactiveUsers = 0;

  if (allRegisteredUsers) {
    allRegisteredUsers.map((user) => {
      user.reg_acc_status === "activated" ? activeUsers++ : inactiveUsers++;
    });
  }

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("Registered List Decision168 Super-Admin.pdf");
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const data = useMemo(
    () =>
      allRegisteredUsers.map((user) => ({
        reg_id: user.reg_id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email_address,
        account_status: `${user.reg_acc_status === "activated" ? "Active" : ""}`,
        reg_date: user.reg_date,
        last_login: user.last_login,
        package: user.package_id,
        detail: "",
      })),
    [allRegisteredUsers]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "reg_id",
        header: "Reg ID",
        size: 70,
        enableColumnFilter: false,
        enableEditing: true,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 90,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "account_status",
        header: "Account Status",
        size: 90,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "reg_date",
        header: "Reg. Date",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "last_login",
        header: "Last Login",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "package",
        header: "Package",
        size: 90,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "detail",
        header: "Detail",
        size: 90,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}>
            <Button
              sx={{ mr: 1, minWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
              size="small"
              variant="contained"
              onClick={() => handleViewDetail(row.original.reg_id)}>
              View
            </Button>
          </Box>
        ),
      },
    ],
    [handleViewDetail]
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

    renderTopToolbarCustomActions: ({ table }) => (
      <Stack direction={"row"} spacing={1}>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          sx={{ color: "#eff2f7", paddingInline: "5px", minWidth: "60px", textTransform: "uppercase" }}
          onClick={handleExportData}>
          Excel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          sx={{ color: "#eff2f7", paddingInline: "5px", minWidth: "50px", textTransform: "uppercase" }}
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}>
          pdf
        </Button>
      </Stack>
    ),
  });

  return (
    <>
      <Stack direction="row" spacing={1} mb={1}>
        <Chip
          label={`Total Users: ${allRegisteredUsers.length}`}
          sx={{
            fontSize: "12px",
            background: "#50a5f12e",
            color: "#50a5f1",
            borderRadius: "5px",
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
              paddingInline: "4px",
            },
          }}
        />
        <Chip
          label={`Active Users: ${activeUsers}`}
          color="success"
          sx={{
            fontSize: "12px",
            background: "#34c38f2e",
            color: "#34c38f",
            borderRadius: "5px",
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
              paddingInline: "4px",
            },
          }}
        />
        <Chip
          label={`Inactive Users: ${inactiveUsers}`}
          color="error"
          sx={{
            fontSize: "12px",
            background: "#f46a6a2e",
            color: "#f46a6a",
            borderRadius: "5px",
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
              paddingInline: "4px",
            },
          }}
        />
      </Stack>
      <MaterialReactTable table={table} />
      <ReduxDialog
        value={"viewDetailModal"}
        modalTitle={`${userDetail?.specificUser?.first_name} ${userDetail?.specificUser?.middle_name} ${userDetail?.specificUser?.last_name}`}
        showModalButton={false}
        modalSize={"md"}>
        <RegisteredUsersDetail userDetail={userDetail} />
      </ReduxDialog>
    </>
  );
};

export default memo(RegisteredUsersTable);

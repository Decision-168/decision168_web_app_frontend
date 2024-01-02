/* eslint-disable react-refresh/only-export-components */
import { useMemo, memo, useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Button, Stack } from "@mui/material";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { getAllDeactivatedUsers } from "../../../../../api/super-admin-modules/registeredUsersModule";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const DeactivatedUsersTable = () => {
  const [allDeactivatedUsers, setAllDeactivatedUsers] = useState([]);

  // get deactivated users list
  const fetchAllRegisteredUsers = async () => {
    try {
      const response = await getAllDeactivatedUsers();
      setAllDeactivatedUsers(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllRegisteredUsers();
  }, []);

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("Deactivated List Decision168 Super-Admin.pdf");
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const data = useMemo(
    () =>
      allDeactivatedUsers.map((user) => ({
        reg_id: user.reg_id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email_address,
        phone: user.phone_number,
        deactivated_date: user.deleted_date,
      })),
    [allDeactivatedUsers]
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
        accessorKey: "phone",
        header: "Phone",
        size: 90,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "deactivated_date",
        header: "Deactivated Date",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
      },
    ],
    []
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
          sx={{
            color: "#eff2f7",
            paddingInline: "5px",
            minWidth: "60px",
            textTransform: "uppercase",
          }}
          onClick={handleExportData}
        >
          Excel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          sx={{
            color: "#eff2f7",
            paddingInline: "5px",
            minWidth: "50px",
            textTransform: "uppercase",
          }}
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
        >
          pdf
        </Button>
      </Stack>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default memo(DeactivatedUsersTable);

/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, memo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";
// import CustomSelect from "./../../../common/CustomSelect";

import RefundButton from "../../../common/RefundButton";
import { getRefundList } from "../../../../../api/super-admin-modules/registeredUsersModule";

// const items = [
//   { value: "refund initiated", text: "Refund Initiated", selected: true },
//   { value: "refund complete", text: "Refund Complete", selected: false },
// ];

const RefundListTable = () => {
  const [refundList, setRefundList] = useState([]);

  // get refund list
  const fetchAllRegisteredUsers = async () => {
    try {
      const response = await getRefundList();
      setRefundList(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllRegisteredUsers();
  }, []);

  // const [value, setValue] = useState("refund initiated");
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const data = useMemo(
    () =>
      refundList.map((user, ind) => ({
        sr_no: ind + 1,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email_address,
        phone: user.phone_number,
        refund_package: user.package_id,
        refund_invoice_id: user.refund_txn_id,
        refund_status: user.refund_status,
        reg_id: user.reg_id,
      })),
    [refundList]
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
        accessorKey: "refund_package",
        header: "Refund Package",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "refund_invoice_id",
        header: "Refund Invoice ID",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "refund_status",
        header: "Refund Status",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}
          >
            {/* <Button
              sx={{
                mr: 1,
                minWidth: '36px',
                padding: '2px 5px',
                fontSize: '12px',
                background: '#f1b44c',
                color: 'white',
                ':hover': {
                  background: '#cd9941',
                },
              }}
              size="medium"
              variant="contained">
              {row.original.refund_status}
            </Button> */}
            {/* <CustomSelect items={items} label="" labelColor="" required={false} handleChange={handleChange} value={value} background={true} /> */}

            {
              <RefundButton
                refundStatus={row.original.refund_status}
                reg_id={row.original.reg_id}
              />
            }
          </Box>
        ),
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
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default memo(RefundListTable);

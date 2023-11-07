// import {
//   MRT_GlobalFilterTextField,
//   MRT_TableBodyCellValue,
//   MRT_TablePagination,
//   flexRender,
//   useMaterialReactTable,
// } from "material-react-table";
// import {
//   Box,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import { memo } from "react";

// const data = [
//   {
//     goals: "ABC Goal",
//     progress: "26%",
//     startDate: "2023-01-19",
//     endDate: "2023-04-30",
//   },
//   {
//     goals: "Test",
//     progress: "76%",
//     startDate: "2023-01-19",
//     endDate: "2023-04-30",
//   },
//   {
//     goals: "PQR",
//     progress: "56%",
//     startDate: "2023-01-19",
//     endDate: "2023-04-30",
//   },
//   {
//     goals: "Oct Goal",
//     progress: "72%",
//     startDate: "2023-01-19",
//     endDate: "2023-04-30",
//   },
//   {
//     goals: "G & K",
//     progress: "32%",
//     startDate: "2023-01-19",
//     endDate: "2023-04-30",
//   },
// ];
// const columns = [
//   {
//     accessorKey: "goals",
//     header: "Goals",
//   },
//   {
//     accessorKey: "progress",
//     header: "Progress",
//   },
//   {
//     accessorKey: "startDate",
//     header: "Start Date",
//   },
//   {
//     accessorKey: "endDate",
//     header: "End Date",
//   },
// ];

// const CustomTable = ({ title }) => {
//   const table = useMaterialReactTable({
//     columns,
//     data,
//     initialState: {
//       pagination: { pageSize: 10, pageIndex: 0 },
//       showGlobalFilter: true,
//     },
//     paginationDisplayMode: "pages",
//     muiSearchTextFieldProps: {
//       size: "small",
//       variant: "outlined",
//     },
//     muiPaginationProps: {
//       color: "secondary",
//       rowsPerPageOptions: [10, 25, 50, 100],
//       shape: "rounded",
//       variant: "outlined",
//     },
//   });

//   return (
//     <Stack sx={{ background: "white", borderRadius: 1, p: 2 }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Typography
//           sx={{
//             color: "#212934",
//             fontWeight: "600",
//             fontSize: "15px",
//           }}
//         >
//           {title}
//         </Typography>
//         <MRT_GlobalFilterTextField table={table} />
//       </Box>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableCell align="left" variant="head" key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.Header ??
//                             header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHead>
//           <TableBody>
//             {table.getRowModel().rows.map((row) => (
//               <TableRow key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell align="left" variant="body" key={cell.id}>
//                     <MRT_TableBodyCellValue cell={cell} table={table} />
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <MRT_TablePagination table={table} />
//     </Stack>
//   );
// };

// export default memo(CustomTable);


import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    address: "32188 Larkin Turnpike",
    city: "Charleston",
    state: "South Carolina",
  },
];

import React from 'react'
import { Button, MenuItem } from "@mui/material";

const CustomTable = () => {
 const handleActionClick = (rowData) => {
   // Perform the operation based on the rowData
   console.log("Perform operation for row:", rowData);
 };
  const columns = useMemo(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    enableEditing: true,
    editDisplayMode: "cell",
    positionActionsColumn: "last",
    muiTableBodyCellProps: ({ table, cell }) => ({
      onClick: () => {
        table.setEditingCell(cell);
      },
    }),
    renderRowActions: ({ row }) => [
      <Button variant="contained" onClick={() => console.info(row)}>
        Delete
      </Button>,
    ],
  });

  return <MaterialReactTable table={table} />;
}

export default CustomTable

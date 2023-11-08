import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  flexRender,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { memo } from "react";

const data = [
  {
    goals: "ABC Goal",
    progress: "26%",
    startDate: "2023-01-19",
    endDate: "2023-04-30",
  },
  {
    goals: "Test",
    progress: "76%",
    startDate: "2023-01-19",
    endDate: "2023-04-30",
  },
  {
    goals: "PQR",
    progress: "56%",
    startDate: "2023-01-19",
    endDate: "2023-04-30",
  },
  {
    goals: "Oct Goal",
    progress: "72%",
    startDate: "2023-01-19",
    endDate: "2023-04-30",
  },
  {
    goals: "G & K",
    progress: "32%",
    startDate: "2023-01-19",
    endDate: "2023-04-30",
  },
];
const columns = [
  {
    accessorKey: "goals",
    header: "Goals",
  },
  {
    accessorKey: "progress",
    header: "Progress",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
];

const CustomTable = ({ title }) => {
  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    paginationDisplayMode: "pages",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 25, 50, 100],
      shape: "rounded",
      variant: "outlined",
    },
  });

  return (
    <Stack sx={{ background: "white", borderRadius: 1, p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#212934",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          {title}
        </Typography>
        <MRT_GlobalFilterTextField table={table} />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell align="left" variant="head" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.Header ??
                            header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell align="left" variant="body" key={cell.id}>
                    <MRT_TableBodyCellValue cell={cell} table={table} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MRT_TablePagination table={table} />
    </Stack>
  );
};

export default memo(CustomTable);
